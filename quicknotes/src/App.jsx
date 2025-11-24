import { useState, useEffect } from 'react';
import AddNotes from './components/addNotes.jsx';
import ViewNotes from './components/viewNotes.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import './App.css';
export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div className="app-container">
      <Header />
      <AddNotes notes={notes} setNotes={setNotes} />
      <ViewNotes notes={notes} setNotes={setNotes} />
      <Footer />
   </div>
  );
}
