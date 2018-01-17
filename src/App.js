// This is a JSX file.
// A syntax extension to JS that can be used to create React elements.
// Once compiled, JSX expressions become JS

// React Components --> 2 types
// 1. Presentation Component - Looks
// 2. Container Component - How things work

import React, { Component } from 'react';
import logo from './logo.svg';
import Note from './Note/Note';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // We're going to state the React state of our component
    this.state ={
      //We'll have notes and keys here(map method)
      notes: [
        { id:1, noteContent: "Note 1 here" },
        { id:2, noteContent: "Note 2 here" }
      ],
    }
  }

  // render() method returns a html component here.
  // JSX allows us to include html to our JS 
  render() {
    //To inject Note component <Note />
    return (
      <div className="notesWrapper"> 
        <div className="notesHeader">       
          <div className="heading">React Firebase To-Do List</div>
        </div>
        <div className="notesBody">
        {
          // We are going to map the notes array here
          this.state.notes.map((note) => {
            return (
              <Note noteContent={note.noteContent} noteId={note.id} key={note.id} />
            )
          })
          
        }
        </div>
        <div className="notesFooter">
          Footer will go here...
        </div>
      </div>
    );
  }
}

export default App;
