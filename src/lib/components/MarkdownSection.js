
import React from 'react'
import Markdown from "react-markdown"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslate } from "../i18n"
import Button from './MyButton'


const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.pxToRem(16),
        maxWidth: 800
    }
}))


const MarkdownSection = ({name=null, text, limit=500}) => {

    const [showMore, setShowMore] = React.useState(false)
    const [translate] = useTranslate()
    const classes = useStyles()
    
    if(!text){
        return null
    }

    const hasLongText = text.length > limit
    const output = hasLongText && !showMore? `${text.substring(0, limit)}...`: text

    const toggleMore = () => setShowMore(showMore? false: true)

    return (
        <Box>

        {name ? <Typography variant="overline" component="div">{translate(`presenters.fields.${name}`)}</Typography>: null}
        
        <Markdown className={classes.root}>{output}</Markdown>

        {hasLongText ? <Box textAlign="center"><Button label={showMore? "common.less": "common.more"} onClick={toggleMore} startIcon={<UnfoldMoreIcon /> }/></Box>: null}
        </Box>
    )
}

export default MarkdownSection