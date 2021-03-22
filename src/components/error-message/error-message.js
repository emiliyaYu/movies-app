import React from 'react';
import { Alert } from 'antd';
import './error-message.css';

const ErrorMessage = () => (
        <div className='error'>
            <Alert
                message="Oops!"
                description="Something went wrong..."
                type="error"
                showIcon
                banner
            />
        </div>
    )
export default ErrorMessage;