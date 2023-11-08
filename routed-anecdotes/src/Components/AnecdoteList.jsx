import { Link } from "react-router-dom"
import Notification from "./Notification"

const AnecdoteList = ({ anecdotes, message }) => (
    <div>
      <Notification message={ message } />
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
            <li key={anecdote.id} >
                <Link to ={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </li>)}
      </ul>
    </div>
)

export default AnecdoteList