import React,{FC} from "react";
import { Button, Result } from 'antd';

const NotFount: FC = () => {
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