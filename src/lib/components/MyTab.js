import React from 'react';

import Tab from '@material-ui/core/Tab';

import { translate } from '../i18n';

const MyTab = ({ translate, label, ...other }) => (
  <Tab label={translate(label)} {...other} />
);

export default translate(MyTab)
