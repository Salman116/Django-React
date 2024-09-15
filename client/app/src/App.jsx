import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("hello");
  const [releaseYear, setReleaseYear] = useState("");
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Books Website</h1>
      <div>
        <input type='text' placeholder='Enter Title'></input>
        <input type='number' placeholder='Enter Release Year'></input>
        <button> Submit </button>
      </div>
        <h1> {title}</h1>
      <div>

      </div>
      
    </>
  )
}

export default App
