import React from 'react';

// create a component for each photo
const Photo = props => (
  <li>
    <img src={props.url} alt={props.title} />
  </li>
);

export default Photo;
