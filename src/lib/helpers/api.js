import fetch from 'isomorphic-unfetch';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import { resourceFetchSuccess, resourceFetchSuccessMeta } from '../components/redux';


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

export const fetcher = async (endpoints, store) => {

  const resources = get(store.getState(), "resources", {})

  const emptyResources = endpoints.filter(endpoint => endpoint in resources && !resources[endpoint].length)

  const results = await Promise.all(
    endpoints.map(endpoint =>
      fetch(`https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}/${endpoint}`)
        .then(response => response.json())
        .then(data => ({ endpoint, data }))
    )
  )

    results.forEach(resource => {

        store.dispatch(resourceFetchSuccess(resource.endpoint, resource.data.data))

        if("meta" in resource.data){
          store.dispatch(resourceFetchSuccessMeta(resource.data.meta))
        }

    })


};
