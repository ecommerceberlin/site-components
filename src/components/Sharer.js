import React from 'react';
import TranslatedIconButton from './CompanyContactItem';
import { fullUrl } from '../helpers';

const _escape = str => encodeURIComponent(str);

const shareLink = (service, link, title = '', description = '') => {
  switch (service) {
    case 'linkedin':
      link = `https://www.linkedin.com/shareArticle?mini=true&url=${_escape(
        link
      )}&title=${_escape(title)}&summary=${_escape(description)}`;
      break;

    case 'facebook':
      link = `https://www.facebook.com/sharer/sharer.php?u=${_escape(link)}`;
      break;

    case 'twitter':
      link = `https://twitter.com/home?status=${_escape(link)}`;
      break;

    default:
  }

  return link;
};

const Sharer = ({ url, services, title, description }) => {
  return (
    <div style={{ marginTop: 20 }}>
      {services.map(service => (
        <TranslatedIconButton
          key={service}
          name={service}
          link={shareLink(service, fullUrl(url), title, description)}
          baseLabel="common.share"
        />
      ))}
    </div>
  );
};

Sharer.defaultProps = {
  url: '',
  title: '',
  description: '',
  services: ['facebook', 'linkedin', 'twitter']
};

export default Sharer;
