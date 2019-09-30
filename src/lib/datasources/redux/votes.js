
import { createSelector } from 'reselect';
import keyBy from 'lodash/keyBy'
import { getVotes, getFilteringProps} from '../../redux/selectors'


export const KeyedVotesSelector = createSelector(
    getVotes,
    (votes) => keyBy(votes, "participant_id")
  )
  