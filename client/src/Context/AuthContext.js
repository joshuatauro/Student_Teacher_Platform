import axios from '../axios'
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [userID, setUserID] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState()
  const [url, setUrl] = useState()
  const [userBranch, setUserBranch] = useState()
  const [college, setCollege] = useState()
  const checkIfUserLoggedIn = async() => {
    try{
      const response = await axios.get('/api/auth/status', { withCredentials: true })
      setIsLoggedIn(response.data.isLoggedIn)
      setUserID(response.data.userID)
      setUsername(response.data.username)
      setUrl(response.data.url)
      setUserBranch(response.data.branch)
      setCollege(response.data.college)
      console.log(response)
      return response
    } catch(err) {
      console.log(err.response.data)
    }
  }

  const login = async(email, password) => {
    try{
      const response = await axios.post('/api/auth/login', { email, password } ,{ withCredentials: true })
      setIsLoggedIn(response.data.code === 1)
      setUserID(response.data.userID)
      setUsername(response.data.username)
      setUserBranch(response.data.branch)
      setUrl(response.data.url)
      setCollege(response.data.college)

      return response
    } catch(err) {
      return err.response
    }
  }

  const signup = async(email, username, password) => {
    try{
      const response = await axios.post('/api/auth/sign-up', { email, password, username }, { withCredentials: true })
      setIsLoggedIn(response.data.status === "Success" ? true : false)
      setUserID(response.data.userID)
      setCollege(response.data.college)

      return response
    } catch(err) {
      return err.response
    }
  }
  
  const register = async(name, address, courses, brochureURL, desc, rank, rating, logoURL, bannerURL, highestPKG, medianPKG, averagePKG, clgURL, emailIdentifier) => {
    try{
      const response = await axios.post("/api/college/add", {name, address, courses, brochureURL, desc, rank, rating, logoURL, bannerURL, highestPKG, medianPKG, averagePKG, clgURL, emailIdentifier}, {withCredentials: true})
      return response
    } catch(err) {
      return err.response
    }
  }

  const logout = async() => {
    try{

      const response = await axios.get('/api/auth/logout', { withCredentials: true })
      if(response.data.status === "Success"){
        setIsLoggedIn(false)
        setUserID(undefined)
        setUsername(undefined)
      }

      return response

    } catch(err) {

    }
  }

  return(
    <AuthContext.Provider value={{
      isLoggedIn, login, signup, checkIfUserLoggedIn, userID, username, url, logout, userBranch, register, college
    }} >
      {children}
    </AuthContext.Provider>
  )

}