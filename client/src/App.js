import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, StoreProvider} from 'easy-peasy'
import { ChangeLanguage } from './components/Strings'
import PrivateRoute from './private/PrivateRoute'
import model from './store'
import './css/style.css'

//layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

//pages
import Landing from './components/pages/Landing'
import Activity from './components/pages/Activity'
import Edit from './components/pages/Edit'
import Activities from './components/pages/Activities'
import Membership from './components/pages/Membership'
import About from './components/pages/About'
import Add from './components/pages/Add'
import Login from './components/pages/Login'

//actions
if(localStorage.getItem("lan")){
    ChangeLanguage(localStorage.getItem('lan'));
}

const store = createStore(model)

function App() {
    return (
        <StoreProvider store={store} >
            <Router>
                <Route path="/" component={Navbar} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/membership" component={Membership} />
                <Route exact path="/activity/:id" component={Activity} />
                <Route exact path="/edit/:id" component={Edit} />
                <Route exact path="/activities" component={Activities} />
                <Route exact path="/add" component={Add} />
                <Route exact path="/login" component={Login} />
                <Route path="/" component={Footer} />
            </Router>
        </StoreProvider> 
    );
}

export default App;
