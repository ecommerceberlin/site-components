
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from './MyTypography'


const styles = theme => ({

  container : {
    display: 'flex',
    flexDirection : 'row',
  //  alignItems : 'center'
    marginBottom : 30,
    [theme.breakpoints.up('md')]: {
      marginBottom : 60,
    },
  },

  iconContainer : {

  //  width: 150
  },

  icon : {
    marginTop: -12,
    width : 50,
    height : 50,

    [theme.breakpoints.up('md')]: {
      width : 60,
      height : 60,
    },

    color : 'red'
  },

  texts : {
    marginLeft : 30
  }

})

const GridBenefitsItem = ({classes, ...other}) => {

    const Icon = other.icon;

    return (

      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>

        <div className={classes.container}>

          <div className={classes.iconContainer}>
            <Icon className={classes.icon} />
          </div>

          <div className={classes.texts}>
            <Typography template="benefitsTitle" label={`${other.label}.title`} />
            <Typography template="benefitsText" label={`${other.label}.description`} />
          </div>

        </div>

      </Grid>

    )

}


GridBenefitsItem.defaultProps = {
  title : "",
  text : ""
}

export default withStyles(styles)(GridBenefitsItem)
