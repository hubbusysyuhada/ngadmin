import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { USER_LOGIN, FETCH_SURAT_MASUK } from './store/actions'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.AuthReducer.loggedUser)
  useEffect(() => {
    dispatch(FETCH_SURAT_MASUK())
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
