import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component {

  /**
  * @description Renders the BookList component to DOM
  */
    render() {
        const list = this.props.books.map(book => {
            return (<li key={book.id}><Book book={book} onShelfChange={(book, shelf) => {
                this.props.onShelfChange(book, shelf);
            }} /></li>)
        });
        return (
            <ol className="books-grid">
                {list}
            </ol>
        )
    }
}

export default BookList
