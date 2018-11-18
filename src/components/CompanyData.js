import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

import Tab from './MyTab';
import CompanyTabContainer from './CompanyTabContainer'
import { getRecord } from '../redux/selectors'


const findSub = (sources, profile) => {
  return sources.filter(item => item in profile && profile[item].length > 10 ).map(item => ({name : item, value : profile[item]}))
}


const getCompanyProfileSelector = createSelector(

  getRecord,

  data => {

    if(!data.profile){
      return []
    }

    const tabs = [
      {name : "about"},
      {name : "products"},
      {name :  "expo"},
      {name : "contact", sources : ["website", "twitter", "facebook", "linkedin"]}
    ]

    return tabs.filter(({name, sources}) => (name in data.profile && data.profile[name].length > 50) || (sources && findSub(sources, data.profile))).map(({name, sources}) => ({name, value : sources ? findSub(sources, data.profile) : data.profile[name]}))

  }
)

const styles = theme => ({
  container: {
    minHeight: 100
  },
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  },
  profile: {
    minHeight: 100,
    maxHeight: 400,
    overflowY: 'scroll',
    padding: 30,
    marginBottom: 30
  },
  tabsContainer: {
    margin: '0 auto',
    marginBottom: 10
  },
  chip: {}
});


class CompanyData extends React.Component {

  state = {
    tab: typeof this.props.tabs[0] !== 'undefined' ? this.props.tabs[0].name : ""
  };

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {

    const { classes, tabs } = this.props;
    const { tab } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.tabsContainer}>
          <Tabs
            value={tab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
            scrollable={true}
            scrollButtons="off"
          >
            {tabs.map(({name}) => (
              <Tab key={name} value={name} label={`companies.profile.${name}`} />
            ))}
          </Tabs>
        </div>

        {tabs.map(
          ({name, value}) =>
             (
              <div key={name} className={classes.profile} style={{display : name === tab ? "block" : "none"  }}>
                <CompanyTabContainer name={name} data={value} />
              </div>
            )
        )}
      </div>
    );
  }
}



CompanyData.defaultProps = {
  tabs: []
};

const enhance = compose(

  connect( (state, props) => {

    const mapStateToProps = (state,props) => ({
      tabs : getCompanyProfileSelector(state, props)
    })
    return mapStateToProps;

  }),
  withStyles(styles)
)

export default enhance(CompanyData);
