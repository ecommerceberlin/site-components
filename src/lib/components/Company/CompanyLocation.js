


import {useCompany} from './context'
import Button from '../MyButton'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useDispatch } from 'react-redux';
import { dialogShow } from '../redux/actions';
import isEmpty from 'lodash/isEmpty'
import {Booth, Bookingmap} from '../Bookingmap'
import { useTranslate } from '../../i18n';
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({

    root: {
        maxWidth: 300,
        padding: 20,
        backgroundColor: grey[300],
        marginBottom: 20
      }
      
}))



const CompanyLocation = () => {

    const {name, boothIds, boothNames, mapSetting} = useCompany()
    const [translate] = useTranslate()
    const dispatch = useDispatch();
    const classes = useStyles()


    const translationProps = {
        cname2: name, 
        loc: boothNames.join(', '),
        smart_count: boothNames.length
    }

    const handleClick = () => dispatch(dialogShow({
        title: translate("exhibitors.booth_location_full", translationProps),
        content:  <Bookingmap setting={mapSetting} booth={Booth} marked={boothIds} />,
        width: "xl"
    }))

    if(isEmpty(boothIds)){
        return null
    }

    return (

        <Paper className={classes.root}>
            <Grid container alignItems='center' justifyContent='center' spacing={3} direction="column">
                <Grid item>
                    <Typography variant="h4">{boothNames}</Typography>
                </Grid>
                <Grid item>
                <Button onClick={handleClick} startIcon={<LocationOnIcon />} label="exhibitors.map.exhibitor_location" variant="text" />
                </Grid>
            </Grid>
        </Paper>

    )
   
}



export default CompanyLocation