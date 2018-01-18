import React, { Component } from 'react';
import './Note.css';
// Provides some type checking properties in our components
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props){
        // To pass the propos to the parent class(Component is an abstract class here)
        super(props);
        this.noteContent = props.noteContent;
        this.noteId= props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    // render() method
    // in the DOM whatever we return from render() will be injected whenever render() is called
    render(props) {
        return(
            <div className = "note fade-in">
            <span className="closebtn" onClick={() => this.handleRemoveNote(this.noteId)}>
                &times;
            </span>
                <p className="noteContent">{ this.noteContent }</p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

// Inorder to import Note in other files without { }
export default Note;