import React from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import get from 'lodash/get';

import {
    TwoColsLayout as Section,
    Wrapper,
    Presentation,
    Presenter as PresenterName,
    Sharer,
    MyAvatar as Avatar,
    ProfileLogotype,
    TextSection
  } from '../components';

import {useSettings} from '../helpers'
import SingleRecord from '../datasources/SingleRecord'


const getSpeakerAvatar = (profile) => get(profile, 'avatar_cdn');

const defaultProps = {
    path: "/speakers",
    wrapperProps: {
        label: null,
        secondaryLabel: null,
        first: true
    },
}

const WidgetPresenter = ({setting="speakers", id, ...props}) => {

    const settings = useSettings(setting, {})
    const {path, wrapperProps} = Object.assign({}, defaultProps, settings, props)

    return (

        <SingleRecord endpoint="presenters" id={id}>{({profile, ...record}) => {
                
                const finalPath = `${path}/${id}`

                return (<React.Fragment>
                <Wrapper {...wrapperProps}>
                <Section
                    leftSize={5}
                    left={
                        <div
                        style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 20
                        }}
                        >
                <Avatar src={getSpeakerAvatar(profile)} minimal={false} />
                <ProfileLogotype data={profile} />
    
                </div>
                }
                leftCentered={true}
                right={
                    <div>
                        <Presentation
                        title={get(profile, "presentation_title")}
                        description={get(profile, "presentation_description")}
                        />
                        <Divider />
                        <PresenterName data={profile} />
                        <Sharer url={finalPath} />
                        <Divider />

                        <Box mt={2}>
                        <TextSection setting={setting} record={profile} name="cname2" />
                        <TextSection setting={setting} record={profile} name="company_description" />
                        <TextSection setting={setting} record={profile} name="product_description" />
                        <TextSection setting={setting} record={profile} name="company_website" />
                        <TextSection setting={setting} record={profile} name="profile_facebook" />
                        <TextSection setting={setting} record={profile} name="profile_linkedin" />
                        <TextSection setting={setting} record={profile} name="profile_twitter" />

                        </Box>

                    </div>
                }
                />
                </Wrapper>
                </React.Fragment>)
        }}</SingleRecord>)
}

export default WidgetPresenter

