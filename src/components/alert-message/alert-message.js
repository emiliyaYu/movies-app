import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Space } from 'antd';
import './alert-message.css';


const AlertMessage = ({isCookieSendingAgree, getAgreeSaveCookies}) => {
    if(isCookieSendingAgree !== null) {
        return null;
    }
    return (
        <Alert className='alert'
               message="Accept Cookies?"
               description="This website uses cookies in order to offer you the most relevant information. Please accept cookies for optimal performance."
               type="info"
               action={
                   <Space direction="vertical">
                       <Button size="small" type="primary" onClick={getAgreeSaveCookies}>
                           Accept
                       </Button>
                       <Button size="small" danger type="ghost">
                           Decline
                       </Button>
                   </Space>
               }
               closable
        />
    )

}

AlertMessage.defaultProps = {
    getAgreeSaveCookies: ()=>{},
    isCookieSendingAgree: true
}
AlertMessage.propTypes = {
    getAgreeSaveCookies: PropTypes.func,
    isCookieSendingAgree: PropTypes.bool
}
export default AlertMessage;