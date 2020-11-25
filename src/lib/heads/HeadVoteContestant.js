import { MyHead } from '../next';
import _get from 'lodash/get';
import SingleRecord from '../datasources/SingleRecord'
// import Settings from '../datasources/Settings'

import { 
    getContestantOgImage
 } from '../helpers';
  
 const HeadVoteContestant = ({id, path, children}) => (

    <SingleRecord endpoint="contestant_companies" id={id}>{

        ({record}) => {

           const profile = _get(record, "profile", {})

           const image = getContestantOgImage(profile, "ega2020_opengraph_template")
           const project_name = _get(profile, 'project_name') ;
           const cname2 = _get(profile, 'cname2') ;

            return (<MyHead
                image={image}
                url={`${path}/${id}`}
                titleLabel={['awards.contest.opengraph.title', {project_name, cname2}]}
            descriptionLabel={['awards.contest.opengraph.description', {project_name, cname2}]}
            >{children}</MyHead>)

        }
    
        }</SingleRecord>

)

HeadVoteContestant.defaultProps = {
    path : "/vote"
}

export default HeadVoteContestant;