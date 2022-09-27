import React from 'react'
import { useTranslate } from '../i18n';
import Typography from '@material-ui/core/Typography';
import { isArray } from 'lodash';

const Translatable = ({label=null, labelParams={}, children=null, ...props}) => {
    const [translate] = useTranslate();
    const translated = label && isArray(label)? translate(label[0], label[1]): translate(label)

    return ( <Typography {...props}>{label? translated: translate(children)}</Typography>)
}

export default Translatable