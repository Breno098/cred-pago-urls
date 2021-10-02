export default function pacienteSelecionado(state = [], action){
    switch (action.type) {
        case 'ADD_PACIENTE':
            return action.paciente;
        default:
            return state;
    }

}
