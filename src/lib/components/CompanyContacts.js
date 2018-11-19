import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import CompanyContactItem from './CompanyContactItem';

const styles = theme => ({
  listContainer: {},
  contactList: {
    display: 'flex',
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },

  contactListItem: {}
});

function CompanyContacts({ profile, classes }) {

  return (
    <div className={classes.listContainer}>
      <List component="ul" className={classes.contactList}>
        {profile.map(({name, value}) => (
          <li key={name} className={classes.contactListItem}>
            <CompanyContactItem
              baseLabel="companies.profile"
              name={name}
              link={value}
            />
          </li>
        ))}
      </List>
    </div>
  );
}


export default withStyles(styles)(CompanyContacts);
