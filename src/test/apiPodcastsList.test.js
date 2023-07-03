import { renderHook } from '@testing-library/react-hooks';
import UseFetchToppodcasts from '../api/apiPodcastsList';

describe('UseFetchToppodcasts', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        feed: { entry: ['podcast1', 'podcast2', 'podcast3'] },
      }),
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  beforeEach(() => {
    global.localStorage.clear();
  });

  test('fetches and stores toppodcasts data in local storage', async () => {
    const limit = 10;
    const genre = 'music';
    const STORAGE_KEY = 'toppodcasts';

    renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(fetch).toHaveBeenCalledWith(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`
    );

    await expect(global.localStorage.getItem(STORAGE_KEY)).resolves.toEqual(
      JSON.stringify(['podcast1', 'podcast2', 'podcast3'])
    );
  });

  test('uses stored toppodcasts data when available and not expired', async () => {
    const limit = 10;
    const genre = 'music';
    const STORAGE_KEY = 'toppodcasts';
    const storedData = ['cached1', 'cached2', 'cached3'];
    const storedTimestamp = Date.now() - 12 * 60 * 60 * 1000; // Less than 24 hours

    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    global.localStorage.setItem(`${STORAGE_KEY}_timestamp`, storedTimestamp);

    renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(fetch).not.toHaveBeenCalled();
    await expect(global.localStorage.getItem(STORAGE_KEY)).resolves.toEqual(
      JSON.stringify(storedData)
    );
  });

  test('fetches toppodcasts data when stored data is expired', async () => {
    const limit = 10;
    const genre = 'music';
    const STORAGE_KEY = 'toppodcasts';
    const storedData = ['cached1', 'cached2', 'cached3'];
    const storedTimestamp = Date.now() - 48 * 60 * 60 * 1000; // More than 24 hours

    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    global.localStorage.setItem(`${STORAGE_KEY}_timestamp`, storedTimestamp);

    renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(fetch).toHaveBeenCalledWith(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`
    );
    await expect(global.localStorage.getItem(STORAGE_KEY)).resolves.toEqual(
      JSON.stringify(['podcast1', 'podcast2', 'podcast3'])
    );
  });
});
