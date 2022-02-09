import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { movies$ } from '../../movies';
import { GetMoviesAction } from '../../redux/reducers/rootReducer';

const MoviesList = (props) => {

    useEffect(() => {
      console.log(props);
      movies$.then((response) => {
          props.getMovies(response);
      }).catch((error) => {
          console.log(error);
      })
    });

    useEffect(() => {
        console.log(props.movies);
    }, [props.movies])
    
    return (
        <div className='container-fluid bg-dark min-vh-100'>
            <div className='row pt-3 px-3'>
                <h2 className=' text-warning fw-bold'>Movie <span className='text-white fs-2'>Store</span></h2>
            </div>
            <hr className='bg-light' />
            <div className='row'>
                <div className='px-3'>
                    {props.movies?.length === 0 ? <div class="spinner-border text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>
                        { props.movies.map((item) => <h1 className='text-white'>{item.title}</h1>)}
                    </>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
    getMovies: (movies) => dispatch(GetMoviesAction(movies))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
