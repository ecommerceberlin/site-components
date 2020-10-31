import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/amber';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { translate } from '../i18n';
import { faqToggle } from './redux';

import { createSelector } from 'reselect';


const faqItemSelector = createSelector(
  state => state.visuals.faqs,
  (state, props) => props.label,
  (items, item) => items.includes(item)
)



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
  <Accordion
    classes={{ expanded: classes.expanded }}
    onChange={(event, state) => faqToggle([label], state)}
    expanded={selected}
  >
    <AccordionSummary
      classes={{
        root: classes.default,
        expanded: classes.expandedTitle
      }}
      expandIcon={<ExpandMoreIcon />}
    >
      {translate(`${baseLabel}.${label}.q`)}
    </AccordionSummary>
    <AccordionDetails
      classes={{ root: classNames(classes.default, classes.content) }}
    >
      {translate(`${baseLabel}.${label}.a`)}
    </AccordionDetails>
  </Accordion>
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
    (state, props) => ({
      selected: faqItemSelector(state, props)
    }),
    { faqToggle }
  ),
  withStyles(styles)
);

export default enhance(FaqItem);
