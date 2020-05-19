import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    /**
   * @description Function is called when user selects the shelf status of
   * book using select options attached to each book.
   * Internally calls onShelfChange() function to pass 
   * it selected book and shelf chosen
   * @param {event} event
   */
    handleSelect = (event) => {
        const shelf = event.target.value;
        this.props.onShelfChange(this.props.book, shelf);
    };


    /**
    * @description Renders the Book component to DOM
    */
    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${book.imageLinks !== undefined && book.imageLinks.thumbnail})`       //ensures to only shows thunmnail if a books has it
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleSelect}
                        // used to highlight correct shelf selection
                            defaultValue={book.hasOwnProperty('shelf') ? book.shelf : 'none'}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {/* ensures to only shows authors if a books has others */}
                {book.authors !== undefined &&
                    <div className="book-authors">
                        {book.authors.map(author => <p key={author} >{author}</p>)}
                    </div>}
            </div>
        )
    }
}

export default Book;
