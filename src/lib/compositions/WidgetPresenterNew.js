
import React from 'react';
import SingleRecord from "../datasources/SingleRecord"
import Wrapper from '../components/Wrapper'
import {TwoColsLayout} from '../components/MyLayouts'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { PresentationContext } from '../components/Schedule/context';
import { PresenterSchedule, LogotypeAndAvatar, PresenterData} from '../components/Presenter'
import Sharer from '../components/Sharer'
import GetTicketLink from '../components/GetTicketLink'

import { Divider } from '@material-ui/core';

const WidgetPresenterNew = ({id=0}) => {

// const router = useRouter()

  return (

    <SingleRecord endpoint="presenters" id={id}>{(company) => <PresentationContext data={company}>
   
    <Wrapper label="">

    <TwoColsLayout
      reverse={true}
      leftSize={8}
      left={        
        <Box>
          <LogotypeAndAvatar />
         
          <Box mt={3} mb={3}>
            <Grid container spacing={2} alignItems="center">     
              {/* <Grid item><KeywordSelect keywords={get(company, 'profile.keywords', [])} /></Grid> */}
              <Grid item></Grid>
            </Grid>
          </Box>
          <PresenterData />
          <Divider />
          <Sharer url={`/speakers/${id}`} />       

        </Box>
      }
      leftCentered={false}
      right={
        <Box>
          <Box mt={7} maxWidth={300}>
            
            <PresenterSchedule />
            <GetTicketLink />

          </Box>
        </Box>
      }
    />

    </Wrapper>
    
    </PresentationContext>}
  </SingleRecord>)

}


/**
 * 
 
company_id: 1875
event_id: 1875
id: 136992
lang: "pl"
profile: {cname2: 'Shopee', avatar: 'https://i.ibb.co/0rnXvMY/Screenshot-2022-02-08-at-12-12-00.png', presentation_title: 'Nowa alternatywa na rynku e-commerce, czyli jak Shopee.pl pomaga rozwijać się polskim sprzedawcom.', bio: 'Radosław Dobrołęcki pracuje w Shopee.pl – jednej z…iu oraz Executive MBA Akademi Leona Koźmińskiego.', position: 'Head of Seller Acquisition', …}
roles: (2) ['contestant', 'presenter']
votes: 135

 */


export default WidgetPresenterNew
