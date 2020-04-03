import React from 'react'
import {
    Link
} from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {commonStrings} from '../Strings'

function Footer() {
    const code = useStoreState(state => state.language.code);
    const setLan = useStoreActions(state => state.language.setLanguage);

    return (
        <footer className={code === 'en'?"footer":"footer right_to_left"}>
            <div className="footer__logo-box">

                <picture className="footer__logo">
                    <source srcSet={require('../../img/logo-green-1x.png') + " 1x, " + require('../../img/logo-green-2x.png') + " 2x"}
                            media="(max-width: 37.5em)" />
                    <img srcSet={require('../../img/logo-green-1x.png')+" 1x, "+require('../../img/logo-green-2x.png')+" 2x"} alt="Full logo" src={require('../../img/logo-green-2x.png')} />
                </picture>
        
            </div>
            <div className="row">
                <div className="col-1-of-4">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <li className="footer__item"><Link to="" className="footer__link">Activities</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Contact us</Link></li>
                            <li className="footer__item"><Link to="" className="footer__link">Membership</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <li className="footer__item footer__link" onClick={() => { setLan('en') }} >English</li>
                            <li className="footer__item footer__link" onClick={() => { setLan('ar') }} >عربي</li>
                            <li className="footer__item footer__link" onClick={() => { setLan('kr') }} >کوردی</li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="footer__copyright">
                        <p>
                            {commonStrings.right}
                        </p>
                    </div>
                </div>
                <div className="col-1-of-4">
                    <div className="footer__copyright">
                        <p>
                            {commonStrings.dev}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
//© Copyright Rudaw 2019. All rights reserved.

// Privacy Policy Terms & Conditions
// © Copyright Rudaw 2019. All rights reserved.

//© جميع الحقوق محفوضة لـ رووداو 2019
// سياسة الخصوصية
// Lتم التصميم والتطوير من قب


// © مافی بڵاوکردنەوەی پارێزراوە بۆ رووداو 2019

// نهێنیپارێزی مەرجەکان
// لەلایەن Born Interactive دیزاین و دروستکراوە


export default Footer;