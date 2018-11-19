import React from 'react';
import PropTypes from 'prop-types';
import _sample from 'lodash/sample';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

import {translate} from '../i18n'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

import IconQuote from '@material-ui/icons/FormatQuote';

import Typography from './MyTypography';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    maxWidth: 800,
    padding: 30,
    backgroundColor: 'transparent'
  },



  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 150,
    height: 150
  },

  person: {
    color: 'rgba(255, 255, 255, 0.67)',
    fontSize: '1.275rem'
    //     fontWeight: 500,
    //     lineHeight: '1.71429em',
  }
};



class Reviews extends React.Component {

  state = {
    opinion: {}
  };

  isBigScreen() {
    const { width } = this.props;
    return width === 'xl' || width === 'lg';
  }

  componentDidMount() {

    const { locale, items } = this.props;

    let opinion;

    if(locale in items){
      opinion = _sample(items[locale]);
    }else{
      opinion = _sample(items["en"])
    }

    this.setState({ opinion });
  }

  render() {

    const { classes, width, locale } = this.props;
    const { opinion } = this.state;

    return (
      <div className={classes.row}>
        {'text' in opinion ? (
          <Card className={classes.card} elevation={0}>
            <CardContent>
              <Typography
                template="heroOpinion"
                icon={ IconQuote }
                iconClassName="heroIcon"
              >
                {this.isBigScreen() ? opinion.text : opinion.mobileText}
              </Typography>
            </CardContent>
            <CardHeader
              avatar={
                <Avatar
                  alt={opinion.person}
                  src={opinion.avatar}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                />
              }
              //  action={
              // <IconButton>
              //   <MoreVertIcon />
              // </IconButton>
              //    }
              title={opinion.person}
              classes={{ title: classes.person }}
              //  subheader="September 14, 2016"
            />
          </Card>
        ) : null}
      </div>
    );
  }
}

Reviews.propTypes = {
  classes: PropTypes.object.isRequired
};

Reviews.defaultProps = {
  locale : "en",
  items : {}
}

const enhance = compose(
  translate,
  withStyles(styles),
  connect(state => ({ width: state.app.width }))
);

export default enhance(Reviews);
