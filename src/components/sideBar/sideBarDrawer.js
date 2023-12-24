/* eslint-disable jsx-a11y/anchor-is-valid */
import { Drawer, Menu } from 'antd';
import { useSideBarStore } from '../../store/SideBarStore';
import './style.scss';
import { keyMenuItem } from '../../config/Constant';
import { Link, useNavigate } from 'react-router-dom';
import apiFactory from '../../api';
import Cookies from 'js-cookie';
import { BsFillCartFill } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import { DashboardOutlined, GiftOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { HiOutlineLogout, HiUserGroup } from 'react-icons/hi';
import { SiMinutemailer } from 'react-icons/si';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}

const SideBarDrawer = () => {
    const navigate = useNavigate()
    const collapse = useSideBarStore(state => state.collapse)
    const switchCollapse = useSideBarStore((state) => state.switchCollapse)
    const switchBreadCrumbItem = useSideBarStore(state => state.switchBreadCrumbItem)
    const logoHeader = () => {
        return <a className='logoHeader'>
            <b className='text-[20px]'>Shop</b>
            <span>Music</span>
        </a>
    }
    const logout = async () => {
        await apiFactory.customerApi.logout()
        Cookies.remove('access_token')
        navigate('/login')
    }
    const items = [
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

    return <Drawer title={logoHeader()} placement="left" className='drawer'
        onClose={switchCollapse}
        open={collapse}
        closable={false}
    >
        <Menu
            onClick={e => switchBreadCrumbItem(keyMenuItem[e.key].name)}
            mode="inline"
            // mode="vertical"
            theme="dark"
            items={items}
            className='menu-drawer'
        />
    </Drawer>
}
export { SideBarDrawer }
