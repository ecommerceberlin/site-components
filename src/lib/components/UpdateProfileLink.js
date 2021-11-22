import React from 'react'
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import { useUserData, useSettings, useUserLogout } from '../helpers'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
  selectors : {
    margin : 40,
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));


const buttonDefaultProps = {
  variant : "outlined", 
  color: "secondary",
  size: "medium"
}

const ProfileEditButton = ({href= "/account", label= 'common.edit_profile', buttonProps = buttonDefaultProps}) => {
  const [translate, locale] = useTranslate();
  const router = useRouter();
  return (<Button {...buttonProps} onClick={() => router.push(href)}>{ translate(label) }</Button>)
}

const UserLogoutButton = ({onClick, label= 'common.logout', buttonProps = buttonDefaultProps}) => {
  const [translate, locale] = useTranslate();
  return (<Button {...buttonProps} onClick={onClick}>{ translate(label) }</Button>)
}

const UpdateProfileLink = ({ setting = "appbar.profile" }) => {

    const modes = useSettings(setting);
    const logout = useUserLogout();
    const classes = useStyles();

    if(isEmpty(modes) || !Array.isArray(modes)){
      return null
    }

    const currentUser = useUserData();

    if(!currentUser){
      return null
    }

    return <span>{modes.includes("edit") && <ProfileEditButton />}{modes.includes("logout") && <UserLogoutButton onClick={logout} />}</span>

}
 
export default UpdateProfileLink
