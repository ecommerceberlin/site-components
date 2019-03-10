import * as Types from './types';


export function formActionStarted(payload) {
    return {
      type: Types.FORM_ACTION_STARTED,
      payload: payload
    };
}

export function formActionFinished(payload) {
    return {
      type: Types.FORM_ACTION_FINISHED,
      payload: payload
    };
}