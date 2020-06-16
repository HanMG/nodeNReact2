const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) =>{
    

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) =>{
            if(err) return res.status(400).send(err)
            // 그 다음에 프론트에 다시 숫자 정보를 보내주기
            res.status(200).json({success: true, FavoriteNumber: info.length})
        })
})

router.post('/favorited', (req, res) =>{
    
    // 내가 이 영화를 favorite 리스트에 넣었는지 정보를 디비에서 가져오기
    
    Favorite.find({"movieId": req.body.movieId, "userFrom":req.body.userFrom})
        .exec((err, info) =>{
            if(err) return res.status(400).send(err)
            let result = false;
            if(info.length != 0){
                result = true
            }
            res.status(200).json({success: true, favorited: result})
        })
})

router.post('/addFromFavorite', (req, res) =>{
    // request 전체를 가지고 Favorite 모델 객체 생성 후 저장 
    const favorite = new Favorite(req.body)

    favorite.save((err, doc)=> {
        if(err) return res.status(400).send(err)
        return res.status(200).json({"success":true})
    })    
    
})

router.post('/removeFromFavorite', (req, res) =>{
   // Favorite 모델에서 movieId와 유저정보를 찾아서 삭제 
   Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err,doc) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({"success":true,doc})

        })
})

module.exports = router;
