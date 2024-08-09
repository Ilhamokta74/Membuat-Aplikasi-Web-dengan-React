import React from "react";
import NoteActive from "./NoteActiveArchive";
import { getInitialData } from "../utils/index";
import NoteInput from "./NoteInput";
import NoteHeader from "./NoteHeader";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnArchiveHandler = this.onUnArchiveHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      ),
    }));
  }

  onUnArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: false } : note
      ),
    }));
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => ({
      notes: [
        ...prevState.notes,
        {
          id: +new Date(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      ],
    }));
  }

  handleSearch(search) {
    this.setState({ search });
  }

  filterNotes() {
    const { notes, search } = this.state;
    const lowercasedSearch = search.toLowerCase();

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercasedSearch) ||
        note.body.toLowerCase().includes(lowercasedSearch)
    );
  }

  render() {
    const filteredNotes = this.filterNotes();
    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <div className="note-app__body">
        <NoteHeader onSearch={this.handleSearch} />
        <div className="notes-app">
          <NoteInput addNote={this.onAddNoteHandler} />
        </div>
        <div className="notes-app">
          <h2>Catatan Aktif</h2>
          <NoteActive
            notes={activeNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </div>
        <div className="notes-app">
          <h2>Arsip</h2>
          <NoteActive
            notes={archivedNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onUnArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
