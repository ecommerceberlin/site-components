
import { useCompany } from "./context"
import ReactMarkdown from "react-markdown"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslate } from "../../i18n"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.pxToRem(16),
    }
    }
))

const MarkdownSection = ({name, text}) => {

    const [translate] = useTranslate()
    const classes = useStyles()

    if(!text){
        return null
    }

    return (
        <Box>
        <Typography variant="overline" component="div">{translate(`companies.profile.${name}`)}</Typography>
        <ReactMarkdown className={classes.root}>{text}</ReactMarkdown>
        </Box>
    )
}

const CompanyData = () => {

    const {about, products, expo} = useCompany()


    return <Box mt={5}>

        <MarkdownSection name="about" text={about} />
        <MarkdownSection name="products" text={products} />
        <MarkdownSection name="expo" text={expo} />

    </Box>
}

export default CompanyData