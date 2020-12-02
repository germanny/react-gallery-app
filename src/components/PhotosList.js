import React from 'react';
import Photo from './Photo';

// combine all the individual Photo components into a list
// or show the error page if there are no photos
const PhotosList = props => {
  //data is passed in from App.js
  const results = props.photos;
  let photos;

  // if we have photos, map over the photos and show a Photo component for each
  if (!props.loading) {
    photos = results.photo.map((photo, index) =>
      // Photo Image URLs: https://www.flickr.com/services/api/misc.urls.html
      <Photo key={index} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`} />
    );
  } else { // no photos :(
    photos = `Loading ...`;
  }

  // return whatever we have
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
}

export default PhotosList;
