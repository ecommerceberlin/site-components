import { createSelector } from 'reselect';
import {processArrayData} from '../../helpers'

import {
    getAllPresenters, 
    getViewPortWidth, 
    getFilteringProps
} from '../../redux/selectors'

export const FilteredAllPresenters = createSelector(
    getAllPresenters,
    getFilteringProps,
    (presenters, props) => processArrayData(presenters, props)
  )
  
  export const MobileAwareFilteredAllPresenters = createSelector(
    FilteredAllPresenters,
    getViewPortWidth,
    getFilteringProps,
    (presenters, width, props) => {
    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && presenters.length > props.mobile) {
        presenters = presenters.slice(0, props.mobile);
     }
     return presenters
    }
  )