import React, {createElement} from 'react';
import {useTranslate} from '../i18n'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import EmbedPostImage from './EmbedPostImage'
import EmbedSection from './EmbedSection'
import EmbedTwitter, {EmbedTwitterRegexp} from './EmbedTwitter'
import cn from 'classnames'
import { resizeCloudinaryImage } from '../helpers';


// const urlShortener = (url) => {

//     url = url.replace(/(^\w+:|^)\/\//, '');
//     url = url.substr(0, 20)

//     return `${url}...`
// }

const renderers = ({id, images, cover, ...other}) => ({

    image: (data) => {

        const {alt, node: {url} } = data;

        if(url === cover){
            return null;
        }

        return <img src={resizeCloudinaryImage(url, 1000, 1000)} alt="" style={{width: "100%"}} />;
    },

    link: ({href, node, children}) => {

        if(href.indexOf("vimeo")>-1 || href.indexOf("youtu")>-1){
            return <EmbedSection data={href} playerProps={{light: false}} />
        }

        if(EmbedTwitterRegexp.test(href)){
            return <EmbedTwitter href={href} />
        }

        return <a href={href} target="_blank">{children}</a>

    },

    html: ({value, children, ...rest}) => {
        if(value === "</data-image>"){
            return null;
        }

        if(value.indexOf("<data-image")===0){
            const {groups} = /id\=(["'])(?<id>.*?[^\\])\1/.exec(value)
            return <EmbedPostImage post_id={id} images={images} id={groups.id} />
        }
    
        return value;
    },
})

const useStyles =  makeStyles(theme => ({
    root : {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(28),

        "& blockquote": {
            fontSize: "120%",
            fontWeight: 500
        }
    },
    post: {
        fontSize: theme.typography.pxToRem(21),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(32),

        "& blockquote": {
            fontSize: "120%",
            fontWeight: 500
        }
    },

}))

const Markdown = ({label, children, rendererData, big}) => {
    const [translate] = useTranslate();
    const classes = useStyles();
    return <div className={cn(classes.root, {
        [classes.post]: big
    })}>
    <ReactMarkdown source={label ? translate(label) : children} renderers={rendererData? renderers(rendererData): undefined } />
    </div>
}

Markdown.defaultProps = {
    label : null, 
    rendererData: null,
    big: false
}
 
export default Markdown