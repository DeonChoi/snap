import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import '../styles/Collection.css';

const Collection = (props) => {

    if (!localStorage.getItem('auth-token')) {
        props.history.push('../user/login');
    }

    const [photos, setPhotos] = useState([]);
    const [show, setShow] = useState(false);

    useEffect( () => {
        getPhotoIDs();
    }, [photos]);

    const showModal = () => {
        setShow(true);
        const timer = setTimeout(() => {
            hideModal();
        }, 700);
    };
    const hideModal = () => {
        setShow(false);
    };
    const getPhotoIDs =  async () => {
        await axios.get('/collection/get', { headers:  {'auth-token': localStorage.getItem('auth-token') } })
        .then( res => {
            // console.log(res.data);
            setPhotos(res.data);

        })
        .catch( err => {
            console.log(err);
        });
    };

    const deletePhoto =  (id) => {
        axios.delete('/collection/' + id, { headers:  {'auth-token': localStorage.getItem('auth-token') } })
            .then( res => {console.log(res.data);})
            .catch(err => console.log(err));
        setPhotos( photos.filter( elem => elem._id !== id));
        showModal();
    };

    return (
        <div>
            {
                show
                ? <div id='modal'>Photo Deleted...</div>
                : ''
            }
            {
                photos.length === 0 
                ? <div className='noResults'>No Photos Saved</div>
                : photos.map( photo => 
                    <section key={photo._id} className='imageCard'>
                    <LazyLoad offsetBottom={10} onContentVisible={() => console.log('I have been lazyloaded!')} className='lazyload'>
                        <img src={photo.photoData.urls.full} onClick={ () => console.log(photo)} className='mainImage' alt={photo.photoData.alt_description}></img>
                    </LazyLoad>
                        <button href='' onClick={ () => deletePhoto(photo.photoID)} className='addButton'>X</button>
                        <div className='separationBar'/>
                    </section>
                )
            }

        </div>
    );
};

export default Collection;
