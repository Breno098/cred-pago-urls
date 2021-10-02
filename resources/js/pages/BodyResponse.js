import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function BodyResponse ({ match }) {
    const history = useHistory();
    const dispach = useDispatch();

    const [url, setUrl] = useState({});

    useEffect(() => {
        loadUrl();
    }, []);

    const loadUrl = async () => {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

        window.axios.get(`${host}/urls/${match.params.id}`)
            .then(response => {
                setUrl(response.data);
            }).catch(error => {
                history.push(`/`);
            });
    }

    return (
        <div className="px-4 py-2">
            { url.response_body }
        </div>
    );
}
