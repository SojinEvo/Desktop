import { formatTime, getSysteTime } from "@/utils/system";
import { useEffect, useState } from "react";

// 系统时间
export const UseGetTime = () => {
    const { year, month, date, hours, minutes } = getSysteTime();
    const [timeStr, setTimeStr] = useState<string>(`${hours}:${minutes}`)
    const [dateStr] = useState<string>(`${year}/${month}/${date}`)

    const timmer = setInterval(() => {
        const { hours, minutes } = getSysteTime();
        setTimeStr(`${hours}:${minutes}`)
    }, 60000);

    useEffect(() => {
        return () => {
            clearInterval(timmer);
        }
    })

    return {
        timeStr,
        dateStr
    }
};

// 计时器
export const UseTimer = () => {
    const [time, setTime] = useState<string>("00:00:00");
    const [startTime] = useState(Date.now());

    useEffect(() => {
        const timmer = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const hour = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const second = Math.floor((elapsedTime % 60000) / 1000);
            setTime(`${formatTime(hour)}:${formatTime(minutes)}:${formatTime(second)}`);
        }, 1000)
        return () => clearInterval(timmer);
    }, []);

    return {
        time
    }
};