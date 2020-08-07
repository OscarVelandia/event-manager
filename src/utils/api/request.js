async function request(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(`${process.env.BASE_PATH}${endpoint}`, config);
    data = await response.json();

    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export function get(endpoint, customConfig = {}) {
  return request(endpoint, { ...customConfig, method: 'GET' });
}

export function post(endpoint, body, customConfig = {}) {
  return request(endpoint, { ...customConfig, body });
}
