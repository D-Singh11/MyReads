import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component {
    render() {
        const list = this.props.books.map(book => {
            return (<li key={book.id}><Book book={book} /></li>)
        });
        return (
            <ol className="books-grid">
                {list}
            </ol>
        )
    }
}

export default BookList
