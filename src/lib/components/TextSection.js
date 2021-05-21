import React from 'react';
import _get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import ReactMarkdown from 'react-markdown'
import {useSettings} from '../helpers'


const useStyles = makeStyles(theme => ({

}))

const defaultProps = {
    baseLabel: "awards.fields",
    margin: 0,
    padding: 0,
    isOption: false,
    boxProps: {},
    isLink: false
}

const TextSection = ({setting, isOption, record, name, isLink, ...props}) => {

    const [translate] = useTranslate();
    const classes = useStyles();
    const settings = useSettings(setting, {})
    const {baseLabel, margin, padding, boxProps} = Object.assign({}, defaultProps, settings, props)

    let value = _get(record, name, "").trim();

    if(value && value.length > 2){

        /***
         * translate value - usable in selects...
         * 
         */
        if(isOption){

            return <Box {...boxProps} m={margin} p={padding}><Typography variant="body1" component="div" ><strong>{translate(`${baseLabel}.${value}`)}</strong></Typography></Box>
        }

        // if(isLink && !/(?:__|[*#])|\[(.*?)\]\(.*?\)/.test(value) && value.indexOf("http")){
        //     value = `[${value}](${value})`
        // }

        return (<Box {...boxProps} m={margin} p={padding}><Typography variant="body1" component="div" >
        <strong>{translate(`${baseLabel}.${name}`)}</strong><ReactMarkdown children={value} />
        </Typography></Box>)
    }

    return null

}


export default TextSection;



