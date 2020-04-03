import React, { useState, useEffect } from 'react'
import MyInput from '../comp/InputGroup'
import { useStoreState, useStoreActions } from 'easy-peasy'
import axios from 'axios'
import { commonStrings, addPage } from '../Strings'

function Edit({ location, match }) {
    const code = useStoreState(state => state.language.code);
    const Add = useStoreActions(state => state.activity.addActivity);
    const Delete = useStoreActions(state => state.activity.deleteActivity);
    const activity = useStoreState(state => state.activity.activity);
    const getActivity = useStoreActions(state => state.activity.getActivity)
    //api/activity/:id
    useEffect(() => {
        console.log('object id is', match.params.id)
        
        getActivity(match.params.id)
        console.log('activity', activity)
    }, [])

    useEffect(() => {
        if(typeof activity === 'object' && Object.keys(activity).length !== 0){
            console.log('activity 1 ', activity)
            setstate({
                _id:activity._id,
                titleK: activity.title['kr'],
                titleA: activity.title['ar'],
                titleE: activity.title['en'],
                descriptionK: activity.description['kr'],
                descriptionA: activity.description['ar'],
                descriptionE: activity.description['en'],
                city: activity.location.city,
                street: activity.location.street,
                images: activity.images
            })
        }
        
    }, [activity])

    // when an image is selected to upload 
    const onUpload = async (e) => {
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
            setstate({ ...state, images: [...state.images, ...res.data] })
        } catch (error) {
            console.log('error', error)
        }
    }

    const onDelete = (e) => {
        let index = e.target.name;
        try {
            //const data = {name : state.images[0].name}
            axios.delete(`/api/activity/image/${state.images[index].name}`)
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
        from:"edit",
        _id:"",
        titleK: "",
        titleA: "",
        titleE: "",
        descriptionK: "",
        descriptionA: "",
        descriptionE: "",
        city: "",
        street: "",
        images: [],
        video1: "",
        video2: "",
        video3: ""
        
    }
    const [state, setstate] = useState(initialState)

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const onAdd = (e) =>{
        e.preventDefault()
        Add(state)
        
    }

    return (
        <form onSubmit={onAdd} >
            <div class="background aa_bg">
            </div>
            <div className={code === 'e' ? "row" : "row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>{addPage.title}</h1>
                    <MyInput
                        type="text"
                        placeholder="سەردێڕ"
                        value={state.titleK}
                        name="titleK"
                        onChange={onChange}
                        required={false}
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
                    <h1>{addPage.location}</h1>
                    <MyInput
                        type="text"
                        placeholder={commonStrings.city}
                        value={state.city}
                        name="city"
                        onChange={onChange}
                        required={true}
                    />
                    <MyInput
                        type="text"
                        placeholder={commonStrings.street}
                        value={state.street}
                        name="street"
                        onChange={onChange}
                        required={true}
                    />
                </div>
            </div>
            <div className={code === 'e' ? "row" : "row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>{addPage.description}</h1>
                    <textarea className="form__input"
                        value={state.descriptionK}
                        name="descriptionK" onChange={onChange}
                        placeholder="درێژەی بابەتەکە" required rows="4" cols="50">
                    </textarea>
                    <textarea className="form__input"
                        value={state.descriptionA}
                        name="descriptionA" onChange={onChange}
                        placeholder="تفاصيل الموضوع" required rows="4" cols="50">
                    </textarea>
                    <textarea className="form__input"
                        value={state.descriptionE}
                        name="descriptionE" onChange={onChange}
                        placeholder="Description" required rows="4" cols="50">
                    </textarea>
                </div>
                <div class="col-1-of-2">
                    <h1>{addPage.youtube}</h1>
                    <MyInput
                        type="text"
                        placeholder="url"
                        value={""}
                        name="video1"
                        onChange={onChange}

                    />
                    <MyInput
                        type="text"
                        placeholder="url"
                        value={""}
                        name="video2"
                        onChange={onChange}

                    />
                    <MyInput
                        type="text"
                        placeholder="url"
                        value={""}
                        name="video3"
                        onChange={onChange}

                    />
                </div>
            </div>
            <div className={code === 'e' ? "row" : "row right_to_left"}>
                <div class="col-1-of-2">
                    <h1>{addPage.image}</h1>
                    <div className="product_properties">
                        <input type="file" name="file" id="file" accept="image/*" multiple className="inputfile" onChange={onUpload} />
                        <label className="btn btn--green" htmlFor="file">{addPage.choose}</label>
                    </div>
                </div>
                <div class="col-1-of-2 img_wrapper">
                    {state.images.map((image, index) => (
                        <div className="request-form-img" key={index} >
                            <img className="item-img " src={image.url} className="avatar img-circle" alt="" />
                            <div onClick={onDelete} >
                                <img className="request-form-img-delete" src={require("../../img/rate w copy 2.png")} name={index + ""} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={code === 'e' ? "btn__holder en_font" : "btn__holder right_to_left"}>
                <button className="btn btn--green" type="submit" >{commonStrings.save}</button>
                <button className="btn btn--white--green" onClick = {() =>{Delete(state._id)}} >{commonStrings.delete}</button>
            </div>
        </form>
    )
}

export default Edit
