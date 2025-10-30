import { FC, useContext } from 'react';


import signalImg from "@/assets/signal.png";

import { FileContext } from "@/Model/FileContext"
import { UseGetTime } from '@/hooks/system';

import './Footer.less'

import type { fileType } from "@/types/public";

const toolConfig = [{ name: "signal", icon: signalImg }]

const Footer: FC = () => {
    const { fileState, startMenuStatus, updateFileState, updateStartMenuStatus, } = useContext(FileContext);
    const workspaceConfig = Object.keys(fileState);
    const { timeStr, dateStr } = UseGetTime();
    
    const workspaceClick = (fileName: fileType) => {
        updateFileState(fileName, true);
    };

    return (
        <div className="footer">
            <div className='footer-content'>
                <div className='startMenu'>
                    <i onClick={() => updateStartMenuStatus(!startMenuStatus)} style={{ backgroundColor: startMenuStatus ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}></i>
                </div>
                <div className='workspace'>
                    {workspaceConfig.map(item => {
                        return (fileState[item as fileType].status || fileState[item as fileType].display) && <i onClick={() => workspaceClick(item as fileType)} style={{
                            width: '30px',
                            height: '30px',
                            background: `url(${(fileState[item as fileType].icon)})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            cursor: 'pointer',
                            backgroundColor: fileState[item as fileType].status|| fileState[item as fileType].display ? 'rgba(255,255,255,0.3)' : 'transparent',
                            borderBottom: fileState[item as fileType].status ? '2px solid #0078d4' : 'none'

                        }} className={item} key={item}></i>
                    })}
                </div>
                <div className='tool'>
                    <p className='time'>
                        <span>{timeStr}</span>
                        <span>{dateStr}</span>
                    </p>

                    {toolConfig.map(item => {
                        return <i style={{
                            width: '30px',
                            height: '30px',
                            backgroundImage: `url(${item.icon})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'

                        }} className={item.name} key={item.name}></i>
                    })}
                </div>
            </div>
        </div>)
}

export default Footer;