import React from 'react'
import { useTranslate } from '../i18n';
import Typography from '@material-ui/core/Typography';


const Translatable = ({label, children, ...props}) => {
    const [translate] = useTranslate();
    return ( <Typography {...props}>{label ? translate(label): translate(children)}</Typography>)
}

export default Translatable