import React, { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Notes/Note";
import INote from "./interfaces/note.interface";

function App() {
  const [notesList, setNotesList] = useState<any[]>([]);

  useEffect(() => {
    const listFromStorageString = localStorage.getItem("note");
    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(notesList));
  }, [notesList]);

  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/notes");
  //     setNotesList(response.data.notes);
  //     console.log(notesList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  console.log(notesList);

  const updateNoteItem = (updatedNote: INote) => {
    console.log("value updated in the App componenet");
    console.log(updatedNote);
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNotesList(updatedList);
  };

  return (
    <div className="App">
      <div>
        <div className="notes-list">
          {notesList.map((noteItem, index) => {
            return (
              <Note onNoteUpdate={updateNoteItem} note={noteItem} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
