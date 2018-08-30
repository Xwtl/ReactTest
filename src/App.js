import React from "react"
import ShortID from "shortid"
import './index.css'
import Note from "./components/Note"
import NoteService from "./services/notes"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            notes: [],
            newNote: "",
            showAll: true
        }
    }

    // Haetaan muistiinpanot palvelimelta ja asetetaan ne komponentin tilaan
    componentDidMount() {
        NoteService.getAll()
            .then(response => {
                this.setState({notes: response.data})
            })
    }

    // Tapahtumankäsittelijä uuden muistiinpanot lähettämistä varten.
    // Luo tekstikentän sisällön perusteella uuden muistiinpano-olion ja
    // lähettää sen palvelimelle tallennettavaksi.
    // Lähetyksen jälkeen komponentin tila päivitetään, jotta muutos
    // renderöityy.
    addNote = (event) => {
        event.preventDefault()
        if(this.state.newNote.length > 0) {
            const noteObject = {
                id: ShortID.generate(),
                content: this.state.newNote,
                date: new Date().toISOString(),
                important: Math.random() > 0.5
            }

            NoteService.create(noteObject)
                .then(response => {
                    this.setState({
                        notes: this.state.notes.concat(response.data),
                        newNote: ''
                    })
                })
        }
    }

    // Tapahtumankäsittelijä tekstikenttää varten. Päivittää tekstikentässä
    // olevan tekstin komponentin tilaan, jotta muutokset renderöityvät.
    handleNoteChange = (event) => {
        this.setState({newNote: event.target.value})
    }

    // Tapahtumankäsittelijä viestityyppien näyttämistä muuttavalle napille.
    // Muuttaa komponentin showAll-tilaa.
    toggleVisible = () => {
        this.setState({showAll: !this.state.showAll})
    }

    // Funktio, joka palauttaa yksilölliset tapahtumankäsittelijät muistiinpanoille
    // niiden tärkeyden muuttamista varten.
    toggleImportanceOf = (id) => {
        return () => {
            const noteToChange = this.state.notes.find(note => note.id === id)
            const changedNote = { ...noteToChange, important: !noteToChange.important }

            NoteService.update(id, changedNote)
                .then(response => {
                    this.setState({
                        notes: this.state.notes.map(note => note.id !== id ? note : response.data)
                    })
                })
                .catch(error => {
                    alert(`muistiinpano '${noteToChange.content}' on jo valitettavasti poistettu palvelimelta`)
                    this.setState({ notes: this.state.notes.filter(note => note.id !== id) })
                })
        }
    }

    render() {
        // Muodostaa näytettävien muistiinpanojen kokoelman sen perusteella,
        // mikä komponentin showAll-attribuutin tila on.
        const notesToShow =
            this.state.showAll ?
                this.state.notes :
                this.state.notes.filter( note => note.important )

        // Näytettävien viestien muuttamiseen tarkoitetun napin teksti.
        const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleVisible}>
                        näytä {label}
                    </button>
                </div>
                <ul>
                    {notesToShow.map(note => <Note key={note.id}
                                                   note={note}
                                                   toggleImportance={this.toggleImportanceOf(note.id)}/>)}
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