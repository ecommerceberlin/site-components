import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyTypography from './MyTypography';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({

  root: {
    display: 'block',
    minHeight: 350,

    paddingBottom: '2rem',
    paddingTop: '2rem',

    position: 'relative',
    overflow: 'hidden'
    //    textAlign: 'center'
  },

  dense: {
    paddingBottom: '1rem',
    paddingTop: '1rem',

    [theme.breakpoints.down('md')]: {
      paddingBottom: '0',
      paddingTop: '0',
    }
  },

  first: {
    marginTop: 40
  },

  overlay: {
    //background: '#25201f',
    opacity: '.8',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  containerBase: {
    width: '90%',
    maxWidth: 1600,
    margin: '0 auto',
    zIndex: 123,
    position: 'relative'
  },

  container: {
    marginTop: '2rem',
  },


  related: {
    display: 'flex',
    // alignItems : 'flex-end',
    justifyContent: 'center',
    marginTop: '2rem'
  }

}))


const Wrapper = ({id=null, label, classes, title, typography, secondaryLabel, secondaryTitle, secondaryTypography, children, color, links, dense, first, style
}) => {

  const _classes = useStyles();

  return (
    <section
      id={id}
      className={classNames(_classes.root, {
        [_classes.dense]: dense,
        [_classes.first]: first,
        [classes.root] : classes && "root" in classes
      })}
      style={{ backgroundColor: color, ...style }}
    >
      <div className={_classes.overlay} />
  
      <div className={classNames(_classes.containerBase, {
        [_classes.container]: !dense  
      })}>
        {label && <MyTypography label={label} template={typography} />}
        {title && <MyTypography template={typography}>{title}</MyTypography>}
  
        {secondaryLabel && (
          <MyTypography
            label={secondaryLabel}
            template={secondaryTypography}
            highlight={true}
          />
        )}
        {secondaryTitle && (
          <MyTypography template={secondaryTypography} highlight={true}>
            {secondaryTitle}
          </MyTypography>
        )}
  
        {children}
  
        {links && <div className={_classes.related}>{links}</div>}
      </div>
    </section>
  );

}

Wrapper.defaultProps = {
  label: null,
  title: null,
  secondaryLabel: null,
  secondaryTitle: null,
  secondaryTypography: 'SUBH2CH',
  color: '#ffffff',
  links: [],
  dense: false,
  typography: 'H2CB',
  style: {},
  classes: {}
};

export default Wrapper;
