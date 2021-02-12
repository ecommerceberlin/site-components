import { MyHead } from '../next';
//import Companies from '../datasources/Companies'
import SingleRecord from '../datasources/SingleRecord'
import Settings from '../datasources/Settings'
import get from 'lodash/get'
import {slug} from '../helpers'
  
 const HeadPost = ({id, record, children}) => (
    <Settings>{(get) => (
        <SingleRecord endpoint="posts" id={id} slug={slug}>{(record) => (
            <MyHead
                image={ record.og_image }
                url={ `/${slug(get(record, "meta.headline"))},${get(record,"id")}` }
                titleLabel={[
                    'post.og_title',
                    { title: get(record, 'meta.headline') }
                ]}
                descriptionLabel={[
                    'post.og_description',
                    { description: get(record, 'meta.quote') }
                ]}>{children}</MyHead>
        )}</SingleRecord>
    )}</Settings>
   
)

HeadPost.defaultProps = {
    record: {}
}

export default HeadPost;
