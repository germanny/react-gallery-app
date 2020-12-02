import React from 'react';
import Photos from './Photos';

const Search = ({ match }) => {
  console.log('matches: ', match);
  return (
    <Photos path={match.params.path} />
  );
}

export default Search;
