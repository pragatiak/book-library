import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { Form } from '../../components/Book';
import { Search } from '../../components';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleform: false,
    }
  }

  componentDidMount() {
    const { onLoad } = this.props;
    axios('http://localhost:8000/api/books')
      .then((res) => onLoad(res.data));
  }
  componentWillReceiveProps(nextProps) {
    const { onLoad } = this.props;
    if(nextProps.bookSearch) {
      this.setState({
        title: nextProps.bookSearch.title,
        body: nextProps.bookSearch.body,
        author: nextProps.bookSearch.author,
        stock: nextProps.bookSearch.stock,
      });
    }
  }

  handleEdit(book) {
    const { setEdit } = this.props;
    this.setState(
      { visibleform:  true})
    setEdit(book);
  }
  handleClickAdd(visibleform) {
    const { resetEdit } = this.props;
    this.setState({ 
      visibleform: !visibleform,
      })
    resetEdit(true);
  }

  render() {
    const { books } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Basic Library</h1>
          </div>
          <div className="navsearch">
            <button className="btn search right" type="button" onClick={() => this.handleClickAdd(this.state.visibleform)}>
              {this.state.visibleform ? 'Search' : 'Add'}
            </button>
            <div className={this.state.visibleform ? 'formvisibility' : 'notvisible'}><Form /></div>
            <div className={!this.state.visibleform ? 'formvisibility' : 'notvisible'}><Search /></div>
          </div>
         

        </div>
        <div className="row">
          <div className="col-12">
          <div className="listbooks">
            {books.map((book) => {
              return (
                <div className="card my-3">
                  <div className="card-header">
                    Book Name: {book.title}
                  </div>
                  <div className="card-body">
                    Synopsys: {book.body}
                    <div className="text-muted">Author: <b>{book.author}</b></div>
                    <div className="text-muted">Stock: <b>{book.stock}</b></div>
                    <div className="text-muted" > <i>Updated {moment(new Date(book.createdAt)).fromNow()} </i></div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button onClick={() => this.handleEdit(book)} className="btn edit-btn">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.home.books,
  bookSearch: state.home.bookSearch,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  setEdit: book => dispatch({ type: 'SET_EDIT', book }),
  resetEdit: form => dispatch({ type: 'RESET_EDIT', form }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);