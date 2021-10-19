import React from 'react';
import ProfileErrors from './ProfileErrors'
import Purchases from './Purchases'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {useDialog} from '../helpers'
import Bookingmap from '../components/Bookingmap/Bookingmap'
import Wrapper from '../components/Wrapper'
import map from 'lodash/map'

const defaultProps = {

  show_mobilepass: false,
  show_partyticket: false,
  mapSetting: "bookingmap",
  roles: [],
  alert: null,
  details: false
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
      show_partyticket,
      mapSetting,
      roles,
      alert,
      details
    } = Object.assign({}, defaultProps, props);

    const { name, password, keywords, lang } = company;
    const { booth, fname, lname, phone, cname } = profile;
    const dialog = useDialog()

    const handleDialog = (e) => {
      e.preventDefault()
      dialog({
        title: "location",
        content: <Wrapper><Bookingmap setting={mapSetting} marked={selectedBoothIds()} /></Wrapper>,
        width: "xl"
      })
    }

    const selectedBoothIds = () => map(purchases, 'formdata.id').filter(v => v && v.length);
    const selectedBoothNames = () => map(purchases, 'formdata.ti').filter(v => v && v.length).join(", ");
   

    return (
      <Box mt={2}>

        <Grid container spacing={2} alignItems="flex-end">
        <Grid item>
        <Typography variant="h4">{name}</Typography>
        </Grid>
        <Grid item>
        <Typography variant="h6"><a href="#" onClick={handleDialog}>{selectedBoothNames()}</a></Typography>
        </Grid>
        <Grid item>
        <Typography variant="subtitle1">{cname}, {fname} {lname} {phone}</Typography>
        </Grid>
        </Grid>

        {details ? <>{alert}<Grid container spacing={2}>
        <Grid item><strong>Reps: {reps}</strong></Grid>
        {show_mobilepass &&  <Grid item><strong>{password}</strong></Grid>}
        {show_partyticket && <strong>Party: {party}</strong>}
        <Grid item>Meetups: {meetups}</Grid>
        </Grid>
    
        <ProfileErrors errors={errors} />
        <Purchases purchases={purchases} roles={roles} />
        </>: null}

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