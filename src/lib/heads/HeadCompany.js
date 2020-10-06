import { MyHead } from '../next';
//import Companies from '../datasources/Companies'
import SingleRecord from '../datasources/SingleRecord'
import Settings from '../datasources/Settings'

import {
    getCompanyOpenGraphImage,
    getCompanyProfileInfo,
  } from '../helpers/data';
  
  
 const HeadCompany = ({id, slug, path, ogTemplate, defaultLang, children}) => (
    <Settings>{(get) => (
        <SingleRecord endpoint="companies" id={id} slug={slug}>{(record) => (
            <MyHead
                image={ getCompanyOpenGraphImage(record, get("exhibitors.ogTemplate", ogTemplate), get("system.default_locale", defaultLang)) }
                url={`${path}/${slug}`}
                titleLabel={[
                  'companies.opengraph.title',
                  { name: getCompanyProfileInfo(record, 'name') }
                ]}>{children}</MyHead>
        )}</SingleRecord>
    )}</Settings>
   
)

HeadCompany.defaultProps = {
    path : "/exhibitors",
    id: null,
    slug: null,
    defaultLang: "en"
}

export default HeadCompany;