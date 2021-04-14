import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Wrapper from '../components/Wrapper'
import {useSettings} from '../helpers'
import {useTranslate} from '../i18n'


import PhoneIcon from '@material-ui/icons/Phone';



const defaultProps = {
  wrapperProps: {
    label: "tabs.title"
  },
  items: [{
      label: "main"
  }],
  orientation: "horizontal",
  variant: "fullWidth"
}


function TabPanel({setting, ...props}) {

  const [translate] = useTranslate();
  const settings = useSettings(setting, {});
  const {items} = Object.assign({}, defaultProps, settings, props);

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function IconLabelTabs({setting, ...props}) {

  const [translate] = useTranslate();
  const settings = useSettings(setting, {});
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const {items, orientation, variant, wrapperProps} = Object.assign({}, defaultProps, settings, props);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <Wrapper {...wrapperProps}>
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={orientation==="horizontal"? variant: undefined}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
          centered
          orientation={orientation}
        >
          {items.map(item => (<Tab key={`t_${item.label}`} icon={React.createElement(item.icon || PhoneIcon, {})} label={translate(item.label)} />) )}
        </Tabs>
        {items.map((item, idx) => (<TabPanel key={`p_${item.label}`} value={value} index={idx}>{item.content}</TabPanel>))}
      </div>
    </Wrapper>
  );
}