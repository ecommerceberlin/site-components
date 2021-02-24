import React from 'react'
import { MyHead } from '../next';
import _get from 'lodash/get';
import CallForPapers from '../datasources/CallForPapers'
// import Settings from '../datasources/Settings'

import { 
    getCallForPapersOgImage, 
    getSpeakerName
 } from '../helpers';
  
 const HeadVote = ({id, path, children}) => (

    <CallForPapers id={id}>{

        ({record}) => {

           const image = getCallForPapersOgImage(record)
           const presentationTitle = _get(record, 'presentation_title') ;

            return (<MyHead

                image={image}
                url={`${path}/${id}`}
                titleLabel={['callforpapers.opengraph.title', {presentation_title : presentationTitle}]}
            descriptionLabel={[
            'callforpapers.opengraph.description',
            {
                name: getSpeakerName(record),
                cname2: _get(record, 'cname2')
            }
            ]}
            >{children}</MyHead>)

        }
    
        }</CallForPapers>

)

HeadVote.defaultProps = {
    path : "/vote"
}

export default HeadVote;