import fetch from 'isomorphic-unfetch';


export const getUserByToken = async (api, token) => {

  if(!token || token.length < 32){
    return null
  }

  const request = await fetch(`${api}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        token : token
    })
  })

  const json = await request.json();
  return "data" in json ? json.data : json;

}


export const checkFetchStatus = response => {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

