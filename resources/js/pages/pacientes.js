import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import moment from 'moment';

export default function Pacientes () {
    const history = useHistory();
    const dispach = useDispatch();

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        loadPacientes();
    }, []);

    const loadPacientes = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

        window.axios.get(`${host}/api/pacientes`)
            .then(response => {
                dispach({ type: 'ADD_PACIENTES', pacientes: response.data });
                setPacientes(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const years = (birthDay) => {
        let diff = moment().diff(moment(birthDay),'years',true);
        return Math.floor( diff );
    }

    const infoPaciente = (paciente) => {
        dispach({ type: 'ADD_PACIENTE', paciente });

        history.push(`/paciente/${paciente.id}`);
    }

    return (
        <div>
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Pacientes</h1>

                <div className="col-lg-8 mx-auto">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">NOME</th>
                                <th scope="col">IDADE</th>
                                <th scope="col">TELEFONE</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { pacientes.map(paciente => (
                                <tr key={paciente.id}>
                                    <td>{paciente.nome}</td>
                                    <td>{years(paciente.data_nascimento)} anos</td>
                                    <td>{paciente.telefone}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => infoPaciente(paciente)}> Informações </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
