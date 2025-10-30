import { FC, Fragment, useCallback, useContext } from "react";

import { FileContext } from "@/Model/FileContext";

import "./File.less";

import type { fileType } from "@/types/public";

interface FileProps {
    name: fileType;  // 文件key
    fileName: string; // 文件名
    img?: string; //图片
    size?: Record<string, number | string>; //尺寸
    bgColor?: string; // 背景色
}

const File: FC<FileProps> = (props) => {
    const { name, fileName, img, size, bgColor } = props;
    const defaultSize = { width: 50, height: 50 };
    const { fileState, updateFileState } = useContext(FileContext);

    const fileClick = useCallback(() => {
        updateFileState(name, true);
    }, [fileState]);

    return (
        <Fragment>
            <div className="fileCard">
                <div className="content"
                    style={{ backgroundImage: `url(${img})`, ...defaultSize, ...size, backgroundColor: `${bgColor}` }}
                    onClick={fileClick}
                ></div>
                <div className="name">{fileName}</div>
            </div>
        </Fragment>
    )

}

export default File;