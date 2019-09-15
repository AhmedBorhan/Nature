import React, {useEffect} from 'react'
import { useStoreState,  useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery';
import {commonStrings} from '../Strings'
import "react-image-gallery/styles/css/image-gallery.css"

function Activity({location , match}) {
    const code = useStoreState(state => state.language.code);   
    const activity = useStoreState(state => state.activity.activity);   
    const getActivity = useStoreActions(state => state.activity.getActivity)
    useEffect(() => {
        console.log('object id is', match.params.id)
        getActivity(match.params.id)
    }, [])
    const _renderVideo = (item) => {
        return (
            <div className='image-gallery-image'>
                {
                    true ?
                        <div className='video-wrapper'>
                            <a className='close-video'></a>
                            <iframe
                                width='560'
                                height='315'
                                src={item.embedUrl}
                                frameBorder='0'
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        :
                        <a>
                            <div className='play-button'></div>
                            <img src={item.original} />
                        </a>
                }
            </div>
        );
    }
    console.log('activity :', activity);
    const images = [] 
    let found = true
    if(activity.images) {
        activity.images.map((img) =>{
            images.push({
                original: img.url,
                thumbnail: img.url,
            })
        })
    }else found = false
    const images1 = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
            renderItem: _renderVideo
        }]


    return found?(
        <div className={code === 'e'?"":"right_to_left"}>
            <div className="margin">
                <Link to=""><h1>edit</h1></Link>
                <h1>Siiiiiiiiiiiiiiiiiivaaaaaaaaaaaaaaaaaaaaaaaaaaaaan</h1> 
                <h2>slemani</h2>
                <h2>1/1/1/1/1</h2>
                <br></br>
            </div>           
            <ImageGallery 
                items={images} 
                lazyLoad={false}
                infinite={true}
                showBullets={false}
                showFullscreenButton={true}
                showPlayButton={true}
                showThumbnails={true}
                showIndex={false}
                showNav={true}
                isRTL={code === 'e' ? false : true}
                additionalClass="app-image-gallery"
            />
            <br></br>
            <p className="font_size margin">this is dumb and stupid, because me and ahmad made it.
                so people who use this website, are stupid like donald trump, has big bun like kim kardashian.
            </p>
            <h2>1 viw</h2>
            <div className={code === 'e' ? "btn__holder en_font" : "btn__holder right_to_left"}>
                <button className="btn btn--green" type="submit" >{commonStrings.edit}</button>
                <button className="btn btn--white--green" >{commonStrings.delete}</button>
            </div>
            <br></br>
        </div>
    ):(
        <div>
            <h1>Not found</h1>
        </div>
    )
}

export default Activity
