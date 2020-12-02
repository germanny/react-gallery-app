import React, { Component } from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';
import apiKey from './config';
import axios from 'axios';

import NotFound from './components/NotFound';
import PhotosList from './components/PhotosList';
import SearchForm from './components/SearchForm';

export default class App extends Component {
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
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&safe_search=&format=json&nojsoncallback=1`;

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
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.searchPhotos} />

          <nav className="main-nav">
            <ul>
              <li><NavLink onClick={this.onNavClick} exact to="/">Home</NavLink></li>
              <li><NavLink onClick={this.onNavClick} to='/cats'>Cats</NavLink></li>
              <li><NavLink onClick={this.onNavClick} to='/dogs'>Dogs</NavLink></li>
              <li><NavLink onClick={this.onNavClick} to='/owls'>Owls</NavLink></li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" render={() => <PhotosList photos={this.state.photos} loading={this.state.loading} />} />
            <Route path="/cats" render={() => <PhotosList photos={this.state.photos} loading={this.state.loading} />} />
            <Route path="/dogs" render={() => <PhotosList photos={this.state.photos} loading={this.state.loading} />} />
            <Route path="/owls" render={() => <PhotosList photos={this.state.photos} loading={this.state.loading} />} />
            <Route path="/search/:term" render={() => <PhotosList photos={this.state.photos} loading={this.state.loading} />} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
