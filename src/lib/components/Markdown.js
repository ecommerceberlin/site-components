import React from 'react';
import {translate} from '../i18n'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import EmbedPostImage from './EmbedPostImage'
import EmbedVimeo from './EmbedVimeo'
import EmbedYouTube from './EmbedYouTube'

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

const VimeoEmbed = ({href}) => <div>vimeo</div>
const YouTubeEmbed = ({href}) => <div>youtube</div>

const renderers = ({id, images}) => ({
    link: ({href}) => {

        if(href.indexOf("vimeo")>-1){
            return <EmbedVimeo href={href} />
        }

        if(href.indexOf("youtu")>-1){
            return <EmbedYouTube href={href} />
        }
        
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

const styles = theme => ({
    root : {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(23),
    }
})

const Markdown = ({label, translate, locale, classes, children, rendererData}) => <div className={classes.root}>
    <ReactMarkdown source={label ? translate(label) : children} renderers={rendererData? renderers(rendererData): undefined } />
    </div>

Markdown.defaultProps = {
    label : null,
    rendererData: null
}

const enhance = compose(
    translate,
   withStyles(styles)
)
export default enhance(Markdown)