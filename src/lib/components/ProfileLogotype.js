import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { 
    getSpeakerLogotype
 } from '../helpers';

const ProfileLogotype = ({data}) => {

    if(!"logotype" in data){
        return <CircularProgress />
    }

    return (<img
        src={getSpeakerLogotype(data)}
        alt=""
        style={{ maxWidth: 300, maxHeight: 200, marginTop: 30 }}
        />)

}

ProfileLogotype.defaultProps = {
    data: {

    }
}

export default ProfileLogotype