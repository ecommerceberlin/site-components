import * as Types from './types';

export function requestMeetup(company_id){
  return {
    type : Types.MEETUP_REQUESTED,
    company_id : company_id
  }
}