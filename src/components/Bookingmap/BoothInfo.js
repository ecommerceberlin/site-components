import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import _get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import BoothInfoContainer from './BoothInfoContainer'
import Legend from './Legend'
import Tags from '../Tags'
import MyTypography from '../MyTypography'
import {getCompanyLogotype, getCompanyName} from '../../helpers'

//import { resourceFetchRequest as resourceFetchRequestAction } from './redux/actions';
//import Button from '@material-ui/core/Button';
//import {translate} from '../i18n'
//import find from 'lodash/find';

const styles = theme => ({
  htmlContainer: {
    minHeight : 75,
    maxHeight : 200,
    overflow : 'scroll',
    fontWeight : 400,
  },

  media: {
   height : 100,
//   paddingTop: '56.25%',
   backgroundSize : 'contain',
   padding: 10
  },

  logoAndCnameHolder : {
    marginTop : 20,
    display : 'flex',
    flexWrap : 'wrap',
  },

  logotype : {
    minWidth : 300,
    height : 100,
    backgroundRepeat : 'no-repeat',
    backgroundSize : 'contain',
    backgroundPosition : 'center'
  },

  cname : {
    display : 'flex',
   // alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'column',
    marginLeft : 20
  },

  companyKeywords : {

  }

});

const BoothInfo = ({ formdata, classes, ...rest}) => {

    if(!formdata || !"company" in formdata){
      return (
        <BoothInfoContainer 
        header={
          <Legend allowedGroupIds={ [264,265,266,267] } />
        } 
        {...rest} />
      )
    }

    return (

      <BoothInfoContainer 
      header={
        <Legend allowedGroupIds={ [264,265,266,267] } />
      }
      content={
        <React.Fragment>   

            <MyTypography label="event.sales.booths.owner" template="benefitsTitle" />

            <div className={classes.logoAndCnameHolder}>
              <div className={classes.logotype} style={{
                backgroundImage : `url(${getCompanyLogotype(formdata.company)})`
              }} />
              <div className={classes.cname}>
                <Typography  variant="headline" component="h2">
                {getCompanyName(formdata.company)}
              </Typography>
               
              </div>
            </div>
            
            <div className={classes.companyKeywords}>
                  <Tags tags={_get(formdata, "company.profile.keywords")} />
            </div>

            <Typography component="div">
              <div
              className={classes.htmlContainer}
              dangerouslySetInnerHTML={{
              __html: _get(formdata, 'company.profile.about')
              }}
              />
            </Typography>
        </React.Fragment>
      }
      {...rest} />
    );
}


export default withStyles(styles)(BoothInfo);
