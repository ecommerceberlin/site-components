import React from 'react';
import {useTranslate} from '../i18n'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import EmbedPostImage from './EmbedPostImage'
import EmbedVimeo from './EmbedVimeo'
import EmbedYouTube from './EmbedYouTube'
import EmbedTwitter, {EmbedTwitterRegexp} from './EmbedTwitter'
import cn from 'classnames'

/**
 * function Html(props) {
  if (props.skipHtml) {
    return null
  }

  const dangerous = props.allowDangerousHtml || props.escapeHtml === false

  const tag = props.isBlock ? 'div' : 'span'

  if (!dangerous) {
    return createElement(React.Fragment || tag, null, props.value)
  }

  const nodeProps = {dangerouslySetInnerHTML: {__html: props.value}}
  return createElement(tag, nodeProps)
}
*/


const renderers = ({id, images, cover, ...other}) => ({

    image: (data) => {

        const {alt, node: {url} } = data;

        if(url === cover){
            return null;
        }

    },

    link: ({href}) => {

        if(href.indexOf("vimeo")>-1){
            return <EmbedVimeo href={href} />
        }

        if(href.indexOf("youtu")>-1){
            return <EmbedYouTube href={href} />
        }

        if(EmbedTwitterRegexp.test(href)){
            return <EmbedTwitter href={href} />
        }

        console.log(href, EmbedTwitterRegexp.test(href))

        return <a href={href}>{href}</a>
    },

    html: ({value, children}) => {
        if(value === "</data-image>"){
            return null;
        }

        if(value.indexOf("<data-image")===0){
            const {groups} = /id\=(["'])(?<id>.*?[^\\])\1/.exec(value)
            return <EmbedPostImage post_id={id} images={images} id={groups.id} />
        }
    
        return null;
    },
})

const useStyles =  makeStyles(theme => ({
    root : {
        fontSize: theme.typography.pxToRem(17),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(28),
    },
    post: {
        fontSize: theme.typography.pxToRem(21),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(32),
    }
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