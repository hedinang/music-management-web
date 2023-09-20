/* eslint-disable react/react-in-jsx-scope */
import { DashboardOutlined, GiftOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import { useMemo, useState } from 'react';
import { BsFillCartFill, BsFillDatabaseFill } from 'react-icons/bs';
import { HiOutlineLogout, HiUserGroup } from 'react-icons/hi';
import { SiMinutemailer } from 'react-icons/si';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';


import './style.scss';
import Cookies from 'js-cookie';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}



const UserPanel = () => {
    return <div className='user-panel'>
        <Avatar size={48} icon={<UserOutlined />} />
        <div className='flex flex-col justify-center'>
            <div>0001</div>
            <div>Chỉnh sửa</div>
        </div>
    </div>
}

const SideBar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const isCommunity = pathname.includes('/community');
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const logout = ()=>{
        Cookies.remove('access_token')
        navigate('/login')
    }

    const items = [
        getItem(<Link to={'/dashboard'}>{'Dashboard'}</Link>, '1', <DashboardOutlined />),
        getItem(<Link to={'/product/list'}>{'Quản lý danh sách sản phẩm'}</Link>, '1', <BsFillDatabaseFill />),
        getItem(<Link to={'/song/list'}>{'Quản lý danh sách nhạc'}</Link>, '1', <BsFillDatabaseFill />),
        getItem(<Link to={'/sale/list'}>{'Danh sách đã bán'}</Link>, '1', <BsFillCartFill />),
        getItem(<Link to={'/category/list'}>{'Danh mục'}</Link>, '1', <UnorderedListOutlined />),
        getItem(<Link to={'/'}>{'Mã quà tặng'}</Link>, '1', <GiftOutlined />)
    ]
    const minorItems = [
        getItem(<Link to={'/customer/list'}>{'Danh sách người dùng'}</Link>, '1', <UserOutlined />),
        getItem(<Link to={'/'}>{'Inbox'}</Link>, '1', <SiMinutemailer />),
        getItem(<Link to={'/'}>{'Danh sách admin'}</Link>, '1', <HiUserGroup />),
        getItem(<Link onClick={logout} >{'Đăng xuất'}</Link>, '1', <HiOutlineLogout />)
    ]

    const selectedKey = useMemo(() => {
        const route = {
            '/enviroment/dashboard': '1',
            '/enviroment/x-road-members': '2',
            '/enviroment/security-servers': '3',
            '/enviroment/ss-certificates': '4',
            '/enviroment/subsystem': '5',
            '/enviroment/adapter-servers': '6',
            '/enviroment/databases': '7',
            '/enviroment/services': '8',
            '/enviroment/setting': '9',
            '/community/jp-link-institutions': '10',
            '/community/jp-link-members': '11',
            '/community/data-service-catalogue': '12',
        };
        const resultKey = Object.entries(route).find(([key]) => pathname.includes(key));
        if (!resultKey) {
            return '1';
        }
        return resultKey[1];
    }, [pathname]);
    // const ContentHeaderMenu = useMemo < string > (() => (pathname.includes('enviroment') ? t('left_menu.my_enviroment.title') : t('left_menu.community.title')), [pathname, t]);
    return (
        <Layout.Sider
            className="!max-w-[230px] !w-auto h-[100vh]
              SideBarWrapper"
            collapsible
            collapsed={collapsed}
            width={230}
            trigger={null}
            style={{
                background: 'white',
                fontFamily: 'Inter',
            }}
        >
            <a className='user-panel-logo'>
                <b className='text-[20px]'>Shop</b>
                <span>Music</span>
            </a>
            <UserPanel />
            <div className='category-separation '>Các chức năng quản lý</div>
            <Menu
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                defaultOpenKeys={['1']}
                mode="inline"
                theme="dark"
                items={items}
                className='bg-[#222d32]'
            />

            <div className='category-separation'>Các chức năng khác</div>

            <Menu
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                defaultOpenKeys={['1']}
                mode="inline"
                theme="dark"
                items={minorItems}
                className='bg-[#222d32]'
            />
        </Layout.Sider>
    );
};

export default SideBar;
