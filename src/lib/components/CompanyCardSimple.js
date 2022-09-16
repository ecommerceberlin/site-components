import React from 'react'
import { useRecord } from '../helpers'
import { TwoColsLayout } from './MyLayouts'
import get from 'lodash/get'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTranslate } from '../i18n'
import {CompanyContextProvider, CompanyLogotype} from './Company'

const CompanyCardSimple = ({id=0, label="define label", labelParam=""}) => {

    const company = useRecord("companies", id)
    const [translate] = useTranslate()

    if(!company){
        return null
    }

    return (
        <Box m={2}>
        <CompanyContextProvider data={company}>
        <TwoColsLayout 
            leftSize={4}
            left={<CompanyLogotype company={company} />}
            leftCentered={true}
            right={
                <>
                <Typography variant="h4" gutterBottom>{translate(label, {data: labelParam})}</Typography>
                <div dangerouslySetInnerHTML={{__html: get(company, "profile.about", "")}}></div>
                </>
            }
        />
        </CompanyContextProvider>
        </Box>
    )


}




export default CompanyCardSimple