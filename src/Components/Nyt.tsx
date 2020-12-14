import React, { Component } from 'react';
import NytResults from './NytResults';

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'xqFEyYJzzEKlWX48rMAyem8GtPYS43Wg';

type NytState = {
  search: string;
  startDate: string | number;
  endDate: string | number;
  pageNumber: number;
  results: [];
};

class NytApp extends Component<{}, NytState> {
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
      .then(data => {
        if (data.response) {
          this.setState({ results: data.response.docs });
        }
      });
  };

  handleSubmit = (e: any) => {
    //I added
    this.setState({ pageNumber: 0 });
    //I added
    e.preventDefault();
    this.setState({
      results: [],
    });
    this.fetchResults();
  };

  nextPageNumber = (e: any) => {
    e.preventDefault();
    this.setState(
      {
        pageNumber: this.state.pageNumber + 1,
      },
      () => {
        this.fetchResults();
      }
    );
  };

  previousPageNumber = (e: any) => {
    e.preventDefault();
    if (this.state.pageNumber > 0) {
      this.setState(
        {
          pageNumber: this.state.pageNumber - 1,
        },
        () => {
          this.fetchResults();
        }
      );
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <form onSubmit={e => this.handleSubmit(e)}>
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
          <button onClick={e => this.previousPageNumber(e)}>
            Previous Page
          </button>
          <button onClick={e => this.nextPageNumber(e)}>Next Page</button>
          <br />
          <br />
          <NytResults results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default NytApp;
