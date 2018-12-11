import * as Types from './types';

export function venueSelect(venueName) {
    return {
      type: Types.VENUE_SELECT,
      name: venueName
    };
}

export function venueSelectReset() {
    return {
      type: Types.VENUE_SELECT_RESET
    };
}