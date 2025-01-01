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
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backHome}>Back Home</Button>}
  />
        </div>
    </>
}

export default NotFount