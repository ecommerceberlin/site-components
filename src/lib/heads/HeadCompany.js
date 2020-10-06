import { MyHead } from '../next';
import _get from 'lodash/get';
//import Companies from '../datasources/Companies'
import SingleRecord from '../datasources/SingleRecord'
// import Settings from '../datasources/Settings'

import {
    getCompanyAltOgImage,
    getCompanyProfileInfo,
  } from '../helpers/data';
  
  
 const HeadCompany = ({id, slug, path, ogTemplate, children}) => (

    <SingleRecord endpoint="companies" slug={slug}>{(record) => (
        <MyHead
            image={getCompanyAltOgImage(record, "/exhibitors", ogTemplate)}
            url={`${path}/${slug}`}
            titleLabel={[
              'companies.opengraph.title',
              { name: getCompanyProfileInfo(record, 'name') }
            ]}>{children}</MyHead>
    )}</SingleRecord>
)

HeadCompany.defaultProps = {
    path : "/exhibitors",
    id: null,
    slug: null
}

export default HeadCompany;