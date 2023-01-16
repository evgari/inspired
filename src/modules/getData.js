export const getData = async (urlApi, param, cbError = () => {}) => {
  try {
    const url = new URL(urlApi);

    if (param && typeof param === 'object') {
      for (const key in param) {
        url.searchParams.set(key, param[key]);
      }
    }
    
    const responce = await fetch(url);
    const data = await responce.json();
  
    if (!responce.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch(err) {
    console.warn(err);
    if (typeof param === 'function') {
      param(err);
    } else {
      cbError(err);
    }    
  }
};

