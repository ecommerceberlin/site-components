
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Tags from '../Tags'
import {getCompanyProfileInfo, getCompanyName, resizeCloudinaryImage} from '../../helpers'
import { useTranslate } from '../../i18n'
import Markdown from '../Markdown'

const useStyles = makeStyles(theme => ({
  htmlContainer: {
    minHeight : 75,
    maxHeight : 200,
    overflow : 'scroll',
    fontWeight : 400,
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
    justifyContent : 'center',
    flexDirection : 'column',
    marginLeft : 20
  },

  companyKeywords : {}

}))


const BoothDialogTakenSoldContent = ({setting="", company={}}) => {

    const classes = useStyles()
    const [translate] = useTranslate()

    return (
    <React.Fragment>   
    <Typography variant="h5">{translate("event.sales.booths.owner")}</Typography>
    <div className={classes.logoAndCnameHolder}>
    <div className={classes.logotype} style={{
    backgroundImage : `url(${ resizeCloudinaryImage(_get(company, "profile.logotype_cdn"), 300, 150) })`
    }} />
    <Typography  className={classes.cname} variant="headline" component="h2">{getCompanyName(company)}</Typography> 
    </div>
    <Tags tags={_get(company, "profile.keywords")} centered={false} />
    <Typography component="div">
    <div
      className={classes.htmlContainer}
      dangerouslySetInnerHTML={{
    __html: _get(company, 'profile.about')
    }}/>
    </Typography>
    </React.Fragment>)

}


export default BoothDialogTakenSoldContent