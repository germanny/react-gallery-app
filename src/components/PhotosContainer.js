import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import PhotosList from './PhotosList';
import SearchForm from './SearchForm';

// create a component for each photo
export default class PhotosContainer extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  }

  componentDidMount() {
    const match = (this.props.match) ? this.props.match.path.replace(',', '') : 'cats';
    this.searchPhotos(match);
  }

  onNavClick = e => {
    this.searchPhotos(e.target.pathname);
  }

  searchPhotos = (query = 'cats') => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    axios.get(url)
      .then((response) => {
        this.setState({
          photos: response.data.photos,
          loading: false
        });
      })
      .catch((error) => {
        console.log('error fetching and parsing data: ', error);
      })
  }

  render() {
    return (
      <div>
        <SearchForm onSearch={this.searchPhotos} />

        <nav className="main-nav">
          <ul>
            <li><NavLink onClick={this.onNavClick} exact to="/">Home</NavLink></li>
            <li><NavLink onClick={this.onNavClick} to='/cats'>Cats</NavLink></li>
            <li><NavLink onClick={this.onNavClick} to='/dogs'>Dogs</NavLink></li>
            <li><NavLink onClick={this.onNavClick} to='/computers'>Computers</NavLink></li>
          </ul>
        </nav>
        <PhotosList photos={this.state.photos} loading={this.state.loading} />
      </div>
    );
  }
}
