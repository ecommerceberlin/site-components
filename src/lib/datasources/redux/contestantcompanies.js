import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy'
import { getContestantCompanies, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const FilteredContestantCompanies = createSelector(
    getContestantCompanies,
    getFilteringProps,
    (items, props) => processArrayData(items, props)
  )

  export const ContestantCompaniesKeywordsSelector = createSelector(
    getContestantCompanies,
    getFilteringProps,
    (items, props) => {
      const allUsedKeywords = items.map(item => "keyword_source" in props && props.keyword_source in item ? item[props.keyword_source] : item.awards_category).filter(item => item.length > 1)
      const uniqueKeywords = [...new Set(allUsedKeywords )];
      return uniqueKeywords
    }
  )
  
  export const FilteredByKeywordContestantCompanies = createSelector(
    FilteredContestantCompanies,
    getFilteringProps,
    (items, props) => {

        if(!"keyword" in props){
            return items
        }

        if("keyword_source" in props){
            return items.filter(item => item[props.keyword_source] == props.keyword)
        }

        return items.filter(item => item.presentation_category == props.keyword)
    }
  )
  
  export const KeyedContestantCompaniesSelector = createSelector(
    getContestantCompanies,
    (items) => keyBy(items, "id")
  )
  
  export const SingleContestantCompaniesSelector = createSelector(
    KeyedContestantCompaniesSelector,
    (_, props) => "id" in props ? props.id : null,
    (keyed, id) => id && id in keyed ? keyed[id] : {}
  )
  
  /* End CALLFORPAPERS */