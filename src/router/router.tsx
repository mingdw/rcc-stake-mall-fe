import React from "react";
import {createBrowserRouter} from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Suply from "../view/suply/SuplyIndex";
import SuplyDetails from "../view/suply/SuplyDetails";
import Home from "../view/home/HomeIndex";
import About from "../view/about/AboutIndex";
import TransactionList from "../view/transaction/TransactionList";
import NotFount from "../view/403";
import NotificationSettings from "../view/admin/profile/NotificationSettings";
import ProfileBalance from "../view/admin/profile/ProfileBalance";
import ProfileInfo from "../view/admin/profile/ProfileInfo";
import SecuritySettings from "../view/admin/profile/SecuritySettings";
import NotConnected from "../view/403";
import PrivateRoute from "../components/PrivateRoute";
import Mall from "../view/mall/MallIndex";
import Budding from "../view/budding";
import ProductDetail from "../view/mall/ProductDetail";



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
                element: (
                    <PrivateRoute>
                        <Suply/>
                    </PrivateRoute>
                )
            },
            {
                path:'/suply/details',
                element: (
                    <PrivateRoute>
                        <SuplyDetails/>
                    </PrivateRoute>
                )
            },
            {
                path: '/mall',
                element: (
                        <Mall/>
                ),
                children:[
                    {
                        path: 'mall/budding',
                        element: <Budding/>
                    }
                    
                ]
            },
            {
                path: '/mall/product/:id',
                element: (
                        <ProductDetail/>
                )
            },
            {
                path: '/about',
                element:<About/>
            },
            {
                path: '/transactionList',
                element: (
                    <PrivateRoute>
                        <TransactionList/>
                    </PrivateRoute>
                )
            },
            {
                path: '/notConnected',
                element:<NotConnected/>
            },
           
            {
                path: '/admin',
                element: (
                    <PrivateRoute>
                        <AdminLayout/>
                    </PrivateRoute>
                ),
                children:[
                    {
                        path: '/admin/profile/info',
                        element: (
                            <PrivateRoute>
                                <ProfileInfo />
                            </PrivateRoute>
                        )
                    },
                    {
                        path: '/admin/profile/balance',
                        element: (
                            <PrivateRoute>
                                <ProfileBalance />
                            </PrivateRoute>
                        )
                    },  
                    {
                        path: '/admin/profile/security',
                        element: (
                            <PrivateRoute>
                                <SecuritySettings/>
                            </PrivateRoute>
                        )
                    },
                   
                    {
                        path: '/admin/profile/history',
                        element: (
                            <PrivateRoute>
                                <TransactionList/>
                            </PrivateRoute>
                        )
                    },
                    {
                        path: '/admin/profile/notifications',
                        element: (
                            <PrivateRoute>
                                <NotificationSettings/>
                            </PrivateRoute>
                        )
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
