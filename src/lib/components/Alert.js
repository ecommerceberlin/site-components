import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {useTranslate} from '../i18n'

const Alert = ({type="error", label=null, content=null}) => {

    const [translate] = useTranslate();

    return <MuiAlert severity={type}>{label && translate(label)}{content}</MuiAlert>
}


export default Alert;