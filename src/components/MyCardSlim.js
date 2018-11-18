import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: 'transparent'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },

  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  avatar : {
    width : 120,
    height : 120
  }
});

function MyCardSlim(props) {
  const { classes, link, title, text, imageSrc, primary } = props;

  return (
   
      <Card
        elevation={primary ? 2 : 0}
        raised={primary}
        className={classes.card}
      >

        <CardHeader
          avatar={
            <Avatar
            //  alt={opinion.person}
              src={imageSrc}
              className={classes.avatar}
            />
          }
        ></CardHeader>

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">{title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {text}
            </Typography>

        {link && <CardActions className={classes.controls}>{link}</CardActions>}

          </CardContent>
          
        </div>
      </Card>
    
  );
}

MyCardSlim.defaultProps = {
  link: null,
  title: 'title',
  text: '',
  primary: false,
  imageSrc: ''
};

MyCardSlim.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCardSlim);
