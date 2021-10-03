import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';

export default function Routes(){
    const [authUser, setAuthUser] = useState(null);

    const auth = useSelector(state => state.auth );

    useEffect(() => {
        setAuthUser(auth.user);
    }, [auth]);

    return authUser ? <AppRoutes/> : <AuthRoutes/>;
}