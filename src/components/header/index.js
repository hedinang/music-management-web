/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from 'antd';
import React from 'react';
import './style.scss';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
    return (
        <Layout.Header
            className="!bg-[#3c8dbc] !max-h-[50px]"

        >
            <div 
            className="!bg-[#3c8dbc] !max-h-[50px] header"
            
            >
                <MenuOutlined className='text-[white]'/>
            </div>
        </Layout.Header>
    );
};

export default Header;
