const initialState = {
    movies: []
}

const types = {
    getMovies: "GET_MOVIES",
    filterMoviesByCategory: "FILTER_MOVIES_BY_CATEGORY"
}

export const GetMoviesAction = (data) => ({
    type: types.getMovies,
    data: data
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
            console.log(action.state)
            return {
                ...state,
                deleteAchat: {
                    ...state.deleteAchat,
                    state: action.state,
                    data: action.data == null ? null : action.data
                }
            }
        }
        default:
            return state;
    }
}

export default rootReducer