import React from 'react'
import find from 'lodash/find'
import { resizeCloudinaryImage } from '../helpers';


const EmbedPostImage = ({id, post_id, images}) => {
    const image = find(images, (item)=>item.id == id);
    return image ? <img src={resizeCloudinaryImage(image.path, 1000, 1000)} alt="" /> : null
}

export default EmbedPostImage;
