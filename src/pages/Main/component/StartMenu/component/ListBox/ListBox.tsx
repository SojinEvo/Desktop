import { FC, Fragment, ReactNode } from "react";

import "./ListBox.less"

interface CardProps {
    title: ReactNode;
    content: ReactNode;
}

const ListBox: FC<CardProps> = (props) => {

    const { title, content } = props;

    return (
        <Fragment>
            <div className="listBox">
                <div className="listBox-title">
                    {title}
                </div>
                <div className="listBox-content">
                    {content}
                </div>
            </div>

        </Fragment>
    )

}

export default ListBox;