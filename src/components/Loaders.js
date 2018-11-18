import React from 'react';
import ContentLoader from 'react-content-loader';

//https://github.com/danilowoz/react-content-loader

export const Logotype = () => (
  <ContentLoader
    height={200}
    width={380}
    speed={2}
    primaryColor={'#f3f3f3'}
    secondaryColor={'#ecebeb'}
  >
    <rect x="40" y="53.05" rx="0" ry="0" width="300.51" height="86.94" />
  </ContentLoader>
);

export const Bookingmap = () => (
  <ContentLoader
    height={841}
    width={1170}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="94" y="33.05" rx="0" ry="0" width="66" height="63" />
    <rect x="114" y="57.05" rx="0" ry="0" width="0" height="0" />
    <rect x="185" y="31.05" rx="0" ry="0" width="52" height="63" />
    <rect x="273" y="32.05" rx="0" ry="0" width="52" height="67" />
    <rect x="362" y="31.05" rx="0" ry="0" width="73" height="65" />
    <rect x="461" y="29.05" rx="0" ry="0" width="78" height="63" />
    <rect x="95" y="113.05" rx="0" ry="0" width="74" height="66" />
    <rect x="188" y="113.05" rx="0" ry="0" width="64" height="66" />
    <rect x="89" y="746.05" rx="0" ry="0" width="72" height="49" />
    <rect x="102" y="220.05" rx="0" ry="0" width="86" height="69" />
    <rect x="104" y="348.05" rx="0" ry="0" width="89" height="60" />
    <rect x="207" y="221.05" rx="0" ry="0" width="62" height="59" />
  </ContentLoader>
);
