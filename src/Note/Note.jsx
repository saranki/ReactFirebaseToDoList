import React, { Component } from 'react';
import './Note.css';
// Provides some type checking properties in our components
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props) {
        // To pass the propos to the parent class(Component is an abstract class here)
        super(props);
        this.noteContent = props.noteContent;
        this.noteId= props.noteId;
    }

    // render() method
    // in the DOM whatever we return from render() will be injected whenever render() is called
    render(props) {
        return(
            <div className = "note-fade-in">
                <p className="noteContent">{ this.noteContent }</p>
            </div>
        )
    }
}

Note.PropTypes = {
    noteContent: PropTypes.string,
}

// Inorder to import Note in other files without { }
export default Note;