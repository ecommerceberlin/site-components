import { createSelector } from 'reselect';

export const getSelectedVenue = state => state.app.selectedVenue;

export const VenueSelector = createSelector(
    getSelectedVenue,
    data => data
)
  