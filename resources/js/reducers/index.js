import { combineReducers } from 'redux';

import pacientes from './pacientes';
import pacienteSelecionado from './pacienteSelecionado';

export default combineReducers({
    pacientes,
    pacienteSelecionado
});
