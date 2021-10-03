import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import moment from 'moment';

export default function AppIndex () {
    const history = useHistory();
    const dispach = useDispatch();

    const [urls, setUrls] = useState([]);
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        loadUrls();

        setInterval(() => loadUrls(page), 2000)
    }, []);

    const loadUrls = async (paginationPage = null) => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

        window.axios.get(`${host}/urls?page=${paginationPage}`)
            .then(response => {
                setUrls(response.data.data);
                setLastPage(response.data.last_page);
            }).catch(error => {
                console.log(error);
            });
    }

    const storeUrl = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const _token = window._token;

        window.axios.post(`${host}/urls`, { url, method, _token })
            .then(response => {
                loadUrls();
                setUrl('');
            }).catch(error => {
                console.log(error);
            });
    }

    const deleteUrl = async (url) => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const _token = window._token;

        window.axios.delete(`${host}/urls/${url.id}`, { _token })
            .then(response => {
                loadUrls();
            }).catch(error => {
                console.log(error);
            });
    }

    const dateFormat = (date) => {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    }

    const bodyPage = (url) => {
        history.push(`/url/${url.id}`);
    }

    const next = () => {
        let atualPage = page + 1;
        // if(page + 1 < lastPage){
            setPage(atualPage);
            loadUrls(atualPage);
        // }
    }

    const previous = () => {
        let atualPage = page - 1;
        // if(page - 1 > 0){
            setPage(atualPage);
            loadUrls(atualPage);
        // }
    }

    return (
        <div className="row mx-2">
             <div className="col-12 col-md-4 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <p className="fs-5"> Formulário para cadastro </p>
                        </div>

                        <label htmlFor="url" className="form-label">Url</label>
                        <input 
                            className="form-control" 
                            id="url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            onKeyPress={(e) => {
                                if (e.charCode == 13) {
                                    storeUrl();
                                }
                            }}
                        />

                        <label htmlFor="method" className="form-label">Url</label>
                        <select 
                            className="form-select" 
                            aria-label="Default select example" 
                            id="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="PATCH">PATCH</option>
                            <option value="DELETE">DELETE</option>
                        </select>

                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={storeUrl}
                        > 
                            Cadastrar 
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <p className="fs-5"> Urls Cadastradas </p>
                        </div>


                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous" onClick={previous}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next" onClick={next}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">HTTP Metodo</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Data de rastreio</th>
                                    <th scope="col">Status Code</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { urls.map(url => (
                                    <tr key={url.id}>
                                        <td>{url.method}</td>
                                        <td>
                                            <a href={url.url}>
                                                {url.url}
                                            </a>
                                        </td>
                                        <td>{dateFormat(url.date_access)}</td>
                                        <td>{url.status_code}</td>
                                        <td>
                                            <button 
                                                className="btn btn-primary" 
                                                onClick={() => url.status_code === 200 ? bodyPage(url) : () => {}}
                                            > 
                                                Resposta 
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => deleteUrl(url)}
                                            > 
                                                Deletar 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Urls Cadastradas</h1>

                <div className="col-lg-8 mx-auto">
                    
                </div>
            </div> */}
        </div>
    );
};
