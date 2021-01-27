import { createSelector } from 'reselect';
import { getPosts, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const MobileAwarePostsSelector = createSelector(
    getPosts,
    getFilteringProps,
    (posts, props) => processArrayData( posts, props )
)


export const MobileAwareFeaturedPostsSelector = createSelector(
    MobileAwarePostsSelector,
    (posts) => posts.filter(post => post.is_sticky || post.is_promoted)
)
