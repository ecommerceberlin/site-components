

import {
    People,
    Wrapper
  } from '../components';

  import {Presenters} from '../datasources'



const WidgetFeaturedPresenters = (rest) => (
<Wrapper {...rest}>
<Presenters  filter={function(item) {
     return item.bio && item.bio.length > 5;
   }}>
    {(data) =>  <People
   link={true}
   random={false}
   limit={22}
 />}
</Presenters>

</Wrapper>

)


WidgetFeaturedPresenters.defaultProps = {
    label : "presenters.list_full"
}

export default WidgetFeaturedPresenters;