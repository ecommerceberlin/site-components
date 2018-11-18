import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyTypography from './MyTypography';
import classNames from 'classnames';

const styles = () => ({
  root: {
    display: 'block',
    minHeight: 350,
    backgroundColor: '#fff',

    paddingBottom: '2rem',
    paddingTop: '2rem',

    position: 'relative',
    overflow: 'hidden'
    //    textAlign: 'center'
  },

  dense: {
    paddingBottom: '1rem',
    paddingTop: '1rem'
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

  container: {
    width: '90%',
    maxWidth: 1600,
    margin: '0 auto',
    marginTop: '2rem',
    zIndex: 123,
    position: 'relative'
  },

  related: {
    display: 'flex',
    // alignItems : 'flex-end',
    justifyContent: 'center',
    marginTop: '2rem'
  }
});

const Wrapper = ({
  translate,
  classes,

  label,
  title,
  typography,

  secondaryLabel,
  secondaryTitle,
  secondaryTypography,

  children,

  color,
  links,
  dense,
  first
}) => (
  <section
    className={classNames(classes.root, {
      [classes.dense]: dense,
      [classes.first]: first
    })}
    style={{ backgroundColor: color }}
  >
    <div className={classes.overlay} />

    <div className={classes.container}>
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

      {links && <div className={classes.related}>{links}</div>}
    </div>
  </section>
);

Wrapper.defaultProps = {
  label: null,
  title: null,
  secondaryLabel: null,
  secondaryTitle: null,
  secondaryTypography: 'SUBH2CH',
  color: '#ffffff',
  links: [],
  dense: false,
  typography: 'H2C'
};

export default withStyles(styles)(Wrapper);
