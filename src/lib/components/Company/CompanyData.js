import React from 'react'
import { useCompany } from "./context"
import Markdown from "react-markdown"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslate } from "../../i18n"
import { makeStyles } from '@material-ui/core/styles';
import Button from '../MyButton'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.pxToRem(16),
        maxWidth: 800
    }
}))

const MarkdownSection = ({name, text, limit=1000}) => {

    const [showMore, setShowMore] = React.useState(false)
    const [translate] = useTranslate()
    const classes = useStyles()
    const {legacy} = useCompany()
    
    if(!text){
        return null
    }


    const hasLongText = !legacy && text.length > limit
    const output = hasLongText && !showMore? `${text.substring(0, limit)}...`: text

    const toggleMore = () => setShowMore(showMore? false: true)

    return (
        <Box>
        <Typography variant="overline" component="div">{translate(`companies.profile.${name}`)}</Typography>
        
        {legacy? <div dangerouslySetInnerHTML={{
        __html: output}} />: null}
        
        {!legacy? <Markdown className={classes.root}>{output}</Markdown>: null}

        {hasLongText ? <Box textAlign="center"><Button label={showMore? "common.less": "common.more"} onClick={toggleMore} startIcon={<UnfoldMoreIcon /> }/></Box>: null}
        </Box>
    )
}

const CompanyData = () => {

    const {about, products, expo} = useCompany()


    return <Box>

        <MarkdownSection name="about" text={about} />
        <MarkdownSection name="products" text={products} />
        <MarkdownSection name="expo" text={expo} />

    </Box>
}

export default CompanyData