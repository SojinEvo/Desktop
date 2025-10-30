import { FC, ReactNode } from "react";
import "./Scenario.less"

interface ScenarioProps {
    children: ReactNode;
}
const Scenario: FC<ScenarioProps> = (props) => {
    const { children } = props;

    return (
        <div className="scenario" >
            {children}
        </div>
    )
};

export default Scenario;