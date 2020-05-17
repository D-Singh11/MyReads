import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  render() {
    return (
      <div className="app">
        <SearchBooks />

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf title={"Currently Reading"} />
              <BookShelf title={"Want to Read"} />
              <BookShelf title={"Read"} />
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>
              <button>Add a book</button>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export default BooksApp
