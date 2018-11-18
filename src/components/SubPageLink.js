import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { generateLinkParams } from '../helpers';

const styles = theme => ({
  textLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },

  tile: {
    height: 170,
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'block',
    textIndent: -5000,
    //  filter : 'grayscale(100%)'

  //  border : '1px solid rgba(0, 0, 0, 0.23)',
  //  borderRadius : 4,

    [theme.breakpoints.down('sm')]: {
      maxHeight: 100,
      backgroundSize: 'contain'
    }


  },


});

const SubPageLink = ({ name, subpage, id, classes, src, highlighted}) => {
  const style = src ? { backgroundImage: `url(${src})` } : {};
  const params = generateLinkParams(name, subpage, id);
  return (
    <Link {...params}>
      <a
        className={classNames({
          [classes.tile]: src,
          [classes.textLink]: !src
        })}
        style={style}
      >
        {name} {highlighted}
      </a>
    </Link>
  );
};

SubPageLink.defaultProps = {
  src: '',
  name: '',
  id: 0,
  highlighted : null
};

SubPageLink.propTypes = {
  id: PropTypes.number.isRequired,
  subpage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string
};

export default withStyles(styles)(SubPageLink);
