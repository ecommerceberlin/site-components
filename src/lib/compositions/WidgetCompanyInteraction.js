import React from 'react';
import { Typography, Paper, Grid, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {grey, red} from '@material-ui/core/colors'
import {TwoColsLayout} from '../components/MyLayouts'
import { useTranslate } from '../i18n'
import { CompanyCheckVisitorRelation } from '../components/Company';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: grey[100],
    },
    icon: {
        fontSize: 100,
        color: red[700]
    },
    markdown: {
        maxWidth: 600,
        fontSize: theme.typography.pxToRem(18),
        maxWidth: 800
    }
}))


const WidgetCompanyInteraction = ({icons=null, label="", regFormLabel="", data={}, cname="", endpoint="", render}) => {

    const [translate] = useTranslate()
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
        <TwoColsLayout 
        left={
            <Box ml={2} mt={1} mb={3}>
            <Grid container alignItems='center' justifyContent='center' direction="column" spacing={1}>
                <Grid item>
                {icons}
                </Grid>
                <Grid item>
                <ReactMarkdown className={classes.markdown}>{translate(label, {cname})}</ReactMarkdown>   
                </Grid>
            </Grid>
            </Box>
        } 
        leftSize={6}
        right={
            <Box p={2}>

                <CompanyCheckVisitorRelation 
                    label={regFormLabel} 
                    data={data} 
                    endpoint={endpoint} 
                    render={render} />
            </Box>
        } />
     </Paper>)

}


 

export default WidgetCompanyInteraction
