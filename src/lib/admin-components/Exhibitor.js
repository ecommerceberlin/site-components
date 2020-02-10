import React from 'react';
import Text from '../components/MyTypography'
import ProfileErrors from './ProfileErrors'
import Purchases from './Purchases'

const Exhibitor = props => {
    const {
      account,
      company,
      profile,
      errors,
      purchases,
      reps,
      party,
      meetups,
    } = props;
    const { name, event_manager, pr_manager, keywords, lang } = company;
    const { booth, fname, lname, phone } = profile;
  
    return (
      <div style={{ marginTop: 15 }}>
        <Text template="benefitsTitle">
          {name} ({booth}; @{account}; {lang})
        </Text>
        <Text template="benefitsText">
          {fname} {lname} {phone}
        </Text>
        <Text template="benefitsText">Reps: {reps}</Text>
        <Text template={party > 2 ? 'benefitsTextError' : 'benefitsText'}>
          Party: {party}
        </Text>
        <Text template="benefitsText">Meetups: {meetups}</Text>
        <ProfileErrors errors={errors} />
        <Purchases purchases={purchases} />
      </div>
    );
  };
  

export default Exhibitor;