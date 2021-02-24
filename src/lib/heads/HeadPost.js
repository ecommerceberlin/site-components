import React from 'react'
import { MyHead } from '../next';
import SingleRecord from '../datasources/SingleRecord'
import Settings from '../datasources/Settings'
import {slug} from '../helpers'
import get from 'lodash/get'

 const HeadPost = ({id, record, children}) => (

    <Settings>{(getSetting) => (

        <SingleRecord endpoint="posts" id={id}>{(record) => {

            const headline = get(record, "meta.headline", "")
            const id = get(record, "id", 0)
            const quote = get(record, "meta.quote", "")
            const image = get(record, "og_image", "")

            return (
                <MyHead
                    key={ id }
                    image={ image }
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
    record: {},
    id: 0
}

export default HeadPost;
