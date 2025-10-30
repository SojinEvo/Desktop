import { createContext, FC, ReactNode, useState } from "react";

import { useGetZindex } from "@/hooks/file";

import type { fileType } from "@/types/public";

interface ContextProvider {
    children: ReactNode;
}

// 初始化配置
const initConfig = {
    status: false,
    zIndex: 0,
    icon: '',
    display: false
}

// 文件状态策略表 On(1)
const fileStrategy = {
    'email': { ...initConfig, icon: '/src/assets/email.png' },
    'net': { ...initConfig, icon: '/src/assets/net.png' },
    'message': { ...initConfig, icon: '/src/assets/message.png' }
};

export const FileContext = createContext({
    fileState: fileStrategy,
    startMenuStatus: false,
    updateFileState: (_fileName: fileType, _status: boolean, _display?: boolean) => { },
    updateStartMenuStatus: (_status: boolean) => { },
    clear: (_fileName: fileType) => { }
});

const FileContextProvider: FC<ContextProvider> = ({ children }) => {
    const [fileState, setFileState] = useState(fileStrategy);
    const [startMenuStatus, setStartMenuStatus] = useState<boolean>(false);
    const [maxIndex, setMaxIndex] = useState<number>(0);
    const contextValue = {
        fileState,
        updateFileState: (fileName: fileType, status: boolean, display?: boolean) => {
            const { zIndex } = useGetZindex(maxIndex);
            const { icon } = fileState[fileName];
            setMaxIndex(zIndex);
            setFileState(prev => {
                const res = { ...prev, [fileName]: { status, zIndex, icon, display: display ?? false } };
                return res;
            });
        },
        startMenuStatus,
        updateStartMenuStatus: (status: boolean) => {
            setStartMenuStatus(status);
        },
        clear: (fileName: fileType) => {
            setFileState(prev => {
                const { icon, display } = fileState[fileName]
                const res = { ...prev, [fileName]: { status: false, zIndex: 0, icon, display } }
                setMaxIndex(0)
                return res;
            })
        }
    }

    return (
        <FileContext.Provider value={contextValue}>
            {children}
        </FileContext.Provider>
    )
}


export default FileContextProvider;