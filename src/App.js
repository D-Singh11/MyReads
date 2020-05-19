import React from 'react'
import './App.css'
import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: []
  }


  /**
  * @description Lidecycle hook called when DOM is rendered
  * It call the local getBooks() function which than makes API call
  */

  componentDidMount() {
    this.getBooks();
  }


  /**
  * @description Call API to get shelved books
  * Also update the component state
  */

  getBooks() {
    BooksAPI.getAll().then(myBooks => {
      console.log('count', myBooks.length);
      this.setState({
        books: myBooks
      });
    });
  };


 /**
 * @description Filters thr books based upon shelf
 * @param {string} shelfName
 * @returns {array} Filtered books 
 */

  filterBooks = (shelfName) => this.state.books.filter(book => book.shelf === shelfName);


/**
* @description Updates the status of book's shelf in the backend
* by calling BooksPI's getAll() method
* @param {object} book
* @param {string} shelf 
*/

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      const bookLocation = this.state.books.findIndex(element => element.id === book.id);
      return bookLocation !== -1 && shelf !== 'none' ? this.moveShelf(book, shelf) : this.getBooks();
    })
  };


/**
* @description Moves the book from one shelf to other.
* Also updates the component state to make re-render page
* by calling BooksPI's getAll() method
* @param {object} book
* @param {string} shelf 
*/

  moveShelf = (book, shelf) => {
    const bookLocation = this.state.books.findIndex(element => element.id === book.id)
    let books = [...this.state.books];
    books[bookLocation].shelf = shelf;
    this.setState({
      books
    });
  };


  /**
* @description Renders the component to DOM
* by calling BooksPI's getAll() method 
*/

  render() {
    let shelvedBooks = {};
    this.state.books.forEach(myBook => {
      shelvedBooks[myBook.id] = myBook.shelf;
    });

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks addBookToShelf={this.updateShelf} shelvedBooks={shelvedBooks} />
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title={"Currently Reading"} books={this.filterBooks('currentlyReading')} onShelfChange={this.updateShelf} />
                <BookShelf title={"Want to Read"} books={this.filterBooks('wantToRead')} onShelfChange={this.updateShelf} />
                <BookShelf title={"Read"} books={this.filterBooks('read')} onShelfChange={this.updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
