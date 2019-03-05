import * as Types from './types';

export function facebookChangeStatus(status) {
  return {
    type: Types.FB_STATUS_CHANGE,
    status: status
  };
}