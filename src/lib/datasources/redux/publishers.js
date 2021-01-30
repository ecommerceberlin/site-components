import { createSelector } from 'reselect';
import { getPublishers, getFilteringProps} from '../../redux/selectors'
import { processArrayData } from '../../helpers';

export const MobileAwarePublisherSelector = createSelector(
    getPublishers,
    getFilteringProps,
    (posts, props) => processArrayData( posts, props )
)


