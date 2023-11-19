
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar } from 'antd';
import './style.scss';
import { MenuOutlined } from '@ant-design/icons';
import { useSideBarStore } from '../../store/SideBarStore';

const UserPanel = () => {
    return <div className='user-panel'>
        <Avatar size={48} icon={<UserOutlined />} />
        <div className='flex flex-col justify-center'>
            <div>{localStorage.getItem('username')}</div>
        </div>
    </div>
}
const Header = () => {
    const switchCollapse = useSideBarStore((state) => state.switchCollapse)
    const breadCrumbItem = useSideBarStore((state) => state.breadCrumbItem)
    return (
        <Layout.Header className="!bg-[#3c8dbc] !max-h-[50px]">
            <div className="!bg-[#3c8dbc] !max-h-[50px] header">
                <div className='flex flex-row gap-[40px]'>
                    <MenuOutlined className='text-[white]' onClick={switchCollapse} />
                    <b className='text-white text-[20px]'>{breadCrumbItem}</b>
                </div>
                <UserPanel />
            </div>
        </Layout.Header>
    );
};

export default Header;
