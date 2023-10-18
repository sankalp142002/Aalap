import React from 'react'
import '../css/navb.css'
import logo from "../assets/final-logo-01-removebg-preview.png"

function NavB() {
  return (
<>
<div className='navbar'>
  <a href="https://opennyai.org"><img className='logo' src={logo} alt="logo" /></a>
  
  <h1 className='heading'>Aalap</h1>
</div>
</>
  )
}

export default NavB
