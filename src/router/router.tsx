import React from "react";
import {createBrowserRouter} from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Suply from "../view/suply/SuplyIndex";
import SuplyDetails from "../view/suply/SuplyDetails";
import Home from "../view/home/HomeIndex";
import About from "../view/about/AboutIndex";
import NotFount from "../view/403";
import NotificationSettings from "../view/admin/profile/NotificationSettings";
import ProfileInfo from "../view/admin/profile/ProfileInfo";
import SecuritySettings from "../view/admin/profile/SecuritySettings";
import NotConnected from "../view/403";
import PrivateRoute from "../components/PrivateRoute";
import Mall from "../view/mall/MallIndex";
import Budding from "../view/budding";
import ProductDetail from "../view/mall/ProductDetail";
import OrderConfirm from "../view/mall/OrderConfirm";
import OrderSuccess from "../view/mall/OrderSuccess";
import RoleManagement from "../view/admin/contract/RoleManagement";
import StakingPools from "../view/admin/contract/StakingPools";
import Properties from "../view/admin/contract/Properties";
import EmergencyControl from "../view/admin/contract/EmergencyControl";
import UserManagement from "../view/admin/contract/UserManagement";
import ContractUpgrade from "../view/admin/contract/ContractUpgrade";
import AccountMonitoring from "../view/admin/contract/AccountMonitoring";
import Balance from "../view/admin/asserts/Balance";
import Staking from "../view/admin/asserts/Staking";
import TradeList from "../view/admin/asserts/TradeList";
import AddressManager from "../view/admin/order/AddressManager";
import OrderPending from "../view/admin/order/OrderPending";
import AfterSale from "../view/admin/order/AfterSale";
import TransactionList from "../view/admin/order/TransactionList";
import CategoryManage from "../view/admin/mall/CategoryManage";
import ProductsManage from "../view/admin/mall/ProductsManage";
import OrdersManage from "../view/admin/mall/OrdersManage";
import CommentsManage from "../view/admin/mall/CommentsManage";
import AttributesManage from "../view/admin/mall/AttributesManage";



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
                element: <AdminLayout/>,
                children:[
                    {
                        path: '/admin/profile/info',
                        element: <ProfileInfo />
                    },
                    {
                        path: '/admin/profile/security',
                        element: <SecuritySettings/>
                    },
                    {
                        path: '/admin/profile/notifications',
                        element: <NotificationSettings/>
                    },
                    
                    {
                        path: '/admin/assets/balance',
                        element: <Balance />
                    },
                    {
                        path: '/admin/assets/staking',
                        element: <Staking/>
                    },
                    {
                        path: '/admin/assets/tradelist',
                        element: <TradeList/>
                    },
                    
                    {
                        path: '/admin/order/address',
                        element: <AddressManager/>
                    },
                    {
                        path: '/admin/order/pending',
                        element: <OrderPending/>
                    },
                    {
                        path: '/admin/order/list',
                        element: <TransactionList/>
                    },
                    {
                        path: '/admin/order/aftersale',
                        element: <AfterSale />
                    },
                    {
                        path: '/admin/mall/categories',
                        element: <CategoryManage />
                    },
                    {
                        path: '/admin/mall/attributes',
                        element: <AttributesManage />
                    },
                    
                    {
                        path: '/admin/mall/products',
                        element: <ProductsManage />
                    },
                    {
                        path: '/admin/mall/orders',
                        element: <OrdersManage />
                    },
                    {
                        path: '/admin/mall/comments',
                        element: <CommentsManage />
                    },
                    {
                        path: '/admin/contract/role-management',
                        element: <RoleManagement/>
                    },
                    {
                        path: '/admin/contract/staking-pools',
                        element: <StakingPools />
                    },
                    {
                        path: '/admin/contract/properties',
                        element: <Properties />
                    },
                    {
                        path: '/admin/contract/emergency-control',
                        element: <EmergencyControl />
                    },
                    {
                        path: '/admin/contract/user-management',
                        element: <UserManagement />
                    },
                    {
                        path: '/admin/contract/contract-upgrade',
                        element: <ContractUpgrade />
                    },
                    {
                        path: '/admin/contract/account-monitoring',
                        element: <AccountMonitoring />
                    }
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
