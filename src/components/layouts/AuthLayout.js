/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, Space } from 'antd';
import React from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import SideBar from '../../components/sideBar/index'
import Header from '../../components/header/index';


const AuthLayout = ({ children }) => {
    const { pathname } = useLocation();
    // const { t } = useTranslation();
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();
    // const role_name = localStorage.getItem('role_name');
    // const { langLoading } = useGlobalLanguage();
    // const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            const decode = jwtDecode(token);
            if (decode && decode.exp && decode.exp < (Date.now() / 1000)) {
                localStorage.clear();
                toast.warn('Your turn was expired, please login again!')
                window.location.replace('/login');
            }

        } else {
            navigate('/login');
        }
    }, [pathname]);

    return (
        <>
            {/* <LoadingScreen isLoading={langLoading} /> */}
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Layout >
                        <SideBar />
                        <Layout.Content >
                            <Header />
                            <Outlet />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Space>
        </>
    );
};

export default AuthLayout;
