import { createSelector } from 'reselect';
import { processArrayData } from '../../helpers'

import {
    getAdminReport, 
    getFilteringProps
} from '../../redux/selectors'

export const FilteredAdminReport = createSelector(
    getAdminReport,
    getFilteringProps,
    (adminreport, props) => processArrayData(adminreport, props)
  )
  
