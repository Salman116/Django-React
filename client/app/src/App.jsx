import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("");
  const [newtitle, setnewTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect ( () => {
    fetchBooks()
  }, []);
  const fetchBooks = async () => {
    try {
        const response = await fetch('https://salman116.pythonanywhere.com/apis/books')
        const data = await response.json()
        setBooks(data)
    } catch (err) {

    }
  };

  const createBooks = async () => {
    try{
      console.log(title, " ", releaseYear)
      const response = await fetch('https://salman116.pythonanywhere.com/apis/create-book', {
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
      console.log(err)
    }
  };
  const updateBook = async (pk, release_year) => {
    try{
      const response = await fetch(`https://salman116.pythonanywhere.com/apis/book/${pk}`, {
        method: 'PUT',
        headers:{
          "Content-Type": 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          title: newtitle,
          release_year: release_year,
        })
      })
      const data = await response.json()
      setBooks( (prev) => prev.map((book) => {
        if (book.id === pk){
          return data;
        }
        else{
          return book;
        }
      }) )
    } catch (err){
      console.log("Update API", err)
    }
  };
  const deleteBook = async (pk, release_year) => {
    try{
      const response = await fetch(`https://salman116.pythonanywhere.com/apis/book/${pk}`, {
        method: 'Delete',
        headers:{
          "Content-Type": 'application/json; charset=UTF-8'
        },
      })
      setBooks( (prev) => prev.filter((book)=>book.id ===!pk));
    } catch (err){
      console.log("Delete API", err)
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
            <input type='text' placeholder='Enter new Title' onChange={(e) => setnewTitle(e.target.value)}></input>
            <button onClick={() => updateBook(book.id, book.release_year)}>Update</button>
            <button onClick={() => deleteBook(book.id, book.release_year)}>Delete</button>
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
