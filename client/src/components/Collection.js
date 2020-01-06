import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import '../styles/Collection.css';

const Collection = (props) => {
    const ACCESS_KEY = '4ed9290a2a5bb9699d9a09cbbf8a998e5782e427f9d34c609d15a488ac533983';

    if (!localStorage.getItem('auth-token')) {
        props.history.push('../user/login');
    }

    const [photos, setPhotos] = useState([]);

    useEffect( () => {
        getPhotoIDs();
    }, []);


    let photoids;

    const getPhotoIDs =  async () => {
        await axios.get('http://localhost:3000/collection/get', { headers:  {'auth-token': localStorage.getItem('auth-token') } })
        .then( res => {
            photoids = res.data;
            console.log(photoids);
            let fetchUrls = [];
            photoids.forEach( photo => {
                fetchUrls.push(`https://api.unsplash.com/photos/${photo.photoID}?client_id=${ACCESS_KEY}`)
            });
        
            Promise.all(
                fetchUrls.map( url => 
                    fetch(url)
                        .then( response => response.json())
                        .catch(err => console.log(err))
                )
            )
            .then( picture => setPhotos(picture))
            .catch(err => console.log(err));

        })
        .catch( err => {
            console.log(err);
        });
    };

    const deletePhoto =  (id) => {
        axios.delete('http://localhost:3000/collection/' + id, { headers:  {'auth-token': localStorage.getItem('auth-token') } })
            .then( res => {console.log(res.data); window.location.reload();})
            .catch(err => console.log(err));
        setPhotos( photos.filter( elem => elem._id !== id));
    };

    return (
        <div>
            {
                photos.map( photo => 
                    <section key={photo.id} className='imageCard'>
                    <LazyLoad offsetBottom={10} onContentVisible={() => console.log('I have been lazyloaded!')} className='lazyload'>
                        <img src={photo.urls.full} onClick={ () => console.log(photo)} className='mainImage' alt={photo.alt_description}></img>
                    </LazyLoad>
                        <button href='' onClick={ () => deletePhoto(photo.id)} className='addButton'>X</button>
                        <div className='separationBar'/>
                    </section>
                )
            }

        </div>
    );
};

export default Collection;
