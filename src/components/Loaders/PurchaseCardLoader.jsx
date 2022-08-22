import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={0.5}
    width={280}
    height={80}
    viewBox="0 0 280 80"
    backgroundColor="#e8e8e8"
    foregroundColor="#f2f2f2"
    {...props}>
    <rect x="0" y="0" rx="4" ry="4" width="120" height="18" /> 
    <rect x="0" y="30" rx="4" ry="4" width="80" height="20" /> 
    <rect x="0" y="70" rx="4" ry="4" width="100" height="10" /> 
    <rect x="180" y="30" rx="4" ry="4" width="100" height="18" />
  </ContentLoader>
);

export default MyLoader;
