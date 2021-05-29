import './App.css';
import '@fontsource/roboto'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Auth from './pages/Auth'
import SuratMasuk from './pages/SuratMasuk'
import UndanganMasuk from './pages/UndanganMasuk'
import SuratKeluar from './pages/SuratKeluar'
import SPT from './pages/SPT'
import User from './pages/User'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth">
            <Auth/>
          </Route>
          <Route path="/suratmasuk">
            <SuratMasuk/>
          </Route>
          <Route path="/suratkeluar">
            <SuratKeluar/>
          </Route>
          <Route path="/undanganmasuk">
            <UndanganMasuk/>
          </Route>
          <Route path="/spt">
            <SPT/>
          </Route>
          <Route path="/user">
            <User/>
          </Route>
          <Route path="/">
            <Redirect
              to='/suratmasuk'
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;