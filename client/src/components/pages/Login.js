import React,{useState} from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import MyInput from '../comp/InputGroup'

function Login() {

    const loginAdmin = useStoreActions(actions => actions.auth.Login);


    const initialState = {
        name:"",
        password:""
    }
    const [state, setstate] = useState(initialState)

    const onChange = (e) =>{
        setstate({ ...state, [e.target.name]:e.target.value})
    }

    return (
        <section className="section-book">
            <div className="row">
                <div className="book">
                    <div className="book__form">
                        <form className="form" onSubmit={(e) =>{
                            e.preventDefault()
                            const data ={
                                name:state.name,
                                password:state.password
                            }
                            loginAdmin(data)
                        }} >
                            <div className="u-margin-bottom-medium">
                                <h2 className="heading-secondary">Login</h2>
                            </div>
                            <MyInput
                                type="text"
                                placeholder="User Name"
                                value={state.name}
                                name="name"
                                onChange={onChange}
                                required={true}
                            />
                            <MyInput
                                type="password"
                                placeholder="Password"
                                value={state.password}
                                name="password"
                                onChange={onChange}
                                required={true}
                            />
                            <div className="form__group">
                                <button className="btn btn--green" >Next step &rarr;</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;

