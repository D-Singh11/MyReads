import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired,
    }

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
