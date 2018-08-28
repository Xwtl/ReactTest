import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => (
    <div>
        <p>Hello {props.name}</p>
    </div>
)

const App = () => (
    <div>
        <h1>Greetings</h1>
        <Hello name="Arto"/>
        <Hello name="Maam"/>
    </div>
)


ReactDOM.render(<App />, document.getElementById('root'))
