import React from 'react'
import { useStoreState } from 'easy-peasy'
import { aboutPage } from '../Strings'

function About() {

    useStoreState(state => state.language.code);
    // const setLan = useStoreActions(state => state.language.setLanguage);
    
    return (
        <div>
            <h1>{aboutPage.title}</h1>
            <p>{aboutPage.text}</p>
           
        </div>
    )
}

export default About
