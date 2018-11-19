


import { withStyles } from '@material-ui/core/styles';
import CompanyContacts from './CompanyContacts';


const styles = theme => ({

  htmlContainer: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.typography.pxToRem(23),

    '& p': {},
    '& ul': {
      marginLeft: 0,
      paddingLeft: 20
    },

    '& li:before': {
      content: ' ',
      backgroundSize: 'cover',
      backgroundImage: 'url("/static/check.png")',
      width: theme.typography.pxToRem(15),
      height: theme.typography.pxToRem(15),
      position: 'absolute',
      left: '-2rem'
    },

    '& blockquote': {
      borderLeft: '10px solid #e0e0e0',
      color: 'rgba(0, 0, 0, 0.77)',
      fontStyle: 'italic',
      marginLeft: 10,
      paddingLeft: 10
    }
  },

})

function CompanyTabContainer({ children, data, classes }) {

  if (Array.isArray(data)) {
    return (
      <div className={classes.htmlContainer}>
        <CompanyContacts profile={data} />
      </div>
    );
  }

  return (
    <div
      className={classes.htmlContainer}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}

export default withStyles(styles)(CompanyTabContainer);
