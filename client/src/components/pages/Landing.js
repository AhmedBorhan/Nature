import React from 'react'
import {
    Link
} from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import { LandingPage } from '../Strings'

function Landing() {
    
    const code = useStoreState(state => state.language.code);

    return (
        <>
            <header class="header">
                <div class="header__logo-box">
                    <img src={require("../../img/logo-white.png")} alt="Logo" class="header__logo" />
                </div>

                <div class="header__text-box">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main">Outdoors</span>
                        <span class="heading-primary--sub">is where life happens</span>
                    </h1>
                    <a href="#section-tours" class="btn btn--white btn--animated">Discover our tours</a>
                </div>
            </header>
            <main className={code === 'e'?"":"right_to_left"}>
                <section class="section-about">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">
                            {LandingPage.title}
                        </h2>
                    </div>

                    <div class="row">
                        <div class="col-1-of-2">
                            <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                            <p class="paragraph">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                                ducimus quam nisi exercitationem omnis earum qui.
                            </p>
                            <Link to="" class="btn-text">Learn more &rarr;</Link>
                        </div>
                        <div class="col-1-of-2">
                            <div class="composition">
                                <img src="https://cdn.pixabay.com/photo/2017/10/25/12/13/landscapes-2887796_960_720.jpg" alt="Photo 1" class="composition__photo composition__photo--p1" />
                                <img src="https://cdn.pixabay.com/photo/2017/10/25/12/13/landscapes-2887796_960_720.jpg" alt="Photo 2" class="composition__photo composition__photo--p2" />
                                <img src="https://cdn.pixabay.com/photo/2017/10/25/12/13/landscapes-2887796_960_720.jpg" alt="Photo 3" class="composition__photo composition__photo--p3" />
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-features">
                    <div class="row">
                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <h3 class="heading-tertiary u-margin-bottom-small">Explore the world</h3>
                                <p class="feature-box__text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                            </div>
                        </div>

                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <h3 class="heading-tertiary u-margin-bottom-small">Meet nature</h3>
                                <p class="feature-box__text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                            </div>
                        </div>

                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <h3 class="heading-tertiary u-margin-bottom-small">Find your way</h3>
                                <p class="feature-box__text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                            </div>
                        </div>

                        <div class="col-1-of-4">
                            <div class="feature-box">
                                <h3 class="heading-tertiary u-margin-bottom-small">Live a healthier life</h3>
                                <p class="feature-box__text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Landing;

