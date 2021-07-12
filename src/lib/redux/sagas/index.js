import { v4 as uuidv4 } from 'uuid';

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
  throttle,
  spawn,
  delay
} from 'redux-saga/effects';

import fetch from 'isomorphic-unfetch';
import _keyBy from 'lodash/keyBy';
import Router from 'next/router';
import get from 'lodash/get'

import {
  FORM_ACTION_STARTED,
  FORM_ACTION_FINISHED
} from '../../formik/redux/types'

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
  linkedVoteSuccess,
  uuidSet

} from '../../components/redux/actions';

import * as Selectors from '../selectors';
import {event} from '../../services/gtag'
import {resourceToUrl} from '../../helpers';
import { REHYDRATE } from 'redux-persist/lib/constants'
import { HYDRATE } from 'next-redux-wrapper'

const apiUrl = `https://api.eventjuicer.com/v1/public/hosts/${process.env.NEXT_PUBLIC_PROJECT}`

let fetchTasks = {};


function* handleFetchTranslations(){
  
  const settings = yield select(Selectors.getSettings)
 // const locale = yield select(Selectors.getLocale)

  const localise_url = get(settings, "system.lang_api_endpoint", "").trim()

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

    endpoint = resourceToUrl(endpoint)

    if(endpoint in fetchTasks) {
       //already added... cancel as we add new
       yield cancel( fetchTasks[endpoint] );
    }

    //task will be delayed by 50ms so we may cancel it
    fetchTasks[endpoint] = yield fork(fetchAccumulatedFetches, endpoint, reload)
  }

}

function* fetchAccumulatedFetches(endpoint, reload){

  //check if we have params...
  const resource = endpoint.split("?")[0]

  yield delay(50);

  const lists = yield select(Selectors.getResourceLists)

  //check if we already fetched the URL .. so we should have resourcelist and resource...
  if(!reload && endpoint in lists && Array.isArray(lists[endpoint]) && lists[endpoint].length){
    
    /**
     * we should rather compare lists vs resource
     * ...or just fuck it as we use re-reselect and we should not have re-render problems
    */

    // should we delete it? dunno.
    // delete fetchTasks[endpoint]
    // return
  }


  const settings = yield select(Selectors.getSettings) 
  const _apiUrl = get(settings, "system.api", "").trim() || apiUrl

  // if(_apiUrl.split("http").length === 3){
  //   endpoint = encodeURIComponent(endpoint)
  // }

  const response = yield call(fetch, `${_apiUrl}/${endpoint}`)
  const json = yield call([response, response.json])

  if (response.ok && response.status >= 200 && 'data' in json) {

    yield put(resourceFetchSuccess(resource, json.data));

    //add list!

    yield put(resourceList(endpoint, json.data))

  } else {
    yield put(resourceFetchError(endpoint, `${response.status} ${response.statusText}`));
  }

  delete fetchTasks[endpoint]
}


function* changeUrlWhenFaqsSelected(actionData) {
  const faqs = yield select(Selectors.getFaqs);

  yield call(Router.push, `${Router.pathname}?q=${faqs.join(',')}`, undefined, {
    shallow: true,
    scroll: false
  });
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

function* handleGtmEvent({payload}){
  yield call(event, payload)
}











/*

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

*/

function* handleLocks(){

  const cart = yield select(Selectors.getCart)
  let uuid = yield select(state => state.app.uuid)

  if(!uuid){
    uuid = uuidv4()
    yield put(uuidSet(uuid))
  }

  //`${apiUrl}/lock`
  
  const response = yield call(fetch, 'http://eventjuicer-api.test/v1/public/hosts/targiehandlu.pl/lock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //credentials : 'include',
    body: JSON.stringify( {uuid, cart} )
  }); 

  const json = yield call([response, response.json]);

  if (response.ok && response.status >= 200 && 'data' in json) {
    // yield put( linkedVoteSuccess(json.data) );
  } else {
    // yield put( linkedVoteError(json.error) );
  }

}



const rootSaga = function* root() {

  const sagas = [

    takeEvery(FORM_ACTION_STARTED, handleGtmEvent),
    takeEvery(FORM_ACTION_FINISHED, handleGtmEvent),

    //takeEvery(SNACKBAR_SHOW, handleLogoutFn),
    takeEvery(FAQ_TOGGLE, changeUrlWhenFaqsSelected),
    // takeEvery(CART_ITEM_ADD, selectBoothWhenCartItemAdded),
    // takeEvery(CART_ITEM_ADD, updateDialogForQuickCheckout),
    // takeEvery(CART_ITEM_REMOVE, unSelectBoothWhenCartItemRemoved),
    // takeEvery(CART_RESET, unSelectAllBooths),
    takeEvery(RESOURCE_FETCH_REQUESTED, accumulateFetches),
    takeEvery(RESOURCE_FETCH_ERROR, handleFetchErrors),
    takeEvery(BOOTH_CHECKED, handleBoothCheck),

    takeEvery(LINKEDIN_VOTE_REQUESTED, handleLinkedinVoteRequest),
    takeEvery(LINKEDIN_VOTE_SUCCESS, handleVotingData),

    takeEvery(VOTE_STATUS_CHECK, handleVoteStatus),
    takeEvery(SETTINGS_SET, handleFetchTranslations),

    takeEvery(SET_USER_TOKEN, handleRehydrate),

    takeEvery(CART_ITEM_ADD, handleLocks),
    takeEvery(CART_ITEM_REMOVE, handleLocks),
    takeEvery(CART_RESET, handleLocks)

  ]

  yield all(sagas);


 

};

export default rootSaga;



/**
 * 
 * export default function* appSaga() {


  const sagas = [
    function* changeEventSaga(){ 
      yield takeEvery(CHANGE_EVENT, changeEvent)
    },
    function* changeGroupSaga(){ 
      yield takeEvery(CHANGE_GROUP, changeGroup)
    },
    function* asdasdSaga(){ 
      yield takeEvery(CRUD_GET_LIST_SUCCESS, getAdminsWhen)
    },
    function* handleRecordUpdateAfterFileUpload(){
      yield takeEvery(FILE_UPLOAD, recordUpdateAfterFileUpload)
    }
    
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );


  
  // yield all([takeEvery(`${BULK_CHANGE_COMPANY_ADMIN}_SUCCESS`, removeCompanyFilters)]);
}

 */