
import React from 'react'
import compose from 'recompose/compose';
//import classNames from 'classnames'
import Button from '@material-ui/core/Button';
import {translate} from '../i18n'
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'next/router'

// const ButtonLink = forwardRef( ({ className, href, as, children, prefetch }, ref)=> (
//   <Link href={href} as={as} ref={ref}>
//     <a className={className}>
//       {children}
//     </a>
//   </Link>
// ))


const styles = theme => ({
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
});


const AppBarLink = ({ as, href, label, classes, locale, translate, router, variant, color, size }) => (

  <Button variant={variant} color={color} size={size} onClick={_ => router.push(href, as)}>
  { translate(label) }
  </Button>
)



AppBarLink.defaultProps = {
  variant: "outlined",
  color: "primary",
  size: "medium",
  href: "/",
  as: "/",
  label: 'AppBarLink label'
};

const enhance = compose(
  withStyles(styles),
  translate,
  withRouter
);

export default enhance(AppBarLink);
