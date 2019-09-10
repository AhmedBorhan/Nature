import { action, thunk} from 'easy-peasy'
import axios from 'axios'
import { setAuthToken } from './private/SetToken'
import { ChangeLanguage } from './components/Strings'


//Thunks
const Login = thunk(async (actions, payload) => {
    try {
        const res = await axios.post('/api/admin/login',payload)
        const {token} = res.data
        localStorage.setItem('jwtToken', token);
        setAuthToken(token)
        actions.setAdmin(token)
        
    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }
    
})
const addActivity = thunk(async (actions, payload) => {
    try {
        const data = {
            title:{
                kr: payload.titleK,
                ar: payload.titleA,
                en: payload.titleE
            },
            description:{
                kr: payload.descriptionK,
                ar: payload.descriptionA,
                en: payload.descriptionE
            } ,
            location:{
                city: payload.city,
                street: payload.street
            }
        }
        const res = await axios.post('/api/activity/add', data)
        console.log('res', res.data)
        

    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }
})

const getActivity = thunk(async (actions, payload)=> {

})

const getActivities = thunk(async (actions, payload) => {

})
//Actions
const setError = action((state, error) =>{
    console.log('error :', error);
    state.error = error
})
const setAdmin = action((state, data) => {
    state.admin = data
    state.isAdmin = data.length>0
})
const setLanguage = action((state, code) => {
    console.log('code :', code);
    ChangeLanguage(code)
    state.code = code
})



const editActivity = action((state, activity) => {

})

const deleteActivity = action((state, activity) => {

})



//Models
const adminModel = {
    isAdmin: false,
    admin: "",
    Login,
    setAdmin,
};

const activityModel = {
    activity: {},
    activities: [],
    addActivity
};

const errorModel = {
    error: {},
    setError
}

const languageModel = {
    code:"en",
    setLanguage,
}

const storeModel = {
    auth: adminModel,
    activity: activityModel,
    language:languageModel,
    errors: errorModel

};


export default storeModel;