import React from 'react';
import {translate} from '../i18n'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles = theme => ({
    root : {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 400,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.pxToRem(23),
    }
})

const Markdown = ({label, translate, locale, classes, children}) => <div className={classes.root}>
    <ReactMarkdown source={label ? translate(label) : children} />
    </div>

Markdown.defaultProps = {
    label : null
}

const enhance = compose(
    translate,
   withStyles(styles)
)
export default enhance(Markdown)