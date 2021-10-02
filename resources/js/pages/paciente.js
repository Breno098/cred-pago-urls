import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import moment from 'moment';

export default function Paciente ({ match }) {
    const history = useHistory();
    const dispach = useDispatch();

    const pacienteSelecionado = useSelector(state => state.pacienteSelecionado );

    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        if(typeof pacienteSelecionado.id !== 'undefined'){
            setPaciente(pacienteSelecionado);
        } else if(match.params.id){
            loadPaciente();
        }
    }, []);

    const loadPaciente = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

        window.axios.get(`${host}/api/paciente/${match.params.id}`)
            .then(response => {
                dispach({ type: 'ADD_PACIENTE', paciente: response.data });
                setPaciente(response.data);
            }).catch(error => {
                history.push(`/`);
            });
    }

    const years = (birthDay) => {
        return Math.floor( moment().diff(moment(birthDay),'years',true));
    }

    const formatBirdDay = (birthDay) => {
        return moment(birthDay).format('DD/MM/YYYY');
    }

    return (
        <div>
            <div className="px-4 py-5 my-5">
                <h1 className="display-5 fw-bold text-center"> { paciente.nome } </h1>

                <div className="row">
                    <div className="col-8 mx-auto">
                        <label htmlFor="nome" className="form-label">NOME</label>
                        <input className="form-control" id="nome" defaultValue={paciente.nome} readOnly/>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-4 ml-auto">
                        <label htmlFor="data_nascimento" className="form-label">DATA DE NASCIMENTO</label>
                        <input className="form-control" id="data_nascimento" defaultValue={formatBirdDay(paciente.data_nascimento)} readOnly/>
                    </div>
                    <div className="col-4 mr-auto">
                        <label htmlFor="idade" className="form-label">IDADE</label>
                        <input className="form-control" id="idade" value={years(paciente.data_nascimento)} readOnly/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 mx-auto">
                        <label htmlFor="telefone" className="form-label">TEFELONE</label>
                        <input className="form-control" id="telefone" defaultValue={paciente.telefone} readOnly/>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-4 ml-auto">
                        <label htmlFor="tem_comorbidades" className="form-label">TEM COMORBIDADES</label>
                        <input className="form-control" id="tem_comorbidades" value={paciente.tem_comorbidades ? 'SIM' : 'NÃO'} readOnly/>
                    </div>
                    <div className="col-4 mr-auto">
                        <label htmlFor="vacinado_covid19" className="form-label">JÁ FOI VACINADO CONTRA O COVID 19?</label>
                        <input className="form-control" id="vacinado_covid19" value={paciente.vacinado_covid19 ? 'SIM' : 'NÃO'} readOnly/>
                    </div>
                </div>

            </div>
        </div>
    );
}
