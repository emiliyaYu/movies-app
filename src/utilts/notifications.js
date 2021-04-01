import { notification } from 'antd';

const openNotificationWithIcon = (type, title, text) => {
    notification[type]({
        message: title,
        description:
            text,
    });
};
export default openNotificationWithIcon;