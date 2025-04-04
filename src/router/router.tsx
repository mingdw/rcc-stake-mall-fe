import React from "react";
import {createBrowserRouter} from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Suply from "../view/suply/SuplyIndex";
import SuplyDetails from "../view/suply/SuplyDetails";
import Home from "../view/home/HomeIndex";
import About from "../view/about/AboutIndex";
import NotFount from "../view/403";
import NotConnected from "../view/403";
import PrivateRoute from "../components/PrivateRoute";
import Mall from "../view/mall/MallIndex";
import Budding from "../view/budding";
import ProductDetail from "../view/mall/ProductDetail";
import OrderConfirm from "../view/mall/OrderConfirm";
import OrderSuccess from "../view/mall/OrderSuccess";
import RoleManagement from "../view/admin/contract/RoleManagement";
import StakingPoolManage from "../view/admin/contract/StakingPoolManage";
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
import ProductsManage from "../view/admin/mall/products";
import OrdersManage from "../view/admin/mall/OrdersManage";
import CommentsManage from "../view/admin/mall/CommentsManage";
import ProfileInfo from "../view/admin/profile/ProfileInfo";
import SecuritySettings from "../view/admin/profile/SecuritySettings";
import NotificationSettings from "../view/admin/profile/NotificationSettings";



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
                element: <PrivateRoute>
                    <AdminLayout/>
                </PrivateRoute>
                ,
                children:[
                    {
                        path: '/admin/profile/info',
                        element: <PrivateRoute>
                            <ProfileInfo />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/profile/security',
                        element: <PrivateRoute>
                            <SecuritySettings/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/profile/notifications',
                        element: <PrivateRoute>
                            <NotificationSettings/>
                        </PrivateRoute>
                    },
                    
                    {
                        path: '/admin/assets/balance',
                        element: <PrivateRoute>
                            <Balance />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/assets/staking',
                        element: <PrivateRoute>
                            <Staking/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/assets/tradelist',
                        element: <PrivateRoute>
                            <TradeList/>
                        </PrivateRoute>
                    },
                    
                    {
                        path: '/admin/order/address',
                        element: <PrivateRoute>
                            <AddressManager/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/order/pending',
                        element: <PrivateRoute>
                            <OrderPending/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/order/list',
                        element: <PrivateRoute>
                            <TransactionList/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/order/aftersale',
                        element: <PrivateRoute>
                            <AfterSale />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/mall/categories',
                        element: <PrivateRoute>
                            <CategoryManage />
                        </PrivateRoute>
                    },
                    
                    {
                        path: '/admin/mall/products',
                        element: <PrivateRoute>
                            <ProductsManage />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/mall/orders',
                        element: <PrivateRoute>
                            <OrdersManage />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/mall/comments',
                        element: <PrivateRoute>
                            <CommentsManage />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/role-management',
                        element: <PrivateRoute>
                            <RoleManagement/>
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/staking-pools',
                        element: <PrivateRoute>
                            <StakingPoolManage />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/properties',
                        element: <PrivateRoute>
                            <Properties />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/emergency-control',
                        element: <PrivateRoute>
                            <EmergencyControl />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/user-management',
                        element: <PrivateRoute>
                            <UserManagement />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/contract-upgrade',
                        element: <PrivateRoute>
                            <ContractUpgrade />
                        </PrivateRoute>
                    },
                    {
                        path: '/admin/contract/account-monitoring',
                        element: <PrivateRoute>
                            <AccountMonitoring />
                        </PrivateRoute>
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
