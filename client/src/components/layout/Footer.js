import React from 'react'
import {
    Link
} from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

function Footer() {
    const code = useStoreState(state => state.language.code);
    const setLan = useStoreActions(state => state.language.setLanguage);
    const setAdmin = useStoreActions(state => state.auth.setAdmin);

    return (
        <footer className="footer">
            <div className="footer__logo-box">

                <picture className="footer__logo">
                    <source srcSet={require('../../img/logo-green-1x.png') + " 1x, " + require('../../img/logo-green-2x.png') + " 2x"}
                            media="(max-width: 37.5em)" />
                    <img srcSet={require('../../img/logo-green-1x.png')+" 1x, "+require('../../img/logo-green-2x.png')+" 2x"} alt="Full logo" src={require('../../img/logo-green-2x.png')} />
                </picture>
        
            </div>
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <button onClick={() => { setAdmin('') }} >Logout</button>
                            <li className="footer__item"><Link to="" className="footer__link">Company</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Contact us</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Carrers</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Privacy policy</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Terms</Link></li>
                            <button onClick={() => { setLan('k') }} >kurdih</button>
                            <button onClick={() => { setLan('a') }} >Arabic</button>
                            <button onClick={() => { setLan('e') }} >English</button>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-2">
                    <p className="footer__copyright">
                        Built by <Link to ="" className="footer__link">Jonas Schmedtmann</Link> for his online course <Link to="" className="footer__link">Advanced CSS and Sass</Link>.
                        Copyright &copy; by Jonas Schmedtmann. You are 100% allowed to use this webpage for both personal
                        and commercial use, but NOT to claim it as your own design. A credit to the original author, Jonas
                        Schmedtmann, is of course highly appreciated!
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;