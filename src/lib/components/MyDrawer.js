import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { translate } from '../i18n';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//import Divider from '@material-ui/core/Divider';

import { drawerHide } from './redux/actions';
import MenuItemLink from './MenuItemLink';

const styles = {
  list: {
    width: '100%',
    maxWidth: 360
  }
};

const Section = translate(({ label, translate }) => (
  <ListSubheader component="div">
    {translate(`common.menu.${label}.title`)}
  </ListSubheader>
));

const MyDrawer = ({ items, classes, drawer, drawerHide }) => (
  <Drawer open={drawer} onClose={drawerHide}>
    <div tabIndex={0} role="button" onClick={drawerHide} onKeyDown={drawerHide}>
      <div className={classes.list}>
        {items.map((section, i) => (
          <List key={i} subheader={<Section label={section.name} />}>
            {section.items.map((item, j) => (
              <MenuItemLink
                key={j}
                to={item.to}
                baseLabel={section.name}
                label={item.name}
                icon={item.icon}
              />
            ))}
          </List>
        ))}
      </div>
    </div>
  </Drawer>
);

MyDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

const enhance = compose(
  connect(
    state => ({ drawer: state.drawer }),
    { drawerHide }
  ),
  withStyles(styles)
);

export default enhance(MyDrawer);
