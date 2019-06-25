import React from 'react';
import {translate} from '../i18n'
import ReactMarkdown from 'react-markdown'

const Markdown = ({label, translate, locale, children}) => <ReactMarkdown source={label ? translate(label) : children} />

Markdown.defaultProps = {
    label : null
}

export default translate(Markdown)