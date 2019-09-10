import React from 'react'
import { useStoreState } from 'easy-peasy'
import { aboutPage } from '../Strings'
import { Link } from 'react-router-dom'

function About() {

    const code = useStoreState(state => state.language.code);
    // const setLan = useStoreActions(state => state.language.setLanguage);
    
    return (
        <>
        <div className="row"className={code === 'e'?"about_us row":"about_us row right_to_left"}>
            <div className="col-1-of-2">
                <h1>{aboutPage.title}</h1>
                <p className="footer__copyright">{aboutPage.text}</p>
            </div>
            <div className="col-1-of-2">
                <h1>{aboutPage.title}</h1>
                <div className="footer__navigation">
                    <ul className="social_media">
                        <li className="footer__item"><Link to="" ><img className="social_icon" src={require("../../img/facebook.png")}/></Link></li>
                        <li className="footer__item"><Link to="" ><img className="social_icon" src={require("../../img/instagram.png")}/></Link></li>
                        <li className="footer__item"><Link to="" ><img className="social_icon" src={require("../../img/youtube.png")}/></Link></li>
                        <li className="footer__item"><Link to="" ><img className="social_icon" src={require("../../img/telegram.png")}/></Link></li>
                        <li className="footer__item"><Link to="" ><img className="social_icon" src={require("../../img/linkedin.png")}/></Link></li>
                    </ul>
                    <ul className="footer__list">
                        <li className="footer__item"><p className="footer__link">Phone no.: 07701235477</p></li>
                    </ul>
                    <ul className="footer__list">
                        <li className="footer__item"><p className="footer__link">Phone no.: 07701235477</p></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default About
