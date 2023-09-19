/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../components/layouts/PublicLayout';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard'
import React from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import CategoryList from '../pages/category/categoryList';
import CategoryDetail from '../pages/category/categoryDetail';
import SongList from '../pages/song/SongList';
import SongDetail from '../pages/song/SongDetail';
import ProductDetail from '../pages/product/ProductDetail';
import ProductList from '../pages/product/ProductList';
import SaleDetail from '../pages/sale/SaleDetail';
import SaleList from '../pages/sale/SaleList';
import CustomerList from '../pages/customer/CustomerList';
import CustomerDetail from '../pages/customer/CustomerDetail';
// import CategoryEdit from '../components/category';
// import Category from '../components/category';


const router = createBrowserRouter([
    {
        path: 'login',
        element: (
            <PublicLayout>
                <Login />
            </PublicLayout>
        ),
    },
    // {
    //     path: "/",
    //     element: (<AuthLayout>
    //         <Dashboard/>
    //     </AuthLayout>)
    // },
    {
        // path: '/',
        element: <AuthLayout />,
        // errorElement: <ErrorElement />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },

            {
                path: '/category/list',
                element: <CategoryList />
            },
            {
                path: '/category/add',
                element: <CategoryDetail
                    different={{ type: 'add' }} />
            },
            {
                path: '/category/edit',
                element: <CategoryDetail
                    different={{ type: 'edit' }} />
            },
            {
                path: '/category/view',
                element: <CategoryDetail
                    different={{ type: 'view' }} />
            },

            {
                path: '/song/list',
                element: <SongList />
            },
            {
                path: '/song/add',
                element: <SongDetail
                    different={{ type: 'add' }} />
            },

            {
                path: '/product/list',
                element: <ProductList />
            },
            {
                path: '/product/add',
                element: <ProductDetail
                    different={{ type: 'add' }} />
            },
            // {
            //     path: '/category/edit',
            //     element: <CategoryDetail
            //         different={{ type: 'edit' }} />
            // },
            // {
            //     path: '/category/view',
            //     element: <CategoryDetail
            //         different={{ type: 'view' }} />
            // }

            {
                path: '/sale/list',
                element: <SaleList />
            },
            {
                path: '/sale/add',
                element: <SaleDetail
                    different={{ type: 'add' }} />
            },

            {
                path: '/customer/list',
                element: <CustomerList />
            },
            {
                path: '/customer/add',
                element: <CustomerDetail
                    different={{ type: 'add' }} />
            },
        ]
    },

    // {
    //     path: "/category/:id",
    //     element: <CategoryEdit/>
    // },

    // {
    //     path: "/choosedemo",
    //     element: <ChooseDemo/>
    // },
    // {
    //     path: "/category",
    //     element: <CategoryEdit/>
    // },
    // {
    //     path: "/categories",
    //     element: <Category/>
    // },
    // {
    //     path: "/database",
    //     element: <QuanLyData/>
    // },
    // {
    //     path: "/store/add/:demo",
    //     element: <EditOrign/>
    // },
    // {
    //     path: "/store",
    //     element: <QuanLyMusicStore/>
    // }, {
    //     path: "/store/give/:id",
    //     element: <GiveUser/>
    // }
    // ,
    // {
    //     path: "/database/edit/:id",
    //     element: <EditDemo/>
    // },
    // {
    //     path: "/database/origin/:id",
    //     element: <EditOrign/>
    // },
    // {
    //     path: "/database/origin",
    //     element: <EditOrign/>
    // },
    // {
    //     path: "/database/upload/:id",
    //     element: <UploadMusic/>
    // },
    // {
    //     path: "/database/add",
    //     element: <EditDemo/>
    // },
    // {
    //     path: "/penddingbuy",
    //     element: <PenddingBuy/>
    // }
    // , {
    //     path: "/voucher",
    //     element: <Voucher/>
    // }, {
    //     path: "/voucher/:id",
    //     element: <VoucherEdit/>
    // }
    // ,
    // {
    //     path: "/penddingbuy/detail/:id",
    //     element: <PenddingBuyDetail/>
    // },

    // {
    //     path: "/users",
    //     element: <Users/>
    // },

    // {
    //     path: "/user/storage/:id",
    //     element: <UserStorage/>
    // },
    // {
    //     path: "/users/:id",
    //     element: <EditUser/>
    // },
    // {
    //     path: "/admins",
    //     element: <Admin/>
    // },
    // {
    //     path: "/admins/add",
    //     element: <AdminAdd/>
    // },
    // {
    //     path: "/chat",
    //     element: <Chat/>
    // },
    // {
    //     path: "/chat/:id",
    //     element: <Chat/>
    // }
    // ,
    // {
    //     path: "/profile",
    //     element: <Profile/>
    // },

    // {
    //     path: "/import",
    //     element: <Import/>
    // },
    // {
    //     path: "/logout",
    //     element: <Logout/>
    // }
]);
export default router;
