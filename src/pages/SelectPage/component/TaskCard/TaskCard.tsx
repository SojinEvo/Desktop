import { FC } from "react";

import "./TaskCard.less"

interface TaskCardProps {
    title: string;
}

const TaskCard: FC<TaskCardProps> = (props) => {
    const { title } = props;
    return (
        <div className="taskCard">
            <h3>{title}</h3>
        </ div>
    )
};

export default TaskCard;