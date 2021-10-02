export default function pacientes(state = [], action){
    switch (action.type) {
        case 'ADD_PACIENTES':
            return action.pacientes;
        default:
            return state;
    }

}
