import { MyHead } from '../next';
//import Companies from '../datasources/Companies'
import SingleRecord from '../datasources/SingleRecord'
import Settings from '../datasources/Settings'
import get from 'lodash/get'

  
 const HeadPost = ({id, slug, path, ogTemplate, defaultLang, children}) => (
    <Settings>{(get) => (
        <SingleRecord endpoint="posts" id={id} slug={slug}>{(record) => (
            <MyHead
                image={ record.og_image }
                url={`${path}/${slug}`}
                titleLabel={[
                  'post.opengraph.title',
                  { name: get(record, 'meta.headline') }
                ]}>{children}</MyHead>
        )}</SingleRecord>
    )}</Settings>
   
)

HeadPost.defaultProps = {
    path : "/",
    id: null,
    slug: null
}

export default HeadPost;