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
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({

}))

const fetcher = url => fetch(url).then(r => r.json())
const getStage = (stages, stage) => stages && Array.isArray(stages) && stages.length ? stages.find(item => item.presentation_venue === stage.toUpperCase()) : null

const WidgetStage = ({stage, setting}) => {

    // const [translate] = useTranslate()
    // const classes = useStyles()
    const _stage = stage.toUpperCase()
    const {regform, api, discordProps, ...stages} = useSettings(setting, {});

     const {
        stream, 
        discord, 
        restricted,
        sponsor,
        placeholder
    } = _stage in stages? stages[_stage]: {};

    //AGENDA
    const { data, error } = useSWR(api, fetcher, { 
        refreshInterval: 10*1000, //pull every 10 seconds
        refreshWhenHidden: false 
    })

    const current = getStage(data, _stage)

    return (
      
        <Wrapper label={["streaming.stage.title", {name: _stage}]} dense={true}> 
       
                {current && <StageOverview data={current} stage={_stage} />}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                        <StageContent 
                            stage={_stage} 
                            embed={stream} 
                            placeholder={placeholder} 
                            regform={regform}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={3} xl={3} >
                        <DiscordChat chatId={discord} {...discordProps} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} lg={12} xl={12} >
                    <StagesOther data={data} stage={_stage} />
                    </Grid>

                </Grid>

              

        </Wrapper>
       
    )
   
}

WidgetStage.defaultProps = {
   stage: "",
   setting: "stages",
}

export default WidgetStage