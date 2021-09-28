import * as Types from './types';

// import { parseUrlVals } from '../../helpers/base';

export function setUserToken(token){
  return {
    type : Types.SET_USER_TOKEN,
    token: token
  }
}

export function removeUserToken() {
  return {
    type: Types.REMOVE_USER_TOKEN
  };
}


export function linkedUidReset(){
  return {
    type : Types.LINKEDIN_TOKEN_RESET
  }
}

export function linkedUidReceived(uid) {
  return {
    type: Types.LINKEDIN_TOKEN_SUCCESS,
    uid: uid
  };
}

export function linkedVoteRequest(service, id) {
  return {
    type: Types.LINKEDIN_VOTE_REQUESTED,
    service : service,
    id: id
  };
}

// export function linkedVoteRequestAfterOauth(service, id) {
//   return {
//     type: Types.LINKEDIN_AUTOVOTE_REQUESTED,
//     service : service,
//     id: id
//   };
// }

export function linkedVoteSuccess(data) {
  return {
    type: Types.LINKEDIN_VOTE_SUCCESS,
    data : data
  };
}

export function linkedVoteError(error) {
  return {
    type: Types.LINKEDIN_VOTE_ERROR,
    ...error
  };
}

export function votingStatus(service) {
  return {
    type: Types.VOTE_STATUS_CHECK,
    service : service
  };
}

export function votingStatusSuccess(data) {
  return {
    type: Types.VOTE_STATUS_SUCCESS,
    data : data
  };
}

export function votingStatusError(error) {
  return {
    type: Types.VOTE_STATUS_ERROR,
    ...error
  };
}











export function roleSelect(role) {
  return {
    type: Types.ROLE_SELECT,
    role: role
  };
}

export function roleReset() {
  return {
    type: Types.ROLE_RESET
  };
}

export function faqToggle(labels = [], state = false) {
  return {
    type: Types.FAQ_TOGGLE,
    labels: labels,
    state: state
  };
}

export function faqUrl(labels) {
  return {
    type: Types.FAQ_URL,
    labels: labels
  };
}

export function resourceFetchRequest(resource, reload = false) {
  return {
    type: Types.RESOURCE_FETCH_REQUESTED,
    resource: resource,
    reload : reload
  };
}

export function resourceFetchSuccess(resource, data) {
  return {
    type: Types.RESOURCE_FETCH_SUCCESS,
    resource: resource,
    data: data
  };
}

export function resourceList(endpoint, data) {
  return {
    type: Types.RESOURCE_LIST,
    endpoint: endpoint,
    data: data
  };
}

export function resourceFetchError(resource, error) {
  return {
    type: Types.RESOURCE_FETCH_ERROR,
    resource: resource,
    error: error
  };
}

export function snackbarShow(payload) {
  return {
    type: Types.SNACKBAR_SHOW,
    payload: payload
  };
}

export function snackbarHide() {
  return {
    type: Types.SNACKBAR_HIDE
  };
}

export function drawerShow() {
  return {
    type: Types.DRAWER_SHOW
  };
}

export function drawerHide() {
  return {
    type: Types.DRAWER_HIDE
  };
}

export function dialogShow(payload = {}) {
  return {
    type: Types.DIALOG_SHOW,
    payload: payload
  };
}

export function dialogTitleChange(payload = {}) {
  return {
    type: Types.DIALOG_TITLE_CHANGE,
    payload: payload
  };
}

export function dialogSave() {
  return {
    type: Types.DIALOG_SAVE
  };
}

export function dialogRevert() {
  return {
    type: Types.DIALOG_REVERT
  };
}

// export function dialogModify(name, value) {
//   return {
//     type: Types.DIALOG_MODIFY,
//     payload: payload
//   };
// }

export function dialogHide() {
  return {
    type: Types.DIALOG_HIDE
  };
}


export function boothChecked(boothName) {
  return {
    type: Types.BOOTH_CHECKED,
    payload: boothName
  };
}

export function markBooths(boothIds) {
  return {
    type: Types.BOOTH_SELECT,
    payload: boothIds
  };
}

// export function boothSelect(boothId) {
//     return {
//       type: Types.BOOTH_SELECT,
//       payload: boothId
//     };
// }

// export function boothUnselect(boothId) {
//   return {
//     type: Types.BOOTH_UNSELECT,
//     payload: boothId
//   };
// }

// export function boothsReset() {
//   return {
//     type: Types.BOOTHS_RESET
//   };
// }

export function cartItemAdd(ticketId, quantity, formdata = {}) {
  return {
    type: Types.CART_ITEM_ADD,
    ticketId: ticketId,
    quantity: quantity,
    formdata: formdata
  };
}

export function cartItemRemove(ticketId) {
  return {
    type: Types.CART_ITEM_REMOVE,
    ticketId: ticketId
  };
}

export function cartReset() {
  return {
    type: Types.CART_RESET
  };
}

export function cartValidate(payload) {
  return {
    type: Types.CART_VALIDATE,
    payload: payload
  };
}


export function searchStarted(query) {
  return {
    type: Types.SEARCH_STARTED,
    query: query,
  }
}


export function pageLoadingStart() {
  return {
    type: Types.PAGE_LOADING_START
  }
}

export function pageLoadingEnd() {
  return {
    type: Types.PAGE_LOADING_END
  }
}



export function pageActionShow(payload) {
  return {
    type: Types.PAGE_ACTION_SHOW,
    payload: payload
  }
}

export function pageActionHide() {
  return {
    type: Types.PAGE_ACTION_HIDE
  }
}


export function uuidSet(payload){
  return {
    type: Types.UUID_SET,
    payload
  }
}

export function lockSuccess(data){
  return {
    type: Types.LOCK_SUCCESS,
    data,
    failed: []
  }
}

export function lockFailed(data, failed){
  return {
    type: Types.LOCK_FAILED,
    data,
    failed
  }
}

export function userInteractedWith(name){
  return {
    type: Types.USER_INTERACTED_WITH,
    name: name
  }
}