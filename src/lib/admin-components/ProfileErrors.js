import React from 'react';
import Text from '../components/MyTypography'

const ProfileErrors = ({ errors }) => {
    const arr = Object.keys(errors);
    if (!arr.length) {
      return null;
    }
    return (
      <Text template="benefitsTextError">
        Profile errors:{' '}
        {arr.map(field => (
          <strong key={field}>{field}, </strong>
        ))}
      </Text>
    );
  };

  export default ProfileErrors