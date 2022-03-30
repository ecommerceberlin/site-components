import React from 'react'
import Markdown from "react-markdown"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslate } from "../../i18n"
import { makeStyles } from '@material-ui/core/styles';
import Button from '../MyButton'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { usePresentation } from '../Schedule/context'

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.pxToRem(16),
        maxWidth: 800
    }
}))

const MarkdownSection = ({name, text, limit=500}) => {

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
        <Typography variant="overline" component="div">{translate(`presenters.fields.${name}`)}</Typography>
        
        <Markdown className={classes.root}>{output}</Markdown>

        {hasLongText ? <Box textAlign="center"><Button label={showMore? "common.less": "common.more"} onClick={toggleMore} startIcon={<UnfoldMoreIcon /> }/></Box>: null}
        </Box>
    )
}

const CompanyData = () => {

    const {title, description, presenter, position, company, bio} = usePresentation()


    return <Box>

        <Box mb={3}>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        <MarkdownSection name="presentation_description" text={description} />
        </Box>


        <Box>
        <Typography variant="h5">{presenter}</Typography>
        <Typography variant="body1" display='block' gutterBottom>{position} @ {company}</Typography>
        <MarkdownSection name="bio" text={bio} limit={300} />
        </Box>


    </Box>
}

export default CompanyData