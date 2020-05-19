import React from 'react'
// import * as BooksAPI from './BooksAPI'
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

  componentDidMount() {
    this.getBooks();
  }


  getBooks() {
    BooksAPI.getAll().then(myBooks => {
      console.log('count', myBooks.length);
      this.setState({
        books: myBooks
      });
    });
  };

  filterBooks = (shelfName) => this.state.books.filter(book => book.shelf === shelfName);

  updateShelf = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(response => {
      const bookLocation = this.state.books.findIndex(element => element.id === bookId.id);
      return bookLocation !== -1 && shelf != 'none' ? this.moveShelf(bookId, shelf) :  this.getBooks();
    })
  };

  moveShelf = (bookId, shelf) => {
    const bookLocation = this.state.books.findIndex(element => element.id === bookId.id)
    let books = [...this.state.books];
    books[bookLocation].shelf = shelf;
    this.setState({
      books
    });
  };

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
