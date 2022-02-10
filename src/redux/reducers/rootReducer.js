const initialState = {
    movies: [],
    likedMoviesIds: [],
    dislikedMoviesIds: []
}

const types = {
    getMovies: "GET_MOVIES",
    filterMoviesByCategory: "FILTER_MOVIES_BY_CATEGORY",
    deleteMovie: "DELETE_MOVIE",
    likeMovie: "LIKE_MOVIE",
    dislikeMovie: "DISLIKE_MOVIE"
}

export const GetMoviesAction = (data) => ({
    type: types.getMovies,
    data: data
})

export const DeleteMovieAction = (id) => ({
    type: types.deleteMovie,
    id: id
})

export const LikeMovieAction = (id) => ({
    type: types.likeMovie,
    id: id
})

export const DislikeMovieAction = (id) => ({
    type: types.dislikeMovie,
    id: id
})

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getMovies: {
            console.log(types.getMovies)
            let nextState = {
                ...state,
                movies: action.data
            }
            console.log(nextState)
            return nextState
        }
        case types.filterMoviesByCategory: {
            console.log(action)
            return {
                ...state,
            }
        }
        case types.deleteMovie: {
            console.log(action)
            console.log(action.type)
            const moviesNew = state.movies.splice(state.movies.findIndex(item => item.id === action.id), 1)
            return {
                ...state,
                movies: moviesNew

            }
        }
        case types.likeMovie: {
            console.log(action)
            let moviesNew = state.movies
            let movieIndex = moviesNew.findIndex(item => item.id === action.id)
            let likes = state.likedMoviesIds
            !likes.includes(action.id) && likes.push(moviesNew[movieIndex].id)
            let dislikes = state.dislikedMoviesIds.filter( item => item !== action.id)
            console.log(dislikes)
            return {
                ...state,
                movies: moviesNew,
                likedMoviesIds: likes,
                dislikedMoviesIds: dislikes
            }
        }
        case types.dislikeMovie: {
            console.log(action)
            let moviesNew = state.movies
            let movieIndex = moviesNew.findIndex(item => item.id === action.id)
            let dislikes = state.dislikedMoviesIds
            !dislikes.includes(action.id) && dislikes.push(moviesNew[movieIndex].id)
            let likes = state.likedMoviesIds.filter(item => item !== action.id )
            console.log(likes)
            return {
                ...state,
                movies: moviesNew,
                likedMoviesIds: likes,
                dislikedMoviesIds: dislikes
            }
        }
        default:
            return state;
    }
}

export default rootReducer