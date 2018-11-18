import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNamesHelper from 'classnames';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { translate } from '../i18n';

const styles = theme => ({
  default: {},

  bigListItem: {
    fontWeight : 400,
    lineHeight : '2em'
  },

  h2: {
    fontSize: '3.5rem',
    textTransform: 'uppercase',
    fontWeight: 900,
    marginBottom: '3rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7rem',
      fontWeight: 600,
      marginBottom: '2rem'
    }

    //  textAlign: 'center'
  },

  h2fat: {
    fontSize: '4rem',
    textTransform: 'uppercase',
    fontWeight: 300,
    marginBottom: '3rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7rem',
      fontWeight: 400,
      marginBottom: '2rem'
    }

    //  textAlign: 'center'
  },

  h3: {
    fontSize: '1.8rem',

    fontWeight: 400,
    marginBottom: '2rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      fontWeight: 600,
      marginBottom: '1rem'
    }

    //  textAlign: 'center'
  },

  fatSubtitle: {
    fontSize: '5rem',
    textTransform: 'uppercase',
    fontWeight: 900,
    marginBottom: '3rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      marginBottom: '2rem'
    }

    //  textAlign: 'center'
  },

  centered: {
    textAlign: 'center'
  },

  bold: {
    fontWeight: 500
  },

  section: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },

  mobile: {},

  visitor: {
    width: 'auto',
    minHeight: 10,
    margin: 10,

    '& span': {
      fontWeight: 700
    }
  },

  legend: {
    marginTop: 25,
    color: 'rgba(0, 0, 0, 0.54)'
  },

  hero: {

    fontSize: '3rem',
    color: '#ffffff',
    fontWeight: 900,
    textTransform: 'uppercase',

    [theme.breakpoints.only('md')]: {
      fontSize: '5rem'
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '6rem'
    }
  },


  subhero: {

    fontSize: '1rem',
    color: '#ffffff',
    fontWeight: 300,
  //  textTransform: 'uppercase',

    [theme.breakpoints.up('md')]: {
      fontSize: '2.2rem'
    },

  },


  italic: {
    fontStyle: 'italic'
  },

  info: {
    fontSize: '1.2rem',
    color: '#000000',
    fontWeight: 400,
    marginTop: '-1.5rem',
    marginBottom: '1.5rem'
  },

  highlighted: {
    fontStyle: 'normal',
    borderRadius: '1em 0 1em 0',
    textShadow: '1px 1px 1px #fff',
    backgroundImage: [
      'linear-gradient(-100deg, rgba(255,250,150,0.15), rgba(255,250,150,0.8) 100%, rgba(255,250,150,0.25))'
    ]
  },

  alert: {
    border: '1px solid #666666',
    backgroundColor: '#eaeaea',
    fontSize: '2rem',
    textTransform: 'uppercase',
    fontWeight: 400,
    padding: '1.5rem',
    margin: '3rem 1.5rem'
  },

  presenterBase: {
    color: 'rgba(0, 0, 0, 0.84)',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.4rem'
  },

  presenter1: {
    fontSize: '1.1rem',
    lineHeight: '1.6rem'
  },

  presenterImportant: {
    color: '#f44336',
    fontSize: '1.1rem',
    lineHeight: '1.4rem',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3rem',
      lineHeight: '1.7rem'
    }
  },

  presenterText: {
    marginTop: 10
  },

  presenterFade: {
    position: 'relative',
    height: 200,

    '&:before': {
      content: '',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundImage: ['linear-gradient(transparent 150px, #ffffff)']
    }
  },

  presentationTitle: {},

  presentationDescription: {},

  benefitsTitle : {
    fontWeight: 900,
    fontSize: '1.4em',
    marginBottom: 0,
    color : "black",
    [theme.breakpoints.up('md')]: {
      fontSize: '1.6rem',
    },
    [theme.breakpoints.only('xl')]: {
      fontSize: '1.8rem',
    }
  },

  benefitsText : {
    fontWeight: 400,
    fontSize: '1rem',
    marginTop: '.5em',
    [theme.breakpoints.up('md')]: {
      marginTop: '.7em',
    }
  },

  salesInfoText : {
    fontWeight: 400,
    fontSize: '1.1rem',
    marginBottom: '1em',
    marginTop: '1em',
    [theme.breakpoints.up('md')]: {
      marginTop: '.7em',
    }
  },

  heroOpinion : {

    fontSize: '2rem',
    color : '#ffffff',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },


  },

  heroIcon: {
    width: 100,
    height: 100,
    display: 'inline-block',
    position: 'relative',
    top: 30,
    color: 'rgb(255,255,255,0.6)'
  },

  icon: {
    width: 20,
    height: 20,
    display: 'inline-block',
    position: 'relative',
    top: 30,
    color: 'rgb(0,0,0,0.6)'
  },

});

/*

  VARIANTS

  'display4',
  'display3',
  'display2',
  'display1',
  'headline',
  'title',
  'subheading',
  'body2',
  'body1',
  'caption',
  'button'

*/

const templates = {

  benefitsTitle : {
    variant: 'title',
    component: 'h3',
    classNames: ['benefitsTitle']
  },

  benefitsText: {
    variant: 'body1',
    component: 'p',
    classNames: ['benefitsText']
  },

  salesInfo : {
    variant: 'body1',
    component: 'p',
    classNames: ['salesInfoText']
  },

  default: {
    variant: 'body1',
    component: 'p',
    classNames: ['default']
  },

  H2C: {
    variant: 'headline',
    component: 'h2',
    classNames: ['h2', 'centered']
  },

  subtitle: {
    variant: 'subheading',
    component: 'h3',
    classNames: ['h3']
  },

  H2CB: {
    variant: 'headline',
    component: 'h2',
    classNames: ['h2', 'centered', 'bold']
  },

  LIH3: {
    variant: 'subheading',
    component: 'h3',
    classNames: ['bigListItem']
  },
  visitor: {
    variant: 'body2',
    component: 'p',
    classNames: ['visitor']
  },

  legend: {
    variant: 'subheading',
    component: 'legend',
    classNames: ['legend']
  },


  hero: {
    variant: 'display4',
    component: 'h1',
    classNames: ['hero']
  },

  subhero: {
    variant: 'headline',
    component: 'p',
    classNames: ['subhero']
  },

  heroOpinion : {

    variant : "body1",
    component : "p",
    classNames : ["heroOpinion"]
  },

  SUBH2CH: {
    variant: 'body2',
    component: 'p',
    classNames: ['info', 'centered']
  },

  visitor_invite: {
    variant: 'headline',
    component: 'h2',
    classNames: ['h2fat', 'centered']
  },

  visitor_invite_join: {
    variant: 'headline',
    component: 'h3',
    classNames: ['fatSubtitle', 'centered']
  },

  alert: {
    variant: 'headline',
    component: 'h4',
    classNames: ['alert', 'centered']
  },

  presenter1: {
    variant: 'subheading',
    component: 'h3',
    classNames: ['presenterBase', 'presenter1']
  },

  presenter2: {
    variant: 'body1',
    component: 'p',
    classNames: ['presenterBase', 'presenterImportant']
  },

  presenterText: {
    variant: 'body1',
    component: 'p',
    classNames: ['presenterBase', 'presenterText']
  },

  presenterTextFade: {
    variant: 'body1',
    component: 'p',
    classNames: ['presenterBase', 'presenterText', 'presenterFade']
  }
};

const hl = (highlight, text, className) => {
  if (!highlight) return text;

  return <span className={className}>{text}</span>;
};

const MyTypography = props => {
  const {
    variant,
    component,
    label,
    translate,
    children,
    classNames,
    classes,
    icon,
    iconAfter,
    iconClassName,
    highlight
  } = { ...props, ...templates[props.template] };

  const cn = classNamesHelper(
    classNames.map(
      className => (className in classes ? classes[className] : false)
    ),
    {}
  );

  let _label = label;
  let _label_params = {};

  if (label && Array.isArray(label) && label.length) {
    _label = label[0];
    _label_params = label[1];
  }

  const IconBefore = icon;
  const IconAfter = iconAfter;

  return (
    <Typography variant={variant} component={component} className={cn}>
      
      {icon && <IconBefore style={{marginRight: 10}} className={classes.iconClassName} />}

      {hl(
        highlight,
        label ? translate(_label, _label_params) : children,
        classes.highlighted
      )}

      {iconAfter && <IconAfter className={classes.iconClassName} />}
    </Typography>
  );
};

MyTypography.defaultProps = {
  template: 'default',
  label: null,
  classNames: [],
  icon: null,
  iconAfter: null,
  iconClassName : "icon",
  highlight: false,
  width: 'xs'
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(MyTypography);

//
//
// export const BigListItem = (props) => (<MyTypography variant="subheading" component="h3" color="error" className="bigListItem">{props.children}</MyTypography>)
//
// // enhance(({classes, children, translate, label}) => (<Typography gutterBottom variant="subheading" component="h3" color="error" className={classes.bigListItem}>{children}</Typography>))
//
// //export const H1C = enhance(({classes, children, translate, label}) => (<Typography variant="headline" component="h2" className={classNames(classes.h2, classes.centered)}>{children}</Typography>))
//
// export const H1 = enhance(({classes, children, translate, label}) => (<Typography variant="headline" component="h2" className={classes.h2}>{children}</Typography>))
//
// export const H2 = enhance(({classes, children, translate, label}) => (<Typography variant="headline" component="h2" className={classes.h2}>{children}</Typography>))
//
// export const H3 = enhance(({classes, children, translate, label}) => (<Typography variant="title" component="h3">{children}</Typography>))
//
// export const H4 = enhance(({classes, children, translate, label}) => (<Typography>{children}</Typography>))
//
// export const H5 = enhance(({classes, children, translate, label}) => (<Typography>{children}</Typography>))
//
// export const P = enhance(({classes, children, translate, label}) => (<Typography component="p">{children}</Typography>))
//
// export const P1 = enhance(({classes, children, translate, label}) => (<Typography component="p">{children}</Typography>))
//
// export const P2 = enhance(({classes, children, translate, label}) => (<Typography component="p">{children}</Typography>))
//
// export const Section = enhance(({classes, children, translate, label}) => (<div className={classes.section}>{children}</div>))
