import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Modal from "@/pages/components/Modal/Modal";

import Draggable from "react-draggable";

import { FileContext } from "@/Model/FileContext";

import type { DraggableData, DraggableEvent } from "react-draggable";

type fileNameType = "email" | "net" | "message";

interface FileTaskProps {
  title: string;
  fileName: fileNameType;
  offset: Record<string, number>;
  icon: string;
  children?: ReactNode;
  size?: Record<string, number>;
}

// 个性化文件任务组建
const FileTask: FC<FileTaskProps> = (props) => {
  const { title, children, icon, fileName, offset, size } = props;

  const { fileState, updateFileState, clear } = useContext(FileContext);
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [oldPosition, setOldPosition] = useState({ x: 0, y: 0 })
  const [draggableStatus, setDraggableStatus] = useState<boolean>(false);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null!);
  const [full, setFull] = useState<Record<string, string | number>>({});
  const [fullStatus, setFullStatus] = useState<boolean>(false);
  const defalutSize = { width: 600, height: 300, ...size };
  const draggableRef = useRef(null);

  useEffect(() => {
    setOpen(fileState[fileName].status);
    setDraggableStatus(true);
  }, [fileState[fileName], full]);

  // const mouseEvent = (event: { target: EventTarget | null; }) => {
  //     const draggableEle = draggableRef.current as HTMLDivElement | null;
  //     if (draggableEle && !draggableEle?.contains(event.target as null)) {
  //         updateFileState(fileName, true);
  //     }
  // }

  const handleHide = useCallback(() => {
    updateFileState(fileName, false, true);
    setOpen(false);
  }, [open]);

  const handleFull = useCallback(() => {
    setFullStatus((prev) => {
      const status = !prev;
      if (status) {
        setFull({
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
        });
        setPosition({ x: 0, y: 0 });
        setDraggableStatus(true);
      } else {
        setFull({});
        setPosition(oldPosition);
        setDraggableStatus(false);
      }
      return status;
    });
  }, [fullStatus]);

  const onDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
    setOldPosition({ x: data.x, y: data.y }); // 记录旧定位
  }, [])

  const handleCancel = useCallback(() => {
    updateFileState(fileName, false);
    setOpen(false);
    clear(fileName);
  }, [open]);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    updateFileState(fileName, true); // 重新更新文件状态，如文件Zindex;
    const { clientWidth } = window.document.documentElement;
    const contentHeight = document.getElementsByClassName("main")[0].clientHeight; // 计算内容区高度
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: contentHeight - (targetRect.bottom - uiData.y),
    });
  };

  const modalRender = (modal: ReactNode) => {
    return (
      <Draggable
        defaultClassName={`draggable-${fileName}`}
        ref={draggableRef}
        disabled={!draggableStatus}
        position={fullStatus ? { x: 0, y: 0 } : position}
        bounds={bounds}
        nodeRef={draggleRef}
        onStart={(event, uiData) => onStart(event, uiData)}
        onDrag={onDrag}
      >
        <div
          ref={draggleRef}
          style={{
            position: "absolute",
            display: "inline-block",
            ...defalutSize,
            ...offset,
            ...full,
            zIndex: fileState[fileName].zIndex,
          }}
        >
          {modal}
        </div>
      </Draggable>
    );
  };
  return (
    <Modal
      size={defalutSize}
      title={title}
      toolStatus
      name={fileName}
      icon={icon}
      full={fullStatus ? full : {}}
      modalRender={modalRender}
      open={open}
      draggableStatus={draggableStatus}
      handleCancel={handleCancel}
      handleHide={handleHide}
      handleFull={handleFull}
    >
      {children}
    </Modal>
  );
};

export default memo(FileTask);
