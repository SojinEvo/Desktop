
// 获得当前z-index
export const useGetZindex = (index: number) => {
    const zIndex = index + 1;
    if (index > 10000) return { zIndex: 999 }; // resZindex()
    return {
        zIndex
    };
};

// 重新分配z-index
const resZindex = () => {

};



