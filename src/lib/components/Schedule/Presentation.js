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
    fontWeight: 500,
    color: theme.palette.grey[600],
    fontSize: "85%",
    backgroundColor: theme.palette.grey[200],
    padding: "2px 6px",
    borderRadius: 3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginRight: theme.spacing(1)
  },

  title: {
    fontWeight: 600,
    
    fontSize: theme.typography.pxToRem(16),

    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.pxToRem(14),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12),
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
