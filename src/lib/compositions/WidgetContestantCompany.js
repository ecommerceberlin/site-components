import { MyHead as Head } from '../next';
import Divider from '@material-ui/core/Divider';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { resourceFetchRequest } from '../components/redux'

import {
    MyTypography as Typography,
    TwoColsLayout as Section,
    Wrapper,
  
    Sharer,
    MyAvatar as Avatar,
   // Speaker
   KeywordSelect
  } from '../components';

//import CompanyLogotype from '../components/CompanyLogotype'

import DatasourceContestantCompanies from '../datasources/ContestantCompanies'

import { 
    getCompanyAltOgImage, 
    getSpeakerLogotype,
    getCompanyProfileInfo
 } from '../helpers';

const styles = theme => ({

    voteButtonContainer : {
        display : 'flex',
        [theme.breakpoints.down('sm')]: {
           flexDirection : 'column'
        }
    },
    voteInfo : {
        marginLeft : 10,
        marginTop: 5
    }

})


const WidgetContestantCompany = ({id, vote, status, asPath, classes, ...rest}) => (

    <DatasourceContestantCompanies id={id}>{

        ({filtered, all, record}) => {
            

            const difference = _get(record, 'difference', "");


            return (

            <React.Fragment>


            <Head
            image={getCompanyAltOgImage(record, asPath)}
            url={asPath}
            titleLabel={[
            'awards.contest.opengraph.title',
            { name: getCompanyProfileInfo(record, 'name') }
            ]}
            descriptionLabel={[
            'awards.contest.opengraph.description',
            {
            // name: getSpeakerName(record),
            // cname2: _get(record, 'cname2')
            }
            ]}
            />


            <Wrapper first={false} {...rest}>


            <div className={classes.voteButtonContainer}>
            <div>
               {vote}
            </div>
            <div className={classes.voteInfo}>

                <Typography template="benefitsText" label="awards.voting.rules.description" />

            </div>
            </div>

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

          
            <img
            src={getSpeakerLogotype(record)}
            alt=""
            style={{ maxWidth: 300, maxHeight: 200, marginTop: 30 }}
            />
            </div>
            }
            leftCentered={true}
            right={
            <div>
            
          

                <React.Fragment>

                {/* <Typography template="presenter1">
                Votes: {record.votes}
                </Typography> */}

              
                <Typography template="benefitsTitle">
                {_get(record, 'product_name', "")}
                </Typography>

                <Typography template="benefitsText">
                {_get(record, 'project_description', "")}
                </Typography>

                
                <Typography template="benefitsText">
                {difference}
                </Typography>

                 
                </React.Fragment>

            {status}

          
            <KeywordSelect  href="/vote" as="/vote" keywords={[].concat( _get(record, 'awards_category', "") )} />
            
            <Divider />
            
            {/* <Sharer url={asPath} /> */}

            <Divider />

           

            </div>
            }
            />
            </Wrapper>

            </React.Fragment>
        )
    }

    }</DatasourceContestantCompanies>

   
)




WidgetContestantCompany.propTypes = {
    asPath : PropTypes.string.isRequired
}

WidgetContestantCompany.defaultProps = {
    vote : null,
    status : null,
    label : "awards.contestants.list.title"
}

export default withStyles(styles)(WidgetContestantCompany)

