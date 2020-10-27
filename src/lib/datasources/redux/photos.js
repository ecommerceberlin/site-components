import { createSelector } from 'reselect';
import { getPhotos, getFilteringProps, getViewPortWidth} from '../../redux/selectors'
import { processArrayData, getGalleryImageSize } from '../../helpers';

export const MobileAwarePhotosSelector = createSelector(
    getPhotos,
    getFilteringProps,
    (photos, props) => processArrayData( photos, props )
  )
  
export const PhotoSizeSelector = createSelector(
    getViewPortWidth,
    width => getGalleryImageSize(width)
)