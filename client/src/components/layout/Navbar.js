import React,{useState} from 'react'
import {
    Link
} from 'react-router-dom'
import { navbar } from '../Strings'

function Navbar() {
    const initialState = false
    const [state, setstate] = useState(initialState)

    const onCheck = () =>{
        setstate(!state)
    }

    return (
        <div className="navigation">
            <input type="checkbox" checked={state} onChange={onCheck} className="navigation__checkbox" id="navi-toggle" />

            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item"><Link to='/'  className="navigation__link" onClick={onCheck} >{navbar.home}</Link></li>
                    <li className="navigation__item"><Link to='/membership' className="navigation__link" onClick={onCheck} >{navbar.member}</Link></li>
                    <li className="navigation__item"><Link to='/about' className="navigation__link" onClick={onCheck} >{navbar.about}</Link></li>
                    <li className="navigation__item"><Link to='/activities'  className="navigation__link" onClick={onCheck} >{navbar.activities}</Link></li>
                    <li className="navigation__item"><Link to='/login' className="navigation__link" onClick={onCheck} >Login</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;