import { createSelector } from 'reselect';
import { getPosts, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const MobileAwarePostsSelector = createSelector(
    getPosts,
    getFilteringProps,
    (posts, props) => processArrayData( posts, props )
)
  
