
import React, {useEffect} from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import MyTypography from './MyTypography';
import FaqItem from './FaqItem';
import { faqUrl } from './redux';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {useSettings} from '../helpers'



const defaultProps = {
  items: [],
  baseLabel: 'faq',
  selected: [],
  showTitle: true
}

const Faq = ({setting, ...props}) => {

  const router = useRouter();
  const dispatch = useDispatch()
  const settings = useSettings(setting)

  const {items, baseLabel, selected, showTitle} = Object.assign({}, defaultProps, settings, props)

  useEffect(()=>{
    
    const {query} = router;

    if (query && 'q' in query && query.q) {
      dispatch(faqUrl(query.q.split(",")));
    }

  }) 

  return (
    <div style={{
      flexGrow: 1,
      marginTop: 10,
      marginBottom: 10,
      paddingBottom: 10
    }}>{showTitle && <MyTypography label={`${baseLabel}.name`} template="SUBH2CH" />}
    {items.map(item => (
      <FaqItem setting={setting} key={item.label} baseLabel={baseLabel} {...item} />
    ))}
  </div>
  )

}



export default  Faq