import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {useTranslate} from '../i18n'

const Alert = ({type, label=null, content=null}) => {

    const [translate] = useTranslate();

    return <MuiAlert severity={type}>{label && translate(label)}{content}</MuiAlert>
}


Alert.defaultProps = {
    type: "error"
}

export default Alert;