import { action, thunk } from 'easy-peasy'
import axios from 'axios'
import { setAuthToken } from './private/SetToken'
import { ChangeLanguage } from './components/Strings'


//Thunks
const Login = thunk(async (actions, payload) => {
    try {
        const res = await axios.post('/api/admin/login', payload)
        const { token } = res.data
        localStorage.setItem('jwtToken', token);
        setAuthToken(token)
        actions.setAdmin(token)

    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }

})
const addActivity = thunk(async (actions, payload) => {
    let vid = []
    if(payload.video1)  vid.push(payload.video1) 
    if(payload.video2)  vid.push(payload.video2) 
    if(payload.video3)  vid.push(payload.video3) 
    try {
        const data = {
            title: {
                kr: payload.titleK,
                ar: payload.titleA,
                en: payload.titleE
            },
            description: {
                kr: payload.descriptionK,
                ar: payload.descriptionA,
                en: payload.descriptionE
            },
            location: {
                city: payload.city,
                street: payload.street
            },
            videos: vid,
            images: payload.images
        }
        let res;
        console.log("adddddddddddddddddddddddddddddddddd")
        if (payload.from === 'add')  res = await axios.post('/api/activity/add', data)
        else res = await axios.post(`/api/activity/edit/${payload._id}`, data )
        console.log('res', payload)


    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }
})

const getActivity = thunk(async (actions, id) => {
    try {
        const res = await axios.get(`/api/activity/${id}`, id)
        actions.setActivity(res.data)

    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }
})

const getActivities = thunk(async (actions, payload) => {
    try {
        const res = await axios.get('/api/activity')
        actions.setActivities(res.data)

    } catch (error) {
        console.log('error 0 :', error);
        actions.setError(error)
    }
})

const deleteActivity = thunk(async (actions, payload) => {
    const res = await axios.delete('api/activity/payload')
    console.log('Deleted')
})

//Actions
const setError = action((state, error) => {
    console.log('error :', error);
    state.error = error
})
const setAdmin = action((state, data) => {
    state.admin = data
    state.isAdmin = data.length > 0
})
const setLanguage = action((state, code) => {
    console.log('code :', code);
    ChangeLanguage(code)
    state.code = code
})

const setActivity = action((state, activity) => {
    console.log('activty ', activity )
    state.activity = activity
})

const setActivities = action((state, activity) => {
    console.log('activties ', activity)
    state.activities = activity
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
    error: {},
    setError,
    addActivity,
    getActivity,
    setActivity,
    getActivities,
    setActivities,
    deleteActivity
};

const languageModel = {
    code: localStorage.getItem('lan') || "",
    setLanguage,
}

const storeModel = {
    auth: adminModel,
    activity: activityModel,
    language: languageModel
};


export default storeModel;