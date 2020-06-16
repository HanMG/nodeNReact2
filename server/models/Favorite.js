const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    // 누가 좋아요를 했는지
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 어떤 영화를 좋아하는지 해당 영화 아이디
    movieId: {
        type: String
    },
    // 타이틀
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    // 영화 시간
    movieRunTime: {
        type: String
    }
},{timestamps: true})

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = { Favorite }