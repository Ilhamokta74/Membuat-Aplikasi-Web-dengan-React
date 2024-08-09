import React from "react";

class NoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    this.setState({ search }, () => {
      this.props.onSearch(search);
    });
  };

  render() {
    return (
      <div>
        <div className="note-app__header">
          <h1>Notes App</h1>
          <div className="note-search"></div>

          <input
            type="text"
            id="search"
            placeholder="Cari Catatan...."
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default NoteHeader;
