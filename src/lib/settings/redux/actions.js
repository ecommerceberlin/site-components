import * as Types from './types'
 

export function setSettings(payload) {
    
      return {
        type: Types.SETTINGS_SET,
        payload: payload
      };
    
  }
