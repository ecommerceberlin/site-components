import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { usePresentation } from '../Schedule/context'
import { MarkdownSection } from '..';





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