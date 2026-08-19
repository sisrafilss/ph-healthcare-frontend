const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1';

const serverFetchHealper = async (endpoint: string, options: RequestInit): Promise<Response> => {
  const { headers, ...restOptions } = options;

  // const accessToken = await getCookie('accessToken');

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      ...headers,
      // Cookie: accessToken ? `accessToken=${accessToken}` : '',
    },
    ...restOptions,
  });
  return response;
};

export const serverFetch = {
  get: async (endpoint: string, optionis: RequestInit = {}): Promise<Response> =>
    serverFetchHealper(endpoint, { ...optionis, method: 'GET' }),
  post: async (endpoint: string, optionis: RequestInit = {}): Promise<Response> =>
    serverFetchHealper(endpoint, { ...optionis, method: 'POST' }),
  put: async (endpoint: string, optionis: RequestInit = {}): Promise<Response> =>
    serverFetchHealper(endpoint, { ...optionis, method: 'PUT' }),
  patch: async (endpoint: string, optionis: RequestInit = {}): Promise<Response> =>
    serverFetchHealper(endpoint, { ...optionis, method: 'PATCH' }),
  delete: async (endpoint: string, optionis: RequestInit = {}): Promise<Response> =>
    serverFetchHealper(endpoint, { ...optionis, method: 'DELETE' }),
};
