import React from 'react';
import Text from '../components/MyTypography'
import ProfileErrors from './ProfileErrors'
import Purchases from './Purchases'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const defaultProps = {

  show_mobilepass: false,
  show_partyticket: false,
}

const Exhibitor = ({setting, ...props}) => {
    const {
      account,
      company,
      profile,
      errors,
      purchases,
      reps,
      party,
      meetups,
      show_mobilepass,
      show_partyticket
    } = Object.assign({}, defaultProps, props);

    const { name, password, keywords, lang } = company;
    const { booth, fname, lname, phone } = profile;
  
    return (
      <Box mt={2}>

        <Grid container spacing={2} alignItems="flex-end">
        <Grid item>
        <Typography variant="h4">{name} ({booth})</Typography>
        </Grid>
        <Grid item>
        <Typography variant="subtitle1">{fname} {lname} {phone}</Typography>
        </Grid>
        </Grid>

        <Grid container spacing={2}>
        <Grid item><strong>Reps: {reps}</strong></Grid>
        {show_mobilepass &&  <Grid item><strong>{password}</strong></Grid>}
        {show_partyticket && <strong>Party: {party}</strong>}
        <Grid item>Meetups: {meetups}</Grid>
        </Grid>
    
        <ProfileErrors errors={errors} />
        <Purchases purchases={purchases} />
      </Box>
    );
  };
  

export default Exhibitor;


/***
 * 
 * 
 * @{account}; {lang}
 * 
       
        {show_partyticket && <Text template={party > 2 ? 'benefitsTextError' : 'benefitsText'}></Text>}
       


 */