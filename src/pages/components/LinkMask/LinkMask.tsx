import { FC, ReactNode } from "react";
import { Button } from "antd";

import Scenario from "@/pages/components/Scenario/Scenario";

import "./LinkMask.less";


interface Config {
    status: boolean; // 打开状态
    linkText:string;
    description: string; // 描述内容
    contentText?: string // 内容文本
}

interface ListMaskProps {
    linkStatus: 'success' | 'error'; // 环节状态
    config: Config; // 配置项
    footerRender?: ReactNode; // footer渲染dom
}

const LinkMask: FC<ListMaskProps> = (props) => {
    const { config, linkStatus, footerRender } = props;
    const { status,linkText, description, contentText } = config;

    const linkStatusConfig = {
        "success": "✅",
        "error": "❌"
    };

    if (!status) return null;

    return (
        <div className="link-mask">
            <div className="link-mask-main">
                <div className="link-mask-header">
                    <i>{linkStatusConfig[linkStatus]}</i>
                    <h2>{linkText}</h2>
                    <span>{description}</span>
                </div>
                <div className="link-mask-content">
                    {contentText && <Scenario><p>{contentText}</p></Scenario>} 
                </div>
                <div className="link-mask-footer">
                    {footerRender}
                </div>
            </div>
        </div>
    )
};

export default LinkMask;