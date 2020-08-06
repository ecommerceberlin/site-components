
import get from 'lodash/get';

export const tagsUsed = (data, source) => [...new Set(data.map(c => get(c, source)).flat())].filter(item=>item); 
 