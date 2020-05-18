import React, { Component } from 'react'

class Book extends Component {

    handleSelect= (event) => {
        const shelf = event.target.value;
        console.log(shelf);
    }
    render() {
        const {book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleSelect} defaultValue={ book.hasOwnProperty('shelf') ? book.shelf : 'none'}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors !== undefined &&
                    <div className="book-authors">
                        {book.authors.map(author => <p key={author} >{author}</p>)}
                    </div>}
            </div>
        )
    }
}

export default Book
