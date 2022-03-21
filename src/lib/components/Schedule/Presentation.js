import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { usePresentation } from './context';

const useStyles =  makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 25,

    [theme.breakpoints.down("md")]: {
      marginTop: 10,
      marginBottom: 10,
      marginRight: 5,
    }
  },

  label: {
    fontWeight: 200,
    color: theme.palette.error.main,
    fontSize: "90%"
  },

  title: {
    fontWeight: 600,
    
    fontSize: theme.typography.pxToRem(17),

    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.pxToRem(15),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(13),
    }
  },

  description: {
    [theme.breakpoints.down('md')]: {
    
    },

  }
}))


const Presentation = () => {

  const classes = useStyles();
  const {title, description, showDescription, venue, time} = usePresentation()

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}><span className={classes.label}>{venue}{` `}{time}</span>{` `}{title}</Typography>
      {showDescription ? <div className={classes.description}>
        <Typography variant="body2">{description}</Typography>
      </div>: null}
    </div>
  );
};


export default Presentation
