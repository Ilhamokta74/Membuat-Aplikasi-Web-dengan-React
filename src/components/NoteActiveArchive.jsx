import React, { Component } from "react";
import { showFormattedDate } from "../utils/index.js";

class NoteList extends Component {
  render() {
    const { notes, onDelete, archived, onArchive } = this.props;

    return (
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-message-container">
            <p>Tidak ada catatan</p>
          </div>
        ) : (
          notes.map((note) => (
            <div className="note-item" key={note.id}>
              <div className="note-item__content">
                <div className="note-item__body">
                  <h3 className="note-item__title">{note.title}</h3>
                  <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
                  <p className="note-item__body">{note.body}</p>
                </div>
              </div>
              <div className="note-item__action">
                <button className="note-item__delete-button" onClick={() => onDelete(note.id)}>
                  Hapus
                </button>
                <button
                  className="note-item__archive-button"
                  onClick={() => onArchive(note.id)}
                >
                  {archived ? "Pindahkan" : "Arsipkan"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default NoteList;
