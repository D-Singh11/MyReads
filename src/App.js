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
    BooksAPI.getAll().then(myBooks => {
      this.setState({
        books: myBooks
      });
    })
  }

  filterBooks = (shelfName) => this.state.books.filter(book => book.shelf === shelfName);

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      const bookLocation = this.state.books.findIndex(element => element.id === book.id)
      let books = [...this.state.books];
      books[bookLocation].shelf = shelf;
      this.setState({
        books
      });
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks />
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
