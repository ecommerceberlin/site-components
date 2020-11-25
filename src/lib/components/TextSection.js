import React from 'react';
import _get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({

}))


const TextSection = ({baseLabel, margin, padding, isOption, record, name, ...boxProps}) => {

    const [translate] = useTranslate();
    const classes = useStyles();

    const value = _get(record, name, "");

    if(value && value.length > 2){

        if(isOption){
            return <Box {...boxProps} m={margin} p={padding}><Typography variant="body1" ><strong>{translate(`${baseLabel}.${value}`)}</strong></Typography></Box>
        }


        return (<Box {...boxProps} m={margin} p={padding}><Typography variant="body1" >
        <strong>{translate(`${baseLabel}.${name}`)}</strong> {value.indexOf("http")>-1 ? <a href={value} target="_blank">{value}</a> : value}
        </Typography></Box>)
    }

    return null

}

TextSection.defaultProps = {
    baseLabel: "awards.fields",
    margin: 0,
    padding: 0,
    isOption: false
}

export default TextSection;



