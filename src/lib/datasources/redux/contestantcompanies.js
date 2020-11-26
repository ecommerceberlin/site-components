import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy'
import { getContestantCompanies, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';
import get from 'lodash/get'

export const FilteredContestantCompanies = createSelector(
    getContestantCompanies,
    getFilteringProps,
    (items, props) => processArrayData(items, props)
  )

  export const ContestantCompaniesKeywordsSelector = createSelector(
    getContestantCompanies,
    getFilteringProps,
    (items, props) => {

      let allUsedKeywords = [];

      if(Array.isArray(items)){
        allUsedKeywords = items.map(item => "keyword_source" in props && get(item, props.keyword_source, false) ? get(item, props.keyword_source) : get(item, "profile.awards_category")).filter(item => item.length > 1)
      }

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
            return items.filter(item => get(item, props.keyword_source) == props.keyword)
        }

        return items.filter(item => get(item, "profile.presentation_category") == props.keyword)
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