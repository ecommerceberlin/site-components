import React from 'react';
import Button from '../MyButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ButtonBase from '@material-ui/core/ButtonBase';

import {useCompany} from './context'
import LinkIcon from '@material-ui/icons/Link';
import { isEmpty, map } from 'lodash';
import { useTranslate } from '../../i18n';
import { capitalizeFirstLetter } from '../../helpers';


import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Website from '@material-ui/icons/Web';
import Linkedin from '@material-ui/icons/LinkedIn';


const icons = {
    facebook: Facebook,
    twitter: Twitter,
    website: Website,
    linkedin: Linkedin
}


const CompanyContactItem = React.forwardRef((props, ref) => {

    const {name, value, handleClose} = props
    const [translate] = useTranslate()

    if(!value || !value.includes("http")){
        return null
    }

    return (<MenuItem ref={ref} onClick={handleClose}>

        <ButtonBase href={value} target="_blank">

        <ListItemIcon>
       
        {React.createElement(name in icons? icons[name]: Website, {fontSize: "small"})}
        </ListItemIcon>
        <ListItemText primary={translate(`companies.profile.${name}`)} />
        </ButtonBase>

        </MenuItem>)

})




   



const CompanyContact = () => {
  
  const {contacts} = useCompany()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = React.useCallback(() => setAnchorEl(null), [setAnchorEl]);

  if(isEmpty(contacts)){
      return null
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" label="companies.profile.contact" onClick={handleClick} startIcon={<LinkIcon />} variant="outlined" />
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {map(contacts, (value, name) => <CompanyContactItem handleClose={handleClose} key={name} name={name} value={value} /> )}

      </Menu>
    </div>
  );
}


export default CompanyContact