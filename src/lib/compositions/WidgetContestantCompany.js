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
    Presentation,
    Presenter as PresenterName,
    Sharer,
    MyAvatar as Avatar,
   // Speaker
   KeywordSelect
  } from '../components';


import DatasourceContestantCompanies from '../datasources/ContestantCompanies'

import { 
    getCallForPapersOgImage, 
    getSpeakerName,
    getSpeakerAvatar,
    getSpeakerLogotype
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
            
            return (

            <React.Fragment>

            <Head
            image={getCallForPapersOgImage(record)}
            url={asPath}
            titleLabel={[
                'awards.contest.opengraph.title', 
                { 
                    presentation_title : _get(record, 'presentation_title') 
                }
            ]}
            descriptionLabel={[
            'awards.contest.opengraph.description',
            {
                name: getSpeakerName(record),
                cname2: _get(record, 'cname2')
            }
            ]}
            />

            <Wrapper first={false} {...rest}>
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
            <Avatar src={getSpeakerAvatar(record)} minimal={false} grayscale={false} />

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
            
            <div className={classes.voteButtonContainer}>
            <div>
               {vote}
            </div>
            <div className={classes.voteInfo}>

                <React.Fragment>

                <Typography template="presenter1">
                Votes: {record.votes}
                </Typography>

                <Typography template="benefitsText" label="awards.voting.rules.description" />
              
                </React.Fragment>

            </div>
            </div>

            {status}

            { <Presentation
            title={record.presentation_title}
            description={record.presentation_description}
            />
            }
            
            <KeywordSelect  href="/vote" as="/vote" keywords={[].concat( _get(record, 'awards_category', "") )} />
            
            <Divider />
            
            <Sharer url={asPath} />

            <Divider />

            <PresenterName data={record} />

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

