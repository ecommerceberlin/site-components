import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/amber';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { translate } from '../i18n';
import { faqToggle } from './redux';

const styles = theme => ({
  default: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: theme.typography.fontFamily
  },
  expanded: {
    backgroundColor: color[100]
  },
  expandedTitle: {
    fontWeight: 900
  },
  content: {}
});

const FaqItem = ({
  faqToggle,
  selected,
  baseLabel,
  label,
  important,
  buttons,
  classes,
  translate
}) => (
  <ExpansionPanel
    classes={{ expanded: classes.expanded }}
    onChange={(event, state) => faqToggle([label], state)}
    expanded={selected.indexOf(label) > -1}
  >
    <ExpansionPanelSummary
      classes={{
        root: classes.default,
        expanded: classes.expandedTitle
      }}
      expandIcon={<ExpandMoreIcon />}
    >
      {translate(`${baseLabel}.${label}.q`)}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails
      classes={{ root: classNames(classes.default, classes.content) }}
    >
      {translate(`${baseLabel}.${label}.a`)}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

FaqItem.defaultProps = {
  label: '',
  important: false,
  buttons: []
};

FaqItem.propTypes = {
  classes: PropTypes.object.isRequired,
  buttons: PropTypes.array
};

const enhance = compose(
  translate,
  connect(
    state => ({ selected: state.visuals.faqs }),
    { faqToggle }
  ),
  withStyles(styles)
);

export default enhance(FaqItem);
