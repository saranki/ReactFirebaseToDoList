import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            newNoteContent: '',
        };
        //Initially newContent is undefined.
        //Can't setState for undefined.
        //So to get rid off that bind the handleUserInput method.
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote(this);
    }

    // When the user input changes, set the newContent 
    // to the value of what's in the input box.
    handleUserInput(e){
        console.log(this);
        this.setState({
            newNoteContent: e.target.value, // the value of the text input by the user
        })
    }

    writeNote(){
        this.props.addNote(this.state.newNoteContent);
        
        //Set the newNoteContent back to an empty string
        this.setState({
            newNoteContent: '',
        })
    }

    render(){
            return(
                <div className="FormWrapper">
                    <input className="noteInput" 
                    placeholder="Write a note..." 
                    value ={this.state.newNoteContent}
                    onChange={this.handleUserInput} />
                    <button className="noteButton"
                    onClick={this.writeNote}>Add Note</button>
                </div>
            )
    }
}

export default NoteForm;