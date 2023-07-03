import { renderHook } from '@testing-library/react-hooks';
import UseFetchPodcastDetail from '../api/apiPodcastDetail';

describe('UseFetchPodcastDetail', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        contents: JSON.stringify({
          results: ['episode1', 'episode2', 'episode3'],
        }),
      }),
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  beforeEach(() => {
    global.localStorage.clear();
  });

  test('realiza la solicitud y almacena los datos del detalle del podcast en el almacenamiento local', async () => {
    const podcastId = '123456';

    renderHook(() => UseFetchPodcastDetail({ podcastId }));

    expect(fetch).toHaveBeenCalledWith(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
      )}`
    );

    await expect(
      global.localStorage.getItem(`podcast_${podcastId}`)
    ).resolves.toBe(JSON.stringify(['episode1', 'episode2', 'episode3']));
  });

  test('utiliza los datos del detalle del podcast almacenados cuando están disponibles', async () => {
    const podcastId = '123456';
    const storedData = ['cached1', 'cached2', 'cached3'];

    global.localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(storedData));

    renderHook(() => UseFetchPodcastDetail({ podcastId }));

    expect(fetch).not.toHaveBeenCalled();
    await expect(
      global.localStorage.getItem(`podcast_${podcastId}`)
    ).resolves.toBe(JSON.stringify(storedData));
  });

  test('lanza un error si la respuesta de la red no es satisfactoria', async () => {
    const podcastId = '123456';

    global.fetch.mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
    });

    const { result } = renderHook(() => UseFetchPodcastDetail({ podcastId }));

    await expect(result.error).toEqual(Error('Network response was not ok.'));
  });
});
