import { FC, Fragment, ReactNode } from "react";

import "./Mask.less"

interface MaskProps {
    title: ReactNode;
    icon?: string;
    children: ReactNode;
    size: Record<string, number | string>;
    bgStyle?: Record<string, string>;
}

const Mask: FC<MaskProps> = (props) => {

    const { title, children, size, bgStyle, icon } = props;

    return (
        <Fragment>
            <div className="mask" style={{
                ...size, borderRadius: '8px',
                ...bgStyle
            }}>
                <div className="header">
                    <i className={"icon"} style={{ backgroundImage: `url(${icon})` }}></i>
                    {title}
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </Fragment>
    );
};

export default Mask;