import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { movies$ } from '../../services/movies';
import { DeleteMovieAction, DislikeMovieAction, GetMoviesAction, LikeMovieAction } from '../../redux/reducers/rootReducer';
import Pagination from '../../components/Pagination';
import Select from 'react-select';

const MoviesList = (props) => {

    useEffect(() => {
      console.log(props);
      movies$.then((response) => {
          props.getMovies(response);
      }).catch((error) => {
          console.log(error);
      })
    });

    const perPageOpts = [2, 3, 5];
    const [perPage, setPerPage] = useState(perPageOpts[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        console.log(props.movies);
    }, [props.movies])

    useEffect(() => {
        console.log(selectedCategories)
        setCurrentPage(1)
    }, [selectedCategories])

    const categoriesList = []
        props.movies.filter( item => { 
            if( !categoriesList.includes(item.category) ) { categoriesList.push(item.category); return false } 
    })

    const currentMovies = () => selectedCategories.length > 0 ? 
        props.movies.filter(item => selectedCategories.includes(item.category)) :
        props.movies

    const likedIt = (id) => (props.likedMoviesIds.includes(id));

    const dislikedIt = (id) => (props.dislikedMoviesIds.includes(id));
    

    return (
        <div className='container-fluid MoviePage bg-dark min-vh-100'>
            <div className='row pt-3 px-3'>
                <h2 className=' text-warning fw-bold'>Movie <span className='text-white fs-2'>Store</span></h2>
            </div>
            <hr className='bg-light' />
            <div className='row justify-content-center'>
                <div className='p-2 d-flex justify-content-between text-white'>
                    <div className='py-2 me-3'>
                        <span className='h5 bold d-block'>Nombre d'éléments</span>
                        <select onChange={(e) => setPerPage(parseInt(e.target.value))} style={{ width: '75px'}}className='form-select bg-transparent border-white shadow-0 text-white outline-none'>
                           { perPageOpts.map((e) => <option className='bg-white text-dark' selected={perPage === e}>{e}</option>)}
                        </select>
                    </div>
                    <div className='py-2 d-flex align-items-end flex-column me-3'>
                        <span className='h5 bold d-block'>Catégories</span>
                        {/* <select className='form-select bg-transparent text-white'>
                            { categoriesList.map((e) => <option className='bg-white text-dark'>{e}</option>)}
                        </select> */}
                        <Select className='bg-transparent text-dark' isMulti onChange={(values) => {
                            setSelectedCategories([...values.map(e => e.value)]);
                            setCurrentPage(1);
                        }}
                            placeholder="Toutes les catégories"
                            options={[...categoriesList.map((e) => ({value: e, label: e}) )]}
                        />
                    </div>
                </div>
                <Pagination currentPage={currentPage} total={currentMovies().length} perPage={perPage} onChanged={(currentPage) => {
                    setCurrentPage(currentPage);
                }}/>
                <div className='MoviesContainer px-3'>
                    {props.movies?.length === 0 ? 
                    <div style={{ display: 'flex', padding: '30px 50px', borderRadius: '20px', backgroundColor: "darkgray", width: '100%', justifyContent: "center", alignItems: 'center'}}>
                        <div class="spinner-border text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> 
                    </div>
                    :
                    <>
                        { currentMovies().slice( (currentPage - 1 ) * perPage , currentPage * perPage ).map((item) => 
                            <div className='text-white MovieCard  position-relative'>
                                <img src='/film-poster.jpg' alt={item.title} width="100%" />
                                <button className='position-absolute btn btn-dark p-1 rounded-circle d-flex align-items-center justify-content-center' 
                                    style={{right: '20px', top: '20px', width: "40px", height: "40px"}}><span className='fs-4'
                                    onClick={() => { props.deleteMovie(item.id) }}>&times;</span></button>
                                {likedIt(item.id) && <h6 className='p-2 rounded-bottom rounded-0 bg-success bold'>Vous aimez ce film !</h6>}
                                {dislikedIt(item.id) && <h6 className='p-2 rounded-bottom rounded-0 bg-danger bold'>Pas votre genre du tout !</h6>}
                                <div className='MovieCardFooter'>
                                    <h5 className='bold'>{item.title}</h5>
                                    <span className='bold bg-warning text-dark px-2 rounded-3 py-1'>{item.category}</span>
                                    <div className='d-flex my-2'>
                                        <button className='fs-6 fw-bold w-50 me-1 btn btn-primary'
                                            onClick={() => props.likeMovie(item.id)} 
                                            disabled={likedIt(item.id)}>Likes ({likedIt(item.id) ? item.likes + 1 : item.likes})</button>
                                        <button className='fs-6 fw-bold ms-1 w-50 btn btn-danger' 
                                            onClick={() => props.dislikeMovie(item.id)} 
                                            disabled={dislikedIt(item.id)}>Dislikes ({dislikedIt(item.id) ? item.likes + 1 : item.likes})</button>
                                    </div>
                                </div>
                            </div>)}
                    </>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    movies: state.movies,
    likedMoviesIds: state.likedMoviesIds,
    dislikedMoviesIds: state.dislikedMoviesIds,
});

const mapDispatchToProps = (dispatch) => ({
    getMovies: (movies) => dispatch(GetMoviesAction(movies)),
    deleteMovie: (id) => dispatch(DeleteMovieAction(id)),
    likeMovie: (id) => dispatch(LikeMovieAction(id)),
    dislikeMovie: (id) => dispatch(DislikeMovieAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
