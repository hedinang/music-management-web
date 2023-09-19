/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const PublicLayout = ({ children }) => {
    const token = Cookies.get('token')
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [token]);
    return children;
};

export default PublicLayout;
