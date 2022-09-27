import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="120" r="120" />
    <rect x="8" y="270" rx="0" ry="0" width="280" height="17" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="425" rx="0" ry="0" width="100" height="30" />
    <rect x="130" y="420" rx="22" ry="22" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
