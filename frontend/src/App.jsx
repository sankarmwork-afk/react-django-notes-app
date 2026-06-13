import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import NotesListPage from './pages/notesListpage'
import NotePage from './pages/NotePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container dark">
        <div  className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<NotesListPage />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App