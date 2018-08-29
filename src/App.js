import Note from "./components/Note"
import React from "react"
import ShortID from "shortid"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: props.notes,
            newNote: ""
        }
    }

    addNote = (event) => {
        event.preventDefault()
        if(this.state.newNote.length > 0) {
            const noteObject = {
                content: this.state.newNote,
                date: new Date().toISOString(),
                important: Math.random() > 0.5,
                id: ShortID.generate()
            }

            const notes = this.state.notes.concat(noteObject)

            this.setState({
                notes: notes,
                newNote: ''
            })
        }
    }


    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState( {newNote: event.target.value })
    }

    render() {
        return (
            <div>
                <h1>Muistiinpanot</h1>
                <ul>
                    {this.state.notes.map( note => <Note key={note.id} note={note}/>)}
                </ul>
                <form onSubmit={this.addNote}>
                    <input value={this.state.newNote} onChange={this.handleNoteChange}/>
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default App;