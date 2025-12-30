import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Loging from './component/loging'
import AvatarSelection from './component/SelectAvatar'
import EnglishTutorChat from './component/TutorChat'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Loging />} />
        <Route path="/avatar" element={<AvatarSelection />} />
        <Route path="/tutor" element={<EnglishTutorChat />} />
      </Routes>
    </Router>
  )
}

export default App