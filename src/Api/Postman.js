export const ApiCall = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  const fetchedData = fetch('https://httpbin.org/post', requestOptions)
    .then(async (response) => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return data;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  return fetchedData;
};

export default ApiCall;
