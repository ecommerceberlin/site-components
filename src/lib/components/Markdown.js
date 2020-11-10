import React from 'react';
import {translate} from '../i18n'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import PostImage from './PostImage'


const renderers = ({id, images}) => ({
    html: ({value, children}) => {
        if(value === "</data-image>"){
            return null;
        }

        if(value.indexOf("<data-image")===0){
            const {groups} = /id\=(["'])(?<id>.*?[^\\])\1/.exec(value)
            return <PostImage post_id={id} images={images} id={groups.id} />
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