import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTranslate } from '../i18n';
import { isString } from 'lodash';

const useStyles = makeStyles((theme) => ({

    button: {
        display: 'block',
        maxWidth: 300,
        marginBottom: 20
    },

    paper: {
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: grey[300],
    },

    icon: {
        fontSize: 30,
        margin: 5
    }

}));

export default function GrayBigButton({label, children, icon, actionLabel, href, onClick}) {
  const classes = useStyles();
  const [translate] = useTranslate()

return (
   
    <ButtonBase
    className={classes.button} 
    focusRipple
    focusVisibleClassName={classes.focusVisible}
    onClick={onClick}
    href={href}
    component="div"
    >
    <Paper className={classes.paper}>
        <Grid container alignItems='center' justifyContent='center' spacing={3} direction="column">
            <Grid item>
                <Typography variant="h4"> {children && isString(children)? children: translate(label)}</Typography>
            </Grid>
            <Grid item>
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>{React.cloneElement(icon, {className: classes.icon})} </Grid>
                    <Grid item>
                        <Typography variant="button">{actionLabel? translate(actionLabel): ""}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    </ButtonBase>
   
);
}
