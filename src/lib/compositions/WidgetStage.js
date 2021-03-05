import React from 'react';
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Wrapper from '../components/Wrapper'
// import { useTranslate } from '../i18n';
import StageOverview from '../components/StageOverview'
import StageContent from '../components/StageContent'
import StagesOther from '../components/StagesOther'
import DiscordChat from '../components/DiscordChat'
import {useSettings} from '../helpers'

const useStyles = makeStyles(theme => ({

}))

const fetcher = url => fetch(url).then(r => r.json())

const WidgetStage = ({stage, placeholder}) => {

    // const [translate] = useTranslate()
    // const classes = useStyles()

    const getSetting = useSettings();
    const stages = getSetting("stages");

    console.log(stages)


    const { data, error } = useSWR('https://proxy.eventjuicer.com/api/schedule', fetcher, { 
        refreshInterval: 10*1000, //pull every 10 seconds
        refreshWhenHidden: true 
    })


    return (
        <Wrapper>
            <Box mt={3}>
                
                <StageOverview data={data} stage={stage} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={7}>
                        <StageContent data={data} stage={stage} placeholder={placeholder} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={3} >
                    
                        <DiscordChat stage={stage} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={2}>
                        <StagesOther data={data} stage={stage} />
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    )
   
}

WidgetStage.defaultProps = {
   stage: "",
   placeholder: "https://res.cloudinary.com/eventjuicer/image/upload/f_auto/v1614810311/stillphoto.jpg"
}


export default WidgetStage