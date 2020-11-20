 
import Button from '@material-ui/core/Button';
import { useTranslate } from '../i18n'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import { useUserData } from '../helpers'


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


const UpdateProfileLink = ({ href, label, variant, color, size }) => {

    const currentUser = useUserData();
    const classes = useStyles();
    const router = useRouter();
    const [translate, locale] = useTranslate();

    if(currentUser){
        return (<Button variant={variant} color={color} size={size} onClick={_ => router.push(href)}>
            { translate(label) }
            </Button>)
    }

    return null

}

UpdateProfileLink.defaultProps = {
  variant: "outlined",
  color: "secondary",
  size: "medium",
  href: "/account",
  label: 'common.edit_profile'
};

 
export default UpdateProfileLink
