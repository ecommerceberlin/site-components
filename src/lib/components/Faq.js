
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MyTypography from './MyTypography';
import FaqItem from './FaqItem';
import { faqUrl } from './redux';
import { useRouter } from 'next/router'
import  queryString from 'query-string';


/**
 * ServerRouter {
  route: '/exhibit',
  pathname: '/exhibit',
  query: {},
  asPath: '/exhibit?q=additional_paid_services',
  basePath: '',
  events: undefined,
  isFallback: false
  }
 */

const Faq = ({ faqUrl, items, baseLabel, selected }) => {

  const router = useRouter();

  console.log(router);

  // const parsedUrl = queryString.parse(asPath)

  // console.log(parsedUrl)

  useEffect(()=>{

    // if (url && url.query && 'q' in url.query) {
    //   faqUrl(url.query.q);
    // }

  }) 

  return (
    <div
    style={{
      flexGrow: 1,
      marginTop: 20,
      marginBottom: 20,
      paddingBottom: 20
    }}
  >
    <MyTypography label={`${baseLabel}.name`} template="SUBH2CH" />

    {items.map(item => (
      <FaqItem key={item.label} baseLabel={baseLabel} {...item} />
    ))}
  </div>
  )

}

Faq.defaultProps = {
  items: [],
  baseLabel: 'faq',
  selected: []
};

Faq.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default  connect(
  state => ({ selected: state.visuals.faqs }),
  { faqUrl })(Faq);
