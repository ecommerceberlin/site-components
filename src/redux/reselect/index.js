import { createSelector } from 'reselect';
import _groupBy from 'lodash/groupBy';

import { mapValues, sortBy, fromPairs, map } from 'lodash/sortBy';

const sortByKeys = object => {
  const keys = Object.keys(object);
  const sortedKeys = sortBy(keys);

  return fromPairs(map(sortedKeys, key => [key, object[key]]));
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const getPresenters = state => state.resources.presenters;
const getFilters = state => state.app.filterParams;

const prepare = (
  resource,
  stage1 = 'presentation_time',
  stage2 = 'presentation_venue'
) =>
  mapValues(_groupBy(resource, item => item[stage1]), data =>
    _groupBy(data, item => item[stage2])
  );

export const presenterSelector = createSelector(
  getPresenters,
  getFilters,
  (presenters, filters) => presenters
);
