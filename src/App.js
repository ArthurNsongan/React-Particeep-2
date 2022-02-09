import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import  MoviesList from './pages/Movies';
import store from './redux/appStore';
import { Provider } from 'react-redux';
;


function App() {
  return (
    <Provider store={store}>
        <MoviesList/>
    </Provider>
  );
}

export default App;
