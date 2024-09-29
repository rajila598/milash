import { useState } from 'react'

import {Route, Routes} from 'react-router-dom';
import WebcamCapture from './pages/Webcamera';
import FileUpload from './pages/FileUpload';
function App() {

  return (
    // <WebcamCapture />
    <Routes>
      <Route path='/' element={<FileUpload />} />
    </Routes>
  )
}

export default App
