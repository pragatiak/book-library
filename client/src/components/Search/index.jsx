import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  handleSearch(key, event) {
    const { setSearch } = this.props;
    this.setState({
      [key]: event.target.value,
    });

    var searchQuery = event.target.value.toLowerCase();
    axios.get('http://localhost:8000/api/books').then((res)=>{
      //on success
      var displayedBookList ={};
      displayedBookList.books = res.data.books.filter(function(el) {
        var searchTitle = el.title.toLowerCase()
        var searchAuthor = el.author.toLowerCase()
        var searchBody = el.body.toLowerCase()
        return ((searchTitle.indexOf(searchQuery)!== -1) || 
        (searchAuthor.indexOf(searchQuery) !== -1)) ;
      });
      setSearch(displayedBookList);

      }).catch((error)=>{
        //on error
        console.log('There is an error in API call.');
      });
  }

  render() {
    const { search } = this.state;

    return (
      <div className="col-12">
      <div className ="searchbar">
        <input
          onChange={(ev) => this.handleSearch('search', ev)}
          value={search}
          className="form-control"
          placeholder="Search ...."
        />
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setSearch: data => dispatch({ type: 'SET_SEARCH', data }),
});
export default connect(null, mapDispatchToProps)(Search);