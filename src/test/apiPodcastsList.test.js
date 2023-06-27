import { renderHook } from '@testing-library/react-hooks';
import UseFetchToppodcasts from '../api/apiPodcastsList';

describe('UseFetchToppodcasts', () => {
  beforeEach(() => {
    // Limpiar el localStorage antes de cada prueba
    localStorage.clear();
  });

  test('debe obtener los datos de la API y almacenarlos en el estado y el localStorage', async () => {
    const limit = 100;
    const genre = 'all';

    // Simular la respuesta exitosa de la API
    const mockData = {
      feed: {
        entry: [{ id: 1, title: 'Podcast 1' }, { id: 2, title: 'Podcast 2' }],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result, waitForNextUpdate } = renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(result.current.toppodcasts).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.toppodcasts).toEqual(mockData.feed.entry);

    // Verificar que los datos se almacenan en el localStorage
    const storedData = localStorage.getItem('toppodcasts');
    expect(JSON.parse(storedData)).toEqual(mockData.feed.entry);
  });

  test('debe utilizar los datos almacenados en el cliente si han pasado menos de un día', async () => {
    const limit = 100;
    const genre = 'all';

    // Simular datos almacenados en el localStorage con un timestamp reciente
    const storedData = JSON.stringify([{ id: 1, title: 'Podcast 1' }, { id: 2, title: 'Podcast 2' }]);
    const storedTimestamp = Date.now() - 12 * 60 * 60 * 1000; // Hace menos de un día
    localStorage.setItem('toppodcasts', storedData);
    localStorage.setItem('toppodcasts_timestamp', storedTimestamp.toString());

    const { result, waitForNextUpdate } = renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(result.current.toppodcasts).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.toppodcasts).toEqual(JSON.parse(storedData));
    expect(global.fetch).not.toHaveBeenCalled(); // No se realiza una nueva solicitud a la API
  });

  test('debe realizar una nueva solicitud a la API si han pasado más de un día', async () => {
    const limit = 100;
    const genre = 'all';

    // Simular datos almacenados en el localStorage con un timestamp antiguo
    const storedData = JSON.stringify([{ id: 1, title: 'Podcast 1' }, { id: 2, title: 'Podcast 2' }]);
    const storedTimestamp = Date.now() - 2 * 24 * 60 * 60 * 1000; // Hace más de un día
    localStorage.setItem('toppodcasts', storedData);
    localStorage.setItem('toppodcasts_timestamp', storedTimestamp.toString());

    // Simular la respuesta exitosa de la API
    const mockData = {
      feed: {
        entry: [{ id: 3, title: 'Podcast 3' }, { id: 4, title: 'Podcast 4' }],
      },
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result, waitForNextUpdate } = renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(result.current.toppodcasts).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.toppodcasts).toEqual(mockData.feed.entry);

    // Verificar que los nuevos datos se almacenan en el localStorage con el nuevo timestamp
    const updatedStoredData = localStorage.getItem('toppodcasts');
    expect(JSON.parse(updatedStoredData)).toEqual(mockData.feed.entry);
    expect(localStorage.getItem('toppodcasts_timestamp')).toBeDefined();
  });

  test('debe manejar correctamente los errores al obtener los datos de la API', async () => {
    const limit = 100;
    const genre = 'all';

    // Simular una respuesta de error de la API
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

    // Moquear la consola para evitar mensajes de error en la salida del test
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result, waitForNextUpdate } = renderHook(() => UseFetchToppodcasts({ limit, genre }));

    expect(result.current.toppodcasts).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.toppodcasts).toEqual([]);
    expect(consoleErrorMock).toHaveBeenCalledWith(new Error('API Error'));

    consoleErrorMock.mockRestore();
  });
});