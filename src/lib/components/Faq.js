
import React, {useEffect} from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import MyTypography from './MyTypography';
import FaqItem from './FaqItem';
import { faqUrl } from './redux';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

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

const Faq = ({ items, baseLabel, selected, showTitle }) => {

  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(()=>{
    
    const {query} = router;

    if (query && 'q' in query && query.q) {
      dispatch(faqUrl(query.q.split(",")));
    }

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
    {showTitle && <MyTypography label={`${baseLabel}.name`} template="SUBH2CH" />}

    {items.map(item => (
      <FaqItem key={item.label} baseLabel={baseLabel} {...item} />
    ))}
  </div>
  )

}

Faq.defaultProps = {
  items: [],
  baseLabel: 'faq',
  selected: [],
  showTitle: true
};

Faq.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default  Faq