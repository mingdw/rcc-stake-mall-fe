import React,{FC} from "react";
import { Button, Result } from 'antd';
import { useNavigate   } from 'react-router-dom';

const NotFount: FC = () => {
    const navigate = useNavigate()
   function backHome(){
    navigate('/home')
   }

    return <>
        <div>
        <Result
    status="404"
    title="404"
    subTitle="很抱歉, 您访问的页面不存在！"
    extra={<Button type="primary">回到首页</Button>}

  />
        </div>
    </>
}

export default NotFount