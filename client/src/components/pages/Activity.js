import React from 'react'
import { useStoreState } from 'easy-peasy'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

function Activity() {
    const code = useStoreState(state => state.language.code);
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];
    return (
        <div className={code === 'e'?"":"right_to_left"}>
            <div className="margin">
                <h1>Siiiiiiiiiiiiiiiiiivaaaaaaaaaaaaaaaaaaaaaaaaaaaaan</h1> 
                <h2>slemani</h2>  
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
            <br></br>
        </div>
    )
}

export default Activity
