import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      stock: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bookToEdit) {
      this.setState({
        title: nextProps.bookToEdit.title,
        body: nextProps.bookToEdit.body,
        author: nextProps.bookToEdit.author,
        stock: nextProps.bookToEdit.stock,
      });
    }
    else{
      this.setState({ title: '', body: '', author: '' ,stock: ''});
    }
  }

  handleSubmit(){
    const { onSubmit, bookToEdit, onEdit , setSearch} = this.props;
    const { title, body, author, stock } = this.state;

    axios.get('http://localhost:8000/api/books').then((res)=>{
      //on success reset search data
      setSearch(res.data);
      }).catch((error)=>{
        console.log('There is an error in API call.');
      });

    if(!bookToEdit) {
      return axios.post('http://localhost:8000/api/books', {
        title,
        body,
        author,
        stock
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' ,stock: ''}));
    } else {
      return axios.patch(`http://localhost:8000/api/books/${bookToEdit._id}`, {
        title,
        body,
        author,
        stock
      })
        .then((res) => onEdit(res.data))
        
        .then(() => this.setState({ title: '', body: '', author: '' ,stock: ''}));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSearch(key, event) {
    const { setSearch } = this.props;
    this.setState({
      [key]: event.target.value,
    });

    var searchQuery = event.target.value.toLowerCase();
    axios.get('http://localhost:8000/api/books').then((res)=>{
      //on success filter on search
      var displayedBookList ={};
      displayedBookList.books = res.data.books.filter(function(el) {
        var searchValue = el.title.toLowerCase()
        return searchValue.indexOf(searchQuery) !== -1;
      });
      setSearch(displayedBookList);
      }).catch((error)=>{
        //on error
        console.log('There is an error in API call.');
      });
  }


  render() {
    const { bookToEdit } = this.props;
    const { title, body, author, stock } = this.state;

    return (
      
      <div className="addform">
      <form>
        <input
          onChange={(ev) => this.handleSearch('title', ev)}
          value={title}
          className="form-control"
          placeholder="Book Title"
          required
        />
        <input
          onChange={(ev) => this.handleChangeField('author', ev)}
          value={author}
          className="form-control"
          placeholder="Book Author"
          required
        />
        <input
          onChange={(ev) => this.handleChangeField('stock', ev)}
          value={stock}
          className="form-control"
          placeholder="Book Stock"
          required
          type="number"
        />
         <textarea
          onChange={(ev) => this.handleChangeField('body', ev)}
          className="form-control"
          placeholder="Book Body"
          required
          value={body}>
        </textarea>
        <br />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{bookToEdit ? 'Update' : 'Submit'}</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_BOOK', data }),
  onEdit: data => dispatch({ type: 'EDIT_BOOK', data }),
  setSearch: data => dispatch({ type: 'SET_SEARCH', data }),
});
const mapStateToProps = state => ({
  bookToEdit: state.home.bookToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);