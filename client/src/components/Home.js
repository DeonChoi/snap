import React, {useEffect, useState} from 'react';
import '../styles/Home.css';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';

const Home = (props) => {
    const ACCESS_KEY = '4ed9290a2a5bb9699d9a09cbbf8a998e5782e427f9d34c609d15a488ac533983';

    const [homeImages, setHomeImages] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
      getHomeImages();
    }, []);
    
    const getHomeImages = async () => {
      const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=250&query=london&client_id=${ACCESS_KEY}`);
      const data = await response.json();
      console.log(data.results);
      setHomeImages(data.results);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const getSearch = async (e) => {        
        e.preventDefault();
        const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=250&query=${search}&client_id=${ACCESS_KEY}`);
        const data = await response.json();
        console.log(data.results);
        setHomeImages(data.results);
        setSearch('');
    };
    const savePhoto = async (e) => {
        if (!localStorage.getItem('auth-token')) {
            props.history.push('/user/login');
        }

        e.preventDefault();
        const newPhoto = {
            savedPhotoID: e.currentTarget.value
        };
        console.log(e.currentTarget.value);
        
        const headers = {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        };

        await axios.post('/collection/add', newPhoto, headers)
                .then( res => console.log(res))
                .catch( err => console.error(err));
    };


    return(
        <div>
            <form className='searchForm' onSubmit={getSearch}>
                <input type='text' placeholder='Search' name='search' className='searchBar' onChange={handleSearch} value={search}/>
                <button type='submit'><i className='fa fa-search searchButton'></i></button>
            </form>

            {
                homeImages.length === 0 
                ? <div>No Results Found</div>
                : homeImages.map( homeImage => (
                        <section key={homeImage.id} className='imageCard'>
                            <LazyLoad offsetBottom={10} onContentVisible={() => console.log('I have been lazyloaded!')} className='lazyload'>
                                <img src={homeImage.urls.full} className='mainImage' alt={homeImage.alt_description} />
                            </LazyLoad>
                            <button type='button' className='addButton' onClick={savePhoto} value={homeImage.id}>+</button>
                            <div className='separationBar'/>
                        </section>
                ))
            }
        </div>
         
    );
   
};

export default Home;