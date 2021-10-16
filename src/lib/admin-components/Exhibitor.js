import React from 'react';
import Text from '../components/MyTypography'
import ProfileErrors from './ProfileErrors'
import Purchases from './Purchases'


const defaultProps = {

  show_mobilepass: false,
  show_partyticket: false,
}

const Exhibitor = ({setting, ...props}) => {
    const {
      account,
      company,
      profile,
      errors,
      purchases,
      reps,
      party,
      meetups,
      show_mobilepass,
      show_partyticket
    } = Object.assign({}, defaultProps, props);

    const { name, password, keywords, lang } = company;
    const { booth, fname, lname, phone } = profile;
  
    return (
      <div style={{ marginTop: 15 }}>
        <Text template="benefitsTitle">
          {name} ({booth}; @{account}; {lang})
        </Text>
        <Text template="benefitsText">
          {fname} {lname} {phone}
        </Text>

        {show_mobilepass && <Text template="benefitsText">
         mobile pass: <strong>{password}</strong>
        </Text>}

        <Text template="benefitsText"><strong>Reps: {reps}</strong></Text>
        {show_partyticket && <Text template={party > 2 ? 'benefitsTextError' : 'benefitsText'}>Party: {party}</Text>}
        <Text template="benefitsText">Meetups: {meetups}</Text>
        <ProfileErrors errors={errors} />
        <Purchases purchases={purchases} />
      </div>
    );
  };
  

export default Exhibitor;