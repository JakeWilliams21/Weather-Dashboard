import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import $ from 'jquery'

const Navbar = () => {
    const [temp, setTemp] = useState(false)

    const handleChange = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const tempChange = (e) => {
        let far = $('#far')
        let cel = $('#cel')
        
        if (e.target.id === 'far') {
            setTemp(false)
            far.addClass('selected')
            cel.removeClass('selected')
        } else {
            setTemp(true)
            far.removeClass('selected')
            cel.addClass('selected')
        }
    }

  return (
    <div className = 'navbar flex-row'>
      <span className = 'logo'>JWW</span>
      <div className = 'searchbar flex-row'>
        <form className = 'location-form flex-row'>
            <div className = 'flex-row'>
                <SearchIcon className = 'search-icon'/>
                <input type = 'text' name = 'location' placeholder = 'Search location' onChange = {handleChange}/>
            </div>
            <button type = 'submit' onClick = {handleSubmit}>Find my location</button>
        </form>
        <div className = 'measurements flex-row'>
            <div id = 'far' className = 'farenheight selected' onClick = {tempChange}>F°</div>
            <div id = 'cel' className = 'celsius' onClick = {tempChange}>C°</div>
        </div>
      </div>  
    </div>
  )
}

export default Navbar