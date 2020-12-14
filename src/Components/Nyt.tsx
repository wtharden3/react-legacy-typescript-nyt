import React, { Component } from 'react';
import NytResults from './NytResults';

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'xqFEyYJzzEKlWX48rMAyem8GtPYS43Wg';

type NytState = {
  search: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  results: [];
};

//can take props as an object
class Nyt extends Component<{}, NytState> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      startDate: '',
      endDate: '',
      pageNumber: 0,
      results: [],
    };
  }

  fetchResults = () => {
    let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
    url = this.state.startDate
      ? url + `&begin_date=${this.state.startDate}`
      : url;
    url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ results: data.response.docs }))
      .catch(err => console.log(err));
  };

   handleSubmit = (e: any) => {
   this.setState({pageNumber: 0});
  
    e.preventDefault();
    this.fetchResults();
  }

  //Pagination
   changePageNumber = (event: any, direction: string) => {
    event.preventDefault();
    if(direction === 'down'){
      if(this.state.pageNumber > 0){
        this.setState({pageNumber: this.state.pageNumber - 1});
        this.fetchResults();
      }
    }
    if(direction === 'up'){
      this.setState({pageNumber: this.state.pageNumber + 1});
      this.fetchResults();
    }
  }

  render() {
    return (
      <div className="main" style={{marginTop: '0', paddingTop: '0'}}>
        <div style={{color: '#333333', width: '100%', marginTop: '0'}} className="titleBar">
          <h1 style={{padding: '10px 20px'}}>New York Times Search API</h1>
          </div>
        <div style={{paddingTop: '40px'}} className="mainDiv">
          <form style={{lineHeight: '1.5'}}onSubmit={e => this.handleSubmit(e)}>
            <span>Enter a single search term (required) : </span>
            <input
              type="text"
              name="search"
              onChange={e => this.setState({ search: e.target.value })}
              required
            />
            <br />
            <span>Enter a start date: </span>
            <input
              type="date"
              name="startDate"
              pattern="[0-9]{8}"
              onChange={e => this.setState({ startDate: e.target.value })}
            />
            <br />
            <span>Enter an end date: </span>
            <input
              type="date"
              name="endDate"
              pattern="[0-9]{8}"
              onChange={e => this.setState({ endDate: e.target.value })}
            />
            <br />
            <button className="submit">Submit Search</button>
          </form>
          <br />
          <br />
          {
            this.state.results.length > 0 ? <NytResults pageNumber={this.state.pageNumber} results={this.state.results} changePage={this.changePageNumber}/> : null
          }
        </div>
      </div>
    );
  }
}

export default Nyt;
