import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {useTranslate} from '../i18n'

const Alert = ({type, label}) => {

    const [translate] = useTranslate();

    return <MuiAlert severity={type}>{translate(label)}</MuiAlert>
}


Alert.defaultProps = {
    type: "error"
}

export default Alert;