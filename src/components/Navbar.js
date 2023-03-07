import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import $ from 'jquery'

const Navbar = ({onButtonClick, onUnitClick}) => {
    const [location, setLocation] = useState('')

    const handleChange = (e) => {
        setLocation(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onButtonClick(location);
    }

    const tempChange = (e) => {
        let far = $('#far')
        let cel = $('#cel')
        
        if (e.target.id === 'far') {
            onUnitClick(false)
            far.addClass('selected')
            cel.removeClass('selected')
        } else {
            onUnitClick(true)
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
            <button type = 'submit' onClick = {handleSubmit}>Find</button>
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