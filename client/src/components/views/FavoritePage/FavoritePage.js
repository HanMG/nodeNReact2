import React, {useEffect, useState} from 'react'
import './favorite.css'
import Axios from 'axios'
import {Button, Popover} from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
            .then(response =>{
                if(response.data.success){
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                }else{
                    alert("영화 정보를 가져오는데 실패 했습니다.")
                }

            })
    }, [])

    const fetchFavoredMovie = () =>{
        Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
            .then(response =>{
                if(response.data.success){
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                }else{
                    alert("영화 정보를 가져오는데 실패 했습니다.")
                }

            })
    }

    const  renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "NO IMAGE"
                }
            </div>
        )

        return <tr key = {index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>
    })

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite',variables)
            .then(response => {
                if(response.data.success){
                    fetchFavoredMovie()
                }else{
                    alert("리스트에서 지우지 못했습니다.")
                }
            })
    }

    return (
        <div>
            <div style={{ width: '85%', margin: '3rem auto'}}>
                <h2>Favorite Movies</h2>
                <hr/>

                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>Remove From Favorite</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default FavoritePage
