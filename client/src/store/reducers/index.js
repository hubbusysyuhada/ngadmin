import { combineReducers } from 'redux'
const { SPTKeluarReducer } = require('./SPTReducer')
const { SuratKeluarReducer } = require('./SuratKeluarReducer')
const { SuratMasukReducer } = require('./SuratMasukReducer')
const { UndanganMasukReducer } = require('./UndanganMasukReducer')
const { AuthReducer } = require('./AuthReducer')

export default combineReducers({
    AuthReducer,
    SPTKeluarReducer,
    SuratKeluarReducer,
    SuratMasukReducer,
    UndanganMasukReducer
})