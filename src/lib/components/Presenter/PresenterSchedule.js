


import {usePresentation} from '../Schedule/context'
import Button from '../MyButton'
import isEmpty from 'lodash/isEmpty'
import { useTranslate } from '../../i18n';
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { grey } from '@material-ui/core/colors';
import {useRouter} from 'next/router'
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles(theme => ({

    root: {
        maxWidth: 300,
        padding: 20,
        backgroundColor: grey[300],
        marginBottom: 20
      }
      
}))

const PresenterSchedule = () => {

    const {time, venue} = usePresentation()
    const [translate] = useTranslate()
    const classes = useStyles()
    const router = useRouter()


    if(isEmpty(time) || isEmpty(venue)){
        return null
    }

    return (

        <Paper className={classes.root}>
            <Grid container alignItems='center' justifyContent='center' spacing={3} direction="column">
                <Grid item>
                    <Typography variant="h4">{venue} {time}</Typography>
                </Grid>
                <Grid item>
                <Button onClick={()=>router.push("/schedule")} startIcon={<MenuBookIcon />} label="presenters.schedule" variant="text" />
                </Grid>
            </Grid>
        </Paper>

    )
   
}



export default PresenterSchedule