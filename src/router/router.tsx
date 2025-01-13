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
import ProfileInfo from "../view/Admin/Profile/ProfileInfo";
import ProfileBalance from "../view/Admin/Profile/ProfileBalance";
import SecuritySettings from "../view/Admin/Profile/SecuritySettings";
import NotificationSettings from "../view/Admin/Profile/NotificationSettings";


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
                        path: '/admin/profile/info',
                        element: <ProfileInfo />
                    },
                    {
                        path: '/admin/profile/balance',
                        element: <ProfileBalance />
                    },  
                    {
                        path: '/admin/profile/security',
                        element: <SecuritySettings/>
                    },
                   
                    {
                        path: '/admin/profile/history',
                        element: <TransactionList/>
                    },
                    {
                        path: '/admin/profile/notifications',
                        element: <NotificationSettings/>
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
