import { notification } from "antd";
import { createContext, FC, ReactNode, useCallback, useMemo } from "react";

import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

interface ContextProvider {
    children: ReactNode;
}

export const NotificatioContext = createContext({
    openNotification: (_title: string, _text: string, _placement: NotificationPlacement) => { }

});

const NotificatioContextProvider: FC<ContextProvider> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = useCallback((title: string, text: string, placement: NotificationPlacement) => {
        api.info({
            message: `${title}`,
            description: <span>{text}</span>,
            placement,
        });
    }, [api]);

    const contextValue =  {
        openNotification
    }




    return (
        <NotificatioContext.Provider value={contextValue}>
            {children}
            {contextHolder}
        </NotificatioContext.Provider>
    )
}


export default NotificatioContextProvider;