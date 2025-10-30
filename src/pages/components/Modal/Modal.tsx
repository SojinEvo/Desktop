import { FC, memo, ReactNode, useRef } from "react";

import "./Modal.less"

interface ModalProps {
    name: string; // key
    size: Record<string, number>; // 尺寸
    icon: string; // 图标
    title: string; // 标题
    children: ReactNode; // 子元素
    open: boolean; // 打开状态
    full?: Record<string, number | string> // 全屏
    offset?: Record<string, number | string> // 偏移量（若托拽不需要设置）
    toolStatus?: boolean; // 扩展：工具栏（右上角）
    toolElement?: ReactNode; // 扩展：自定义工具栏元素
    headerStyle?: Record<string, number | any>; // 头部样式
    contentStyle?: Record<string, string>; // 内容区样式
    modalRender?: (modalElement: ReactNode) => ReactNode; // 扩展渲染dom（当前仅支持最外层添加dom）
    draggableStatus?: boolean; // 托拽状态（是否开启托拽）
    style?: Record<string, number | string>; // 其它样式
    handleCancel?: () => void; // 关闭
    handleHide?: () => void; // 隐藏
    handleFull?: () => void; // 全屏
}

const Modal: FC<ModalProps> = (ModalProps) => {
    const { name, icon, size, offset, full,
        style, title, toolStatus, toolElement, headerStyle, contentStyle, modalRender, children, open, draggableStatus, handleCancel, handleHide, handleFull } = ModalProps;
    const defaultConfig = {
        headerHeight: 40
    };

    // 合并内容style
    const mergeContentstyle = { ...contentStyle, ...size, ...style, ...full } as Record<string, number>;
    // 动态计算内容高度
    const reContentStyle = { ...mergeContentstyle, height: `calc(${mergeContentstyle.height}${full && Object.keys(full).length > 0 ? '' : 'px'} - ${headerStyle?.height ?? defaultConfig.headerHeight}px)` };

    if (!open) return null;

    const modalRef = useRef(null);

    const ModaElement = <div className={`modal ${name}`} ref={modalRef} style={{ ...offset, ...size, ...style, ...full }}>
        <div className="modal-header" style={{ height: defaultConfig.headerHeight, ...headerStyle, cursor: draggableStatus ? 'move' : 'default' }}>
            <span className="modal-title">  <i style={{ backgroundImage: `url(${icon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width: '16px', height: '16px' }}></i>{title}</span>
            {toolElement ? toolElement : toolStatus && (<div className="modal-tool">
                <i className="hide" onClick={handleHide}></i>
                <i className="full" onClick={handleFull}></i>
                <i className="close" onClick={handleCancel}></i>
            </div>)}
        </div>
        <div className="modal-content" style={reContentStyle}>{children}</div>
        {/* <div className="footer"></div>  扩展元素 */}
    </div>


    if (modalRender) return modalRender(ModaElement);
    return ModaElement;
}

export default memo(Modal);