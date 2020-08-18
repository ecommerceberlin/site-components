import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy'
import { getJurors, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const FilteredCallForPapers = createSelector(
    getJurors,
    getFilteringProps,
    (callforpapers, props) => processArrayData(callforpapers, props)
  )

//   export const CallForPapersKeywordsSelector = createSelector(
//     getJurors,
//     getFilteringProps,
//     (callforpapers, props) => {

//       let allUsedKeywords = [];
//       if(Array.isArray(callforpapers)){
//         const allUsedKeywords = callforpapers.map(item => "keyword_source" in props && props.keyword_source in item ? item[props.keyword_source] : item.presentation_category).filter(item => item.length > 1)
//       }

//       return [...new Set(allUsedKeywords )];
//     }
//   )
  
//   export const FilteredByKeywordCallForPapers = createSelector(
//     FilteredCallForPapers,
//     getFilteringProps,
//     (callforpapers, props) => {

//         if(!"keyword" in props){
//             return callforpapers
//         }

//         if("keyword_source" in props){
//             return callforpapers.filter(item => item[props.keyword_source] == props.keyword)
//         }

//         return callforpapers.filter(item => item.presentation_category == props.keyword)
//     }
//   )
  
  export const KeyedCallForPapersSelector = createSelector(
    getJurors,
    (callforpapers) => keyBy(callforpapers, "id")
  )
  
  export const SingleCallForPaperSelector = createSelector(
    KeyedCallForPapersSelector,
    (_, props) => "id" in props ? props.id : null,
    (keyed, id) => id && id in keyed ? keyed[id] : {}
  )
  
  /* End CALLFORPAPERS */