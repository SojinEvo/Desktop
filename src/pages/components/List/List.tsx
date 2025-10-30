import { FC, Fragment } from "react";

import "./List.less"

interface ListProps {
    listData: string[];
    icon: string;
}

const List: FC<ListProps> = (props) => {

    const { listData, icon } = props;

    return (
        <Fragment>
            <ul>
                {listData.map((item, index) => {
                    return (
                        <li key={index}> <i style={{ width: '16px', height: '16px', backgroundImage: `url(${icon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></i>{item}</li>
                    )
                })}
            </ul>
        </Fragment>
    )

};

export default List;