// This is a JSX file.
// A syntax extension to JS that can be used to create React elements.
// Once compiled, JSX expressions become JS

// In react components have a lifecycle
// React Components --> 2 types
// 1. Presentation Component - Looks
// 2. Container Component - How things work

import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addNote=this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);

    //Make reference to a DB in firebase
    //Inside 'notes' ref child we'll have the notes we'll be pushing
    this.database = this.app.database().ref().child('notes');

    // We're going to state the React state of our component
    this.state = {
      //We'll have notes and keys here(map method)
      notes: [],
    }
  }

  // A stage in component lifecycle
  componentWillMount(){
    const previousNotes = this.state.notes;

    // Whenever we read data from firebase we receive data in a form called 
    // 'Datasnapshot'. This is passed to our event callbacks
    this.database.on( 'child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      //When ever a new note is added, we are going to update the state with the new note 
      this.setState({
        notes: previousNotes
      })
    })

    this.database.on( 'child_removed', snap => {
        for(var i=0; i<previousNotes.length; i++){
          if(previousNotes[i].id === snap.key){

            //get the note which has the id same as the id returned from
            //the firebase(snap.key) and remove it
            //in splice method i-> the id of the note, 1-> no of notes we want to remove
            previousNotes.splice(i, 1);
          }
        }

        this.setState({
          notes: previousNotes
        })
      })
  }

  // Add note
  addNote(note) {
    // //Push the note onto the notes array
    // const previousNotes = this.state.notes;
    // previousNotes.push({ id: previousNotes.length + 1, 
    //                     noteContent: note});

    // this.setState({
    //   notes: previousNotes
    // })
    
    this.database.push().set({ noteContent: note});
  }

  // Remove note
  removeNote(noteId){
    console.log("from the parent" + noteId);
    this.database.child(noteId).remove();
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
              <Note noteContent={note.noteContent} 
                    noteId={note.id} 
                    key={note.id} 
                    removeNote ={this.removeNote} />
            )
          })
          
        }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
