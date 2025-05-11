import React from 'react'
import {Route,Routes} from "react-router-dom"
import PlayGround from './pages/PlayGround'
import Home from './pages/Home'
import Auth from "./conponents/Auth"
import Admin from './pages/admin'
import Reviewer from './pages/Reviewer'
import Developer from './pages/Developer'
import CodeSubmissionPage from './pages/CodeSubmissionPage'
import ViewCode from "./pages/ViewCode"
import ReviewCode from './pages/ReviewCode'
import AdminCode from './pages/AdminCode'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/play-ground" element={<PlayGround/>}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/:id" element={<Auth/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/reviewer" element={<Reviewer/>}/>
        <Route path="/developer" element={<Developer/>}/>
        <Route path="/submit-code" element={<CodeSubmissionPage/>}/>
        <Route path="/view-code/:id" element={<ViewCode/>}/>
        <Route path="/review-code/:id" element={<ReviewCode/>}/>
        <Route path="/admin-code/:id" element={<AdminCode/>}/>
        
      </Routes>
    </div>
  )
}

export default App
