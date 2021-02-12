import { MyHead } from '../next';
//import Companies from '../datasources/Companies'
import SingleRecord from '../datasources/SingleRecord'
import Settings from '../datasources/Settings'
import get from 'lodash/get'
import {slug} from '../helpers'
  
 const HeadPost = ({id, record, children}) => (
    <Settings>{(get) => (
        <SingleRecord endpoint="posts" id={id} slug={slug}>{(record) => {

            const headline = get(record, "meta.headline")
            const id = get(record, "id")
            const quote = get(record, "meta.quote")

            return (
                <MyHead
                    image={ record.og_image }
                    url={ `/${slug(headline)},${id}` }
                    titleLabel={[
                        'post.og_title',
                        { title: headline }
                    ]}
                    descriptionLabel={[
                        'post.og_description',
                        { description: quote }
                    ]}>{children}</MyHead>
            )
        }}</SingleRecord>
    )}</Settings>
   
)

HeadPost.defaultProps = {
    record: {}
}

export default HeadPost;
