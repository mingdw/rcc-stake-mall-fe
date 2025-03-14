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
import OrderConfirm from "../view/mall/OrderConfirm";
import OrderSuccess from "../view/mall/OrderSuccess";



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
                   
                        <Suply/>
                   
                )
            },
            {
                path:'/suply/details',
                element: (
                   
                        <SuplyDetails/>
                    
                )
            },
            {
                path: '/mall',
                element: (
                        <Mall/>
                )
               
            },
            {
                path: '/mall/budding',
                element: <Budding/>
            },
            {
                path: '/mall/product/:id',
                element: (
                    <ProductDetail/>
                )      
            },
            {
                path: '/mall/order/confirm/:id',
                element: <OrderConfirm/>
            },
            {
                path: '/mall/order/success',
                element: <OrderSuccess/>
            },
            {
                path: '/about',
                element:<About/>
            },
            {
                path: '/transactionList',
                element: (
                  
                        <TransactionList/>
                   
                )
            },
            {
                path: '/notConnected',
                element:<NotConnected/>
            },
           
            {
                path: '/admin',
                element: (
                    
                        <AdminLayout/>
                   
                ),
                children:[
                    {
                        path: '/admin/profile/info',
                        element: (
                           
                                <ProfileInfo />
                          
                        )
                    },
                    {
                        path: '/admin/profile/balance',
                        element: (
                           
                                <ProfileBalance />
                          
                        )
                    },  
                    {
                        path: '/admin/profile/security',
                        element: (
                            
                                <SecuritySettings/>
                           
                        )
                    },
                   
                    {
                        path: '/admin/profile/history',
                        element: (
                            
                                <TransactionList/>
                           
                        )
                    },
                    {
                        path: '/admin/profile/notifications',
                        element: (
                           
                                <NotificationSettings/>
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
