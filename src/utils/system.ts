export const getSysteTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return {
        year,
        month,
        date,
        hours,
        minutes
    }
}

export const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
}