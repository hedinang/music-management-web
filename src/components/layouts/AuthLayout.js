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
import apiFactory from '../../api';


const AuthLayout = ({ children }) => {
    const { pathname } = useLocation();
    // const { t } = useTranslation();
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();
    // const role_name = localStorage.getItem('role_name');
    // const { langLoading } = useGlobalLanguage();
    // const { user } = useSelector((state: RootState) => state.auth);

    const process = async () => {
        const token = Cookies.get('access_token')

        if (!token) {
            navigate('/login');
            return
        }
        const decode = jwtDecode(token);

        if (decode && decode.exp && decode.exp < (Date.now() / 1000)) {
            Cookies.remove('access_token')
            toast.warn('Your turn was expired, please login again!')
            navigate('/login');
            return
        }
        // const me = await apiFactory.authApi.getMe();

        // if (!me?.data) {
        //     Cookies.remove('access_token')
        //     navigate('/login');
        //     return
        // }
        // if (me?.data?.type !== 'ADMIN') {
        //     Cookies.remove('access_token')
        //     navigate('/login');
        //     return
        // }
    }
    useEffect(() => {
        process()
    }, [pathname]);

    return (
        <>
            {/* <LoadingScreen isLoading={langLoading} /> */}
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <SideBar />
                    <Layout.Content >
                        <Header />
                        <Outlet />
                    </Layout.Content>
                </Layout>
            </Space>
        </>
    );
};

export default AuthLayout;
