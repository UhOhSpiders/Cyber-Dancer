import React from 'react'
import github_logo from "../assets/github_logo.svg"

const NavBar = () => {
  return (
    <div className='nav-bar'><h2>Cyber Dancer</h2><a href="https://github.com/UhOhSpiders/Hold-Me-Closer-Cyber-Dancer"><img src={github_logo} style={{ width: "30px" }} /></a></div>
  )
}

export default NavBar