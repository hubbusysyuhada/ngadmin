import { combineReducers } from 'redux'
import SPTKeluarReducer from './SPTReducer'
import SuratKeluarReducer from './SuratKeluarReducer'
import SuratMasukReducer from './SuratMasukReducer'
import UndanganMasukReducer from './UndanganMasukReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
    AuthReducer,
    SPTKeluarReducer,
    SuratKeluarReducer,
    SuratMasukReducer,
    UndanganMasukReducer
})