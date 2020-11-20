import { delay } from 'redux-saga/effects';
import {
  all,
  call,
  put,
  take,
  fork,
  select,
  cancel,
  takeEvery,
  takeLatest,
  throttle
} from 'redux-saga/effects';

import fetch from 'isomorphic-unfetch';
import _keyBy from 'lodash/keyBy';
import Router from 'next/router';
import get from 'lodash/get'

import {
  SNACKBAR_SHOW,
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_RESET,
  RESOURCE_FETCH_REQUESTED,
  RESOURCE_FETCH_ERROR,
  FAQ_TOGGLE,
  BOOTH_CHECKED,


  //voting
  LINKEDIN_TOKEN_SUCCESS,
  LINKEDIN_VOTE_REQUESTED,
  //LINKEDIN_AUTOVOTE_REQUESTED,
  LINKEDIN_VOTE_SUCCESS,
  VOTE_STATUS_CHECK,
  SET_USER_TOKEN

} from '../../components/redux/types';


import {
  CHANGE_LOCALE, 
  changeLocale,
  replaceTranslations
} from '../../i18n'

import {
  SETTINGS_SET
} from '../../settings'

import {
  resourceFetchRequest,
  resourceFetchSuccess,
  resourceFetchError,
  resourceFetchSuccessMeta,
  resourceList,
  boothSelect,
  boothUnselect,
  boothsReset,
  snackbarShow,
  //voting

  votingStatusSuccess,
  votingStatusError,
  linkedVoteRequest,
  linkedVoteError,
  linkedVoteSuccess

} from '../../components/redux/actions';

import * as Selectors from '../selectors';
import {event} from '../../services/gtag'

import { REHYDRATE } from 'redux-persist/lib/constants'
import { HYDRATE } from 'next-redux-wrapper'

const apiUrl = `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}`

let fetchTasks = {};


function* handleFetchTranslations(){
  
  const settings = yield select(Selectors.getSettings)
  const locale = yield select(Selectors.getLocale)

  const localise_url = get(settings, "system.lang_api_endpoint", "").trim()
  const available_locales = get(settings, "system.available_locales", "")
  const default_locale = get(settings, "system.default_locale", "").toLowerCase()

  if(!locale){
    yield put(changeLocale(default_locale))
  }

  if(localise_url.indexOf("http") === 0){

    const response = yield call(fetch, localise_url)
    const json = yield call([response, response.json])
  
    if (response.ok && response.status >= 200) {
      yield put(replaceTranslations(json));
    } else {
    //yield put(resourceFetchError(endpoint, `${response.status} ${response.statusText}`));
    }

  }

 

}

//https://goshakkk.name/detect-state-change-redux-saga/

function* waitFor(selector) {
  if (yield select(selector)) return; // (1)

  while (true) {
    yield take('*'); // (1a)
    if (yield select(selector)) return; // (1b)
  }
}



function* handleBoothCheck({payload}){

  yield call(event, {
        event : "booth_click",
        category : "ecommerce",
        //label,
        value : payload
  })
  
}

function* accumulateFetches({resource, reload}) {

  const endpoints = [].concat(resource)

  for(let endpoint of endpoints){

    //check if endpoint is string or object....

    if(new Object(endpoint) === endpoint){
      //lets build proper URL
      const searchParams = new URLSearchParams(endpoint.params)
      searchParams.sort()
      endpoint = `${endpoint.resource}?${ searchParams.toString() }` 
    }

    if(endpoint in fetchTasks) {

       yield cancel( fetchTasks[endpoint] );
    }

    fetchTasks[endpoint] = yield fork(fetchAccumulatedFetches, endpoint, reload)
  }

}

function* fetchAccumulatedFetches(endpoint, reload){

  //check if we have params...

  const resource = endpoint.split("?")[0]

  yield delay(50);

  const lists = yield select(Selectors.getResourceLists)

  if(!reload && endpoint in lists && lists[endpoint] && lists[endpoint].length){
    delete fetchTasks[endpoint]
    return
  }

  const response = yield call(fetch, `${apiUrl}/${endpoint}`)
  const json = yield call([response, response.json])

  if (response.ok && response.status >= 200 && 'data' in json) {

    yield put(resourceFetchSuccess(resource, json.data));

    //add list!

    yield put(resourceList(endpoint, json.data))

    if("meta" in json){
      yield put(resourceFetchSuccessMeta(json.meta))
    }

  } else {
    yield put(resourceFetchError(endpoint, `${response.status} ${response.statusText}`));
  }

  delete fetchTasks[endpoint]
}


function* changeUrlWhenFaqsSelected(actionData) {
  const faqs = yield select(Selectors.getFaqs);

  yield call(Router.push, `${Router.pathname}?q=${faqs.join(',')}`, undefined, {
    shallow: true
  });
}


function* updateDialogForQuickCheckout(actionData) {
  yield cancel();
}

function* selectBoothWhenCartItemAdded(actionData) {
  if ('formdata' in actionData && 'id' in actionData.formdata) {
    yield put(boothSelect(actionData.formdata.id));
  }
  yield cancel();
}



function* unSelectBoothWhenCartItemRemoved(actionData) {
  //console.log(actionData)
  if ('formdata' in actionData && 'id' in actionData.formdata) {
    yield put(boothUnselect(actionData.formdata.id));
  }
  yield cancel();
}

function* unSelectAllBooths() {
  yield put(boothsReset());
}

function* handleFetchErrors(actionData) {
  yield put(snackbarShow({title : actionData.error}));
}



/**
 * VOTING - STARTS
 */


function* handleLinkedinVoteRequest(actionData){

  //we must wait cos we are taking token from persisted part of redux
  //yield take("persist/REHYDRATE")
  
  yield call(waitFor, state => Selectors.getLinkedInToken(state) != null);

  const uid = yield select(Selectors.getLinkedInToken)

  const response = yield call(fetch, `${apiUrl}/vote`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //credentials : 'include',
    body: JSON.stringify( {...actionData, uid} )
  }); 

  const json = yield call([response, response.json]);

  if (response.ok && response.status >= 200 && 'data' in json) {
    yield put( linkedVoteSuccess(json.data) );
  } else {
    yield put( linkedVoteError(json.error) );
  }

}

function* handleVotingData(actionData){
  const {data} = actionData;
  yield put(resourceFetchSuccess("votes", data))
  yield put(resourceFetchRequest("callforpapers", true)) 
}



function* handleVoteStatus(actionData){

  //we must wait cos we are taking token from persisted part of redux
  //yield take("persist/REHYDRATE")
  //WILL NOT WORK IF REHYDRATE OCCURS BEFORE

  yield call(waitFor, state => Selectors.getLinkedInToken(state) != null);

  const uid = yield select(Selectors.getLinkedInToken)

  const {service} = actionData;

  const response = yield call(fetch, `${apiUrl}/vote`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //credentials : 'include',
    body: JSON.stringify( {service, uid} )
  }); 

  const json = yield call([response, response.json]);

  if (response.ok && response.status >= 200 && 'data' in json) {
    yield put(votingStatusSuccess(json.data));
  } else {
    if("error" in json && "message" in json.error){
      yield put(votingStatusError(json.error));
    }
  }

}

function* handleRehydrate(actionData){

  yield take(REHYDRATE);  //Subscribe to when app finishes loading
   //RESAVE TOKEN DATA!!!!
  yield put(actionData)
 }


/**
 * VOTING - ENDS
 */




const rootSaga = function* root() {

  yield all([
    //takeEvery(SNACKBAR_SHOW, handleLogoutFn),
    takeEvery(FAQ_TOGGLE, changeUrlWhenFaqsSelected),
    takeEvery(CART_ITEM_ADD, selectBoothWhenCartItemAdded),
    takeEvery(CART_ITEM_ADD, updateDialogForQuickCheckout),
    takeEvery(CART_ITEM_REMOVE, unSelectBoothWhenCartItemRemoved),
    takeEvery(CART_RESET, unSelectAllBooths),
    takeEvery(RESOURCE_FETCH_REQUESTED, accumulateFetches),
    takeEvery(RESOURCE_FETCH_ERROR, handleFetchErrors),
    takeEvery(BOOTH_CHECKED, handleBoothCheck),

    takeEvery(LINKEDIN_VOTE_REQUESTED, handleLinkedinVoteRequest),
  
    takeEvery(LINKEDIN_VOTE_SUCCESS, handleVotingData),
    takeEvery(VOTE_STATUS_CHECK, handleVoteStatus),
    takeEvery(SETTINGS_SET, handleFetchTranslations),

    takeEvery(SET_USER_TOKEN, handleRehydrate),

  ]);
};

export default rootSaga;
