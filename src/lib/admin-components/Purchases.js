
import React from 'react';
import Text from '../components/MyTypography'

const Purchases = ({ purchases }) => {
    const filtered = purchases.filter(item => item);
    const clear = str => str.replace(/resources.upgrades./gi, '');
    const findName = item =>
      item.translation_asset_id.lenght ? item.translation_asset_id : item.___name;
    return filtered.map(item => {
      const name = clear(findName(item));
      return (
        <Text key={name} template="benefitsText">
          <strong>{item.quantity} x</strong> {name}
        </Text>
      );
    });
  };

  export default Purchases;