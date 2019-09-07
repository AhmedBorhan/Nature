import React,{useState} from 'react'
import {
    Link
} from 'react-router-dom'
import Select from 'react-select'
import { navbar } from '../Strings'
import { useStoreActions, useStoreState } from 'easy-peasy'


function Navbar() {
    const initialState = false
    const [state, setstate] = useState(initialState)
    const code = useStoreState(state => state.language.code);
    const setLan = useStoreActions(state => state.language.setLanguage);

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
                    <li className="navigation__item"><Link to='/activities' className="navigation__link" onClick={onCheck} >{navbar.activities}</Link></li>
                    <li className="navigation__item"><Link to='/login' className="navigation__link" onClick={onCheck} >Login</Link></li>
                    <li className="navigation__item">
                        <Link className="navigation__link" onClick={() => { setLan('k') }} >Kr</Link>
                        <Link className="navigation__link" onClick={() => { setLan('a') }} >Ar</Link>
                        <Link className="navigation__link" onClick={() => { setLan('e') }} >En</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;