
import React from 'react'
import { MyHead } from '../next';
import _get from 'lodash/get';
import SingleRecord from '../datasources/SingleRecord'
import { getPresenterOgImage, getSpeakerName, useSettings } from '../helpers';

const defaultProps = {
    path: "/speakers"
}
  
const HeadVote = ({setting="speakers", id, children, ...props}) => {

    const settings = useSettings(setting, {})
    const {path, og_template=""} = Object.assign({}, defaultProps, settings, props)


    return (

        <SingleRecord endpoint="presenters" id={id}>{({profile, ...record}) => {

            const translationData =  {
                name: getSpeakerName(profile),
                presenter: getSpeakerName(profile),
                cname2: _get(profile, 'cname2'),
                position: _get(profile, 'position'),
                presentation_title: _get(profile, 'presentation_title'),
                presentation_time: _get(profile, 'presentation_time'),
                presentation_venue: _get(profile, 'presentation_venue'),
            }

            return (<MyHead
                    image={getPresenterOgImage(profile, og_template)}
                    url={`${path}/${record.id}`}
                    titleLabel={['presenters.opengraph.title', translationData]}
                    descriptionLabel={['presenters.opengraph.description', translationData]}>{children}</MyHead>)
    
            }
        
            }</SingleRecord>
    
    )
 }

export default HeadVote;



