import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import SingleBlog from './SingleBlog'
import CreateBlog from './CreateBlog'
import EditBlog from './EditBlog'

function App() {
  return (
   <>
   
   <BrowserRouter>
   <Routes>
  <Route path='/'  element = {<Home/>} />
  <Route path='/blog/:id' element = {<SingleBlog/>}/>
    <Route path='/create' element = {<CreateBlog/>}/>
    <Route path='/edit/:id' element = {<EditBlog/>} />

   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
