import React,{useState} from 'react'
import MyInput from '../comp/InputGroup'
import { useStoreState, useStoreActions } from 'easy-peasy'
import axios from 'axios'

function Add() {
    const code = useStoreState(state => state.language.code);
    const Add = useStoreActions(state => state.activity.addActivity);

    // when an image is selected to upload 
    const onUpload = async(e) => { 
        const data = new FormData()
        console.log('files  :', e.target.files);
        let i = 0;
        while (i < e.target.files.length && i < (15 - state.images.length)) {
            data.append('activityImage', e.target.files[i])
            i++;
        }
        data.append('name', 'activityImage')
        data.append('description', 'request images')
        try {
            const res = await axios.post('/api/activity/upload', data)
            setstate({ ...state, images: [...state.images , ...res.data]})
        } catch (error) {
            console.log('error', error)
        }
    }

    const onDelete = (e) => {
        let index = e.target.name;
        try {
            //const data = {name : state.images[0].name}
            const res =  axios.delete(`/api/activity/image/${state.images[index].name}`)
            console.log('images', state.images)
        } catch (error) {
            console.log('error :', error);
        }
        console.log("e name =  " + e.target.name)
        var newImages = state.images
        newImages.splice(index, 1);
        setstate({ ...state, images: newImages })
    }

    const initialState = {
        titleK: "",
        titleA: "",
        titleE: "",
        descriptionK: "",
        descriptionA: "",
        descriptionE: "",
        city: "",
        street: "",
        images:[]
    }
    const [state, setstate] = useState(initialState)

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className={code === 'e'?"row":"row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>Add activity you son of gun</h1>
                    <MyInput
                        type="text"
                        placeholder="سەردێڕ"
                        value={state.titleK}
                        name="titleK"
                        onChange={onChange}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder="مقدیمە"
                        value={state.titleA}
                        name="titleA"
                        onChange={onChange}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder="Title"
                        value={state.titleE}
                        name="titleE"
                        onChange={onChange}
                        required={true}
                    />
                </div>
                <div class="col-1-of-2">
                <h1>Location</h1>
                    <MyInput
                        type="text"
                        placeholder="shar"
                        value={state.city}
                        name="city"
                        onChange={onChange}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder="garak"
                        value={state.street}
                        name="street"
                        onChange={onChange}
                        required={true}
                    />
                </div>
            </div>
            <div className={code === 'e'?"row":"row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>Add activity you son of gun</h1>
                    <textarea className="form__input" 
                        value={state.descriptionK} 
                        name="descriptionK" onChange={onChange} 
                        placeholder="درێژەی بابەتەکە" required  rows="4" cols="50">
                    </textarea>
                    <textarea className="form__input" 
                        value={state.descriptionA} 
                        name="descriptionA" onChange={onChange} 
                        placeholder="تفاصيل الموضوع" required  rows="4" cols="50">
                    </textarea>
                    <textarea className="form__input" 
                        value={state.descriptionE} 
                        name="descriptionE" onChange={onChange} 
                        placeholder="Description" required  rows="4" cols="50">
                    </textarea>
                </div>
                <div class="col-1-of-2">
                    <h1>linked links of the activity:</h1>
                    <MyInput
                        type="text"
                        placeholder="youtube"
                        value={""}
                        name="name"
                        onChange={() =>{}}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder="more youtube"
                        value={""}
                        name="name"
                        onChange={() =>{}}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder="no more youtube"
                        value={""}
                        name="name"
                        onChange={() =>{}}
                        required={true}
                    />
                </div>
            </div>
            <div className={code === 'e'?"row":"row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>select photos of the activity:</h1>
                    <div className="product_properties">
                        <input type="file" name="file" id="file" accept="image/*" multiple className="inputfile" onChange={onUpload} />
                        <label className="btn btn--green" htmlFor="file">Choose Photo</label>
                    </div>
                </div>
                <div class="col-1-of-2 img_wrapper">
                    {state.images.map((image , index) =>(
                        <div className="request-form-img" key={index} >
                            <img className="item-img " src={image.url} className="avatar img-circle" alt="avatar" />
                            <div onClick={onDelete} >
                                <img className="request-form-img-delete" src={require("../../img/rate w copy 2.png")} name={index + ""} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={code === 'e'?"btn__holder en_font":"btn__holder right_to_left"}>
                <button className="btn btn--green" onClick={() =>{Add(state)}} >Add</button>
                <button className="btn btn--white--green" >Cancel</button>
            </div>
        </>
    )
}

export default Add
