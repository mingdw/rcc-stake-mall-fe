import React,{FC} from "react";
import {Outlet} from 'react-router-dom'
import styles from './AdminLayout.module.scss'

const AdminLayout: FC = () => {
    return <>
        <div className={styles.container}>
            <div className="styles.left">
                admin content left
            </div>
            <div className={styles.container}>
               <Outlet/>
            </div>
        </div>
    </>
}

export default AdminLayout