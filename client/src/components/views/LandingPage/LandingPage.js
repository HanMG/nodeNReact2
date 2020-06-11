import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';


function LandingPage() {

    const [Moives, setMovies] = useState([])
    const [MainMoiveImage, setMainMovieImage] = useState(null)

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
        .then(response => response.json())        
        .then(response => {
            console.log(response)
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
        })
    },[])

    return (
        <div style={{width:'100%',margin:'0'}}>

            {/*Main Image*/}
            {MainMoiveImage &&
                <MainImage
                image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
                title={MainMoiveImage.original_title}
                text={MainMoiveImage.overview}
                />
            }

            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/* Moive Grid Cards*/}
                
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
