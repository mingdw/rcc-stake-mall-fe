import React from "react";
import {createBrowserRouter} from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import About from "../view/About/AboutIndex";
import Pledge from "../view/Pledge/PledgeIndex";
import Pool from "../view/Pool/PoolIndex";
import Prize from "../view/Prize/PrizeIndex";
import NotFount from "../view/404";
import TransactionList from "../view/Transaction/TransactionList";
import Home from "../view/Home/HomeIndex";
import AdminHome from "../view/Admin/AdminHome";
import AdminPledge from "../view/Admin/AdminPledge";
import AdminAccount from "../view/Admin/AdminAccount";
import AdminContract from "../view/Admin/AdminContract";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children:[
            {
                path: '/',
                element:<Home/>
            },
            {
                path: '/home',
                element:<Home/>
            },
            {
                path: '/pool',
                element:<Pool/>
            },
            {
                path: '/pledge',
                element:<Pledge/>
            },

            {
                path: '/prize',
                element:<Prize/>
            },
            {
                path: '/about',
                element:<About/>
            },
            {
                path: '/transactionList',
                element:<TransactionList/>
            },
           
            {
                path: '/admin',
                element: <AdminLayout/>,
                children:[
                    {
                        path: '/admin',
                        element: <AdminHome />
                    },
                    {
                        path: '/admin/home',
                        element: <AdminHome />
                    },  
                    {
                        path: '/admin/pledge',
                        element: <AdminPledge/>
                    },
                    {
                        path: '/admin/account',
                        element: <AdminAccount/>
                    },
                    {
                        path: '/admin/contract',
                        element: <AdminContract/>
                    },
                    
                    
                ]
            },
            {
                path: '*',
                element:<NotFount/>
            },
        ]
    }
    
])

export default router
