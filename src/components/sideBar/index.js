/* eslint-disable react/react-in-jsx-scope */
import { DashboardOutlined, GiftOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import { HiOutlineLogout, HiUserGroup } from 'react-icons/hi';
import { SiMinutemailer } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';


import './style.scss';
import Cookies from 'js-cookie';
import apiFactory from '../../api';
import { useSideBarStore } from '../../store/SideBarStore';
import { keyMenuItem } from '../../config/Constant';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}

const SideBar = () => {
    const navigate = useNavigate()
    const collapse = useSideBarStore(state => state.collapse)
    const switchBreadCrumbItem = useSideBarStore(state => state.switchBreadCrumbItem)

    const logout = async () => {
        await apiFactory.customerApi.logout()
        Cookies.remove('access_token')
        navigate('/login')
    }

    const items = useMemo(() => {
        if (collapse) {
            return [
                getItem(<Link to={'/'}>{keyMenuItem.DASHBOARD.name}</Link>, keyMenuItem.DASHBOARD.key, <DashboardOutlined />),
                getItem(<Link to={'/song/list'}>{keyMenuItem.SONG_LIST.name}</Link>, keyMenuItem.SONG_LIST.key, <FaMusic />),
                getItem(<Link to={'/author/list'}>{keyMenuItem.AUTHOR_LIST.name}</Link>, keyMenuItem.AUTHOR_LIST.key, <UserOutlined />),
                getItem(<Link to={'/sale/list'}>{keyMenuItem.SALE_LIST.name}</Link>, keyMenuItem.SALE_LIST.key, <BsFillCartFill />),
                getItem(<Link to={'/category/list'}>{keyMenuItem.CATEGORY_LIST.name}</Link>, keyMenuItem.CATEGORY_LIST.key, <UnorderedListOutlined />),
                getItem(<Link to={'/'}>{keyMenuItem.PRESENT_LIST.name}</Link>, keyMenuItem.PRESENT_LIST.key, <GiftOutlined />),

                getItem(<Link to={'/customer/list'}>{keyMenuItem.CUSTOMER_LIST.name}</Link>, keyMenuItem.CUSTOMER_LIST.key, <UserOutlined />),
                getItem(<Link to={'/'}>{keyMenuItem.CHAT.name}</Link>, keyMenuItem.CHAT.key, <SiMinutemailer />),
                getItem(<Link to={'/admin/list'}>{keyMenuItem.ADMIN_LIST.name}</Link>, keyMenuItem.ADMIN_LIST.key, <HiUserGroup />),
                getItem(<Link onClick={logout} >{keyMenuItem.LOG_OUT.name}</Link>, keyMenuItem.LOG_OUT.key, <HiOutlineLogout />)
            ]
        } else {
            return [
                getItem(<div className='text-center text-[#4b646f]'>Các chức năng quản lý</div>, keyMenuItem.FUNCTION),
                getItem(<Link to={'/'}>{keyMenuItem.DASHBOARD.name}</Link>, keyMenuItem.DASHBOARD.key, <DashboardOutlined />),
                getItem(<Link to={'/song/list'}>{keyMenuItem.SONG_LIST.name}</Link>, keyMenuItem.SONG_LIST.key, <FaMusic />),
                getItem(<Link to={'/author/list'}>{keyMenuItem.AUTHOR_LIST.name}</Link>, keyMenuItem.AUTHOR_LIST.key, <UserOutlined />),
                getItem(<Link to={'/sale/list'}>{keyMenuItem.SALE_LIST.name}</Link>, keyMenuItem.SALE_LIST.key, <BsFillCartFill />),
                getItem(<Link to={'/category/list'}>{keyMenuItem.CATEGORY_LIST.name}</Link>, keyMenuItem.CATEGORY_LIST.key, <UnorderedListOutlined />),
                getItem(<Link to={'/'}>{keyMenuItem.PRESENT_LIST.name}</Link>, keyMenuItem.PRESENT_LIST.key, <GiftOutlined />),

                getItem(<div className='text-center text-[#4b646f]'>Các chức năng khác</div>, keyMenuItem.FUNCTION),
                getItem(<Link to={'/customer/list'}>{keyMenuItem.CUSTOMER_LIST.name}</Link>, keyMenuItem.CUSTOMER_LIST.key, <UserOutlined />),
                getItem(<Link to={'/'}>{keyMenuItem.CHAT.name}</Link>, keyMenuItem.CHAT.key, <SiMinutemailer />),
                getItem(<Link to={'/admin/list'}>{keyMenuItem.ADMIN_LIST.name}</Link>, keyMenuItem.ADMIN_LIST.key, <HiUserGroup />),
                getItem(<Link onClick={logout} >{keyMenuItem.LOG_OUT.name}</Link>, keyMenuItem.LOG_OUT.key, <HiOutlineLogout />)
            ]
        }
    }, [collapse])

    return (
        <Layout.Sider
            className="!max-w-[230px] !w-auto h-[100vh]
              SideBarWrapper"
            collapsible
            collapsed={collapse}
            width={230}
            trigger={null}
            style={{
                background: 'white',
                fontFamily: 'Inter',
            }}
        >
            {!collapse ?
                <a className='user-panel-logo'>
                    <b className='text-[20px]'>Shop</b>
                    <span>Music</span>
                </a>
                : <a className='user-panel-logo'>SM</a>
            }
            <Menu
                onClick={e => switchBreadCrumbItem(keyMenuItem[e.key].name)}
                mode="inline"
                // mode="vertical"
                theme="dark"
                items={items}
                className='bg-[#222d32]'
            />
        </Layout.Sider>
    );
};

export default SideBar;
