import { createSelector } from 'reselect';
import { getPosts, getResourceLists, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const MobileAwarePostsSelector = createSelector(
    getPosts,
    getResourceLists,
    getFilteringProps,
    (posts, lists, props) => {
        if("posts" in lists){
            return lists.posts.map(id => id in posts? posts[id]: null).filter(Boolean)
        }
        return [];
       // return processArrayData( posts, props )
    }
)


export const MobileAwareFeaturedPostsSelector = createSelector(
    MobileAwarePostsSelector,
    (posts) => posts.filter(post => post.is_sticky || post.is_promoted)
)


export const MobileAwareFilteredPostsSelector = createSelector(
    getPosts,
    getResourceLists,
    getFilteringProps,
    (posts, lists, props) => {

        const searchParams = new URLSearchParams(`company=${props.company}`)
        searchParams.sort()
        const endpoint = `posts?${ searchParams.toString() }` 

        if(endpoint in lists){
            const ids = lists[endpoint]
            const out = ids.map(id => id in posts? posts[id]: null).filter(Boolean)
            console.log(endpoint, out)
            return out;
        }

        return [];
    }
)