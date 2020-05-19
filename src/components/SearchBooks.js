import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookList from './BookList';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    shelvedBooks: PropTypes.object.isRequired,
    addBookToShelf: PropTypes.func.isRequired
  };

  state = {
    books: []
  };


  /**
   * @description Function is called when user enters text in search box
   * It calls Books API to find the vooks which match the serach input.
   * Internally call updateState() function to update component state.
   * @param {event} event
   */
  handleChange = (event) => {
    if (event.target.value !== '') {
      BooksAPI.search(event.target.value.trim()).then(response => {
        const books = this.bookAlreadyOnShelves(response, this.props.shelvedBooks);
        this.updateState(books);
      })
    }
    else {
      this.updateState([]);
    }
  };


  /**
 * @description It is used to assign shelf property to the books returned from search.
 * Shelf prperty is only assigned to books which are aleady on shelves.
 * It checks if books is on the shelf and then assign shelf status to book.
 * Otherwise dont do anything to book.
 * @param {array} books
 * @param {object} shelvedBooks
 * @returns {array} books
 */
  bookAlreadyOnShelves(books, shelvedBooks) {
    const result = books.map(book => {
      if (shelvedBooks.hasOwnProperty(book.id)) {
        book.shelf = shelvedBooks[book.id];
      }
      return book;
    });
    return result;
  }


  /**
 * @description This function is used to update component state using
 * setState(). It is created to not duplicate the same setState() call 
 * at various places.
 * @param {books} newState
 */
  updateState(newState) {
    this.setState({
      books: newState
    });
  }


  /**
  * @description Renders the SearchBooks component to DOM
  */
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
          {this.state.books.length > 0 && <BookList books={this.state.books} onShelfChange={(book, shelf) => {
            this.props.addBookToShelf(book, shelf);
            console.log('search');
          }} />}
        </div>
      </div>
    )
  }
}

export default SearchBooks;
