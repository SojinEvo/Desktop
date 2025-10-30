import { FC, ReactNode } from "react";
import "./Card.less";

interface CardProps {
    icon: string;
    title: string;
    headerJustify: 'left' | 'center' | 'right';
    children: ReactNode;
}

const Card: FC<CardProps> = (props) => {
    const { children, title, icon, headerJustify } = props;
    return (
        <div className="card">
            <div className="card-layout">
                <div className="card-header" style={{
                    display: "flex",
                    justifyContent: headerJustify,
                    alignItems: "center"
                }}>
                    <div className="header-box">
                        <i style={{
                            backgroundImage: `url(${icon})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            display: "inline-block"
                        }}></i>
                        <span>{title}</span>
                    </div>
                </div>
                <div className="card-main">
                    {children}
                </div>
            </div>

        </div>
    )
};

export default Card;