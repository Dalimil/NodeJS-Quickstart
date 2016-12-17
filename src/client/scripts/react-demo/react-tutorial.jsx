import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      query: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const { query, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={query} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={query} />
      </div>
    );
  }
}

// function(props) => { return <div></div>; }
const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

const Table = ({ list, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '15%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '15%' }}>
          {item.points}
        </span>
      </div>
    )}
  </div>

export default App;
