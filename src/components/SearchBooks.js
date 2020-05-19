import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookList from './BookList';

class SearchBooks extends Component {

  state = {
    books: []
  }

  handleChange = (event) => {
    if (event.target.value !== '') {
      BooksAPI.search(event.target.value.trim()).then(response => {
        const books = this.booksLreadyOnShelves(response, this.props.shelvedBooks);
        this.updateState(books);
      })
    }
    else {
      this.updateState([]);
    }

  }

  booksLreadyOnShelves(books, shelvedBooks) {
    const result = books.map(book => {
      if (shelvedBooks.hasOwnProperty(book.id)) {
        book.shelf = shelvedBooks[book.id];
      }
      return book;
    });
    return result;
  }

  updateState(newState) {
    this.setState({
      books: newState
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
