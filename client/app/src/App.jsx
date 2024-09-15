import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect ( () => {
    fetchBooks()
  }, []);
  const fetchBooks = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/apis/books')
        const data = await response.json()
        setBooks(data)
    } catch (err) {

    }
  };

  const createBooks = async () => {
    try{
      console.log(title, " ", releaseYear)
      const response = await fetch('http://127.0.0.1:8000/apis/create-book', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: title,
          release_year: releaseYear,
        })
      } )
      const data = await response.json()
      console.log(data)
      setBooks( (prev) => [...prev, data])
    } catch (err){

    }
  };
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Books Website</h1>
      <div>
        <input type='text' placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)}></input>
        <input type='number' placeholder='Enter Release Year' onChange={(e) => setReleaseYear(e.target.value)}></input>
        <button onClick={createBooks}> Submit  </button>
      </div>
      <div>
        { books.map( (book) =>(
          <div>
            <p> Title: {book.title} </p>
            <p> Release Year: {book.release_year} </p>
          </div>
        )

        )}
      </div>
      <div>

      </div>
      
    </>
  )
}

export default App
