import React from 'react';
import MyTypography from './MyTypography';
import SubPageLink from './SubPageLink';
 
const ColumnlistItem = ({id, slug, name, highlighted, path}) => (
  <MyTypography template="LIH3">
    <SubPageLink 
      href={`${path}/[slug]`} 
      as={`${path}/${slug}`}  
      name={name}
      highlighted={highlighted}
      />
  </MyTypography>
)

ColumnlistItem.defaultProps = {
  id : 0,
  slug: "",
  name: "",
  highlighted: false,
  path: "/"
}


export default ColumnlistItem
