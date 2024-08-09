import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const inputValue = event.target.value;
    if (inputValue.length <= 50) {
      this.setState(() => {
        return {
          title: inputValue,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);

    this.setState({
      title: "",
      body: "",
    });
  }

  render() {
    const remainingCharacters = 50 - this.state.title.length;
    return (
      <form className="note-input" onSubmit={this.onSubmitEventHandler}>
        <h2>Buat Catatan</h2>
        <p className="note-input__title__char-limit">
          Sisa Karakter : {remainingCharacters}{" "}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder="Tulis judul..."
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <textarea
          className="note-input__body"
          type="text"
          placeholder="Tulis catatan."
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        />
        <button type="submit">Simpan</button>
      </form>
    );
  }
}

export default NoteInput;
