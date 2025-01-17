import React from "react";
import {createBrowserRouter} from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import About from "../view/about/AboutIndex";
import NotFount from "../view/404";
import TransactionList from "../view/transaction/TransactionList";
import Home from "../view/home/HomeIndex";

import ProfileInfo from "../view/admin/profile/ProfileInfo";
import ProfileBalance from "../view/admin/profile/ProfileBalance";
import SecuritySettings from "../view/admin/profile/SecuritySettings";
import NotificationSettings from "../view/admin/profile/NotificationSettings";

import Borrow from "../view/borrow/BorrowIndex";
import Suply from "../view/suply/SuplyIndex";


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
                path: '/suply',
                element:<Suply/>
            },
            {
                path: '/borrow',
                element:<Borrow/>
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
