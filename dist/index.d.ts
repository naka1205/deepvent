/**
 * deepvent-ts - A TypeScript 3D scene engine based on Three.js
 *
 * @packageDocumentation
 * @module deepvent-ts
 */

import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import * as THREE from 'three';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';

/**
 * Action - 处理添加、移除、更新实体的操作
 */
export declare class Action implements IAction {
    private app;
    private data;
    constructor(app: IApp);
    /**
     * 开始绘制
     */
    startDrawing(properties: PanelData): void;
    /**
     * 停止绘制
     */
    stopDrawing(): void;
    /**
     * 添加管道并记录历史
     */
    addPipe(properties: PanelData): IPipe | null;
    /**
     * 删除管道并记录历史
     */
    removePipe(pipeId: string): boolean;
    /**
     * 更新管道属性并记录历史
     * 同时更新关联的风机、构筑物、风筒位置
     */
    updatePipe(pipeId: string, properties: PanelData): boolean;
    /**
     * 添加风机并记录历史
     */
    addFan(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IFan | null;
    /**
     * 删除风机并记录历史
     */
    removeFan(fanId: string): boolean;
    /**
     * 更新风机属性并记录历史
     */
    updateFan(fanId: string, properties: PanelData): boolean;
    /**
     * 添加构筑物并记录历史
     */
    addShape(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IShape | null;
    /**
     * 删除构筑物并记录历史
     */
    removeShape(shapeId: string): boolean;
    /**
     * 更新构筑物属性并记录历史
     */
    updateShape(shapeId: string, properties: PanelData): boolean;
    /**
     * 添加Sprite
     */
    addSprite(pipe: IPipe, position: THREE.Vector3, properties: PanelData): ISprite | null;
    /**
     * 删除Sprite
     */
    removeSprite(spriteId: string): boolean;
    /**
     * 更新Sprite属性
     */
    updateSprite(spriteId: string, properties: PanelData): boolean;
    /**
     * 批量删除实体并记录历史
     */
    removeBatch(ids: string[]): boolean;
    /**
     * 批量更新管道属性
     */
    updateBatch(propertiesList: PanelData[]): boolean;
    /**
     * 批量创建坡道巷道并记录历史
     */
    addRamp(segmentPropertiesArray: PanelData[]): IPipe[];
    /**
     * 处理文件上传
     */
    handleFileUpload(file: File, properties: PanelData): Promise<boolean | null>;
    /**
     * 处理DXF文件上传
     */
    private handleDxfUpload;
    /**
     * 处理DWG文件上传
     */
    private handleDwgUpload;
    /**
     * 解析DWG数据
     */
    parseDwgData(properties: PanelData): void;
    /**
     * 记录导入DXF的操作
     */
    _recordImportDxfAction(previousState: SceneState, newState: SceneState): void;
    /**
     * 记录导入DWG的操作
     */
    private _recordImportDwgAction;
    /**
     * 保存当前场景状态到存储
     */
    _saveCurrentSceneState(): void;
    /**
     * 处理撤销操作
     */
    handleUndo(): boolean;
    /**
     * 处理重做操作
     */
    handleRedo(): boolean;
    /**
     * 保存场景
     */
    saveScene(name?: string): Promise<string>;
    /**
     * 加载场景
     */
    loadScene(sceneId: string): Promise<boolean>;
    /**
     * 记录加载场景的操作
     */
    _recordLoadSceneAction(previousState: SceneState, newState: SceneState): void;
    /**
     * 清空场景
     */
    clear(): void;
}

/**
 * App - 三维场景实例
 */
export declare class App implements IApp {
    container: HTMLElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    pmremGenerator: THREE.PMREMGenerator;
    css3d: CSS3DRenderer;
    css2d: CSS2DRenderer;
    composer: EffectComposer;
    outline: OutlinePass;
    controls: OrbitControls;
    loop: ILoop;
    listener: EventListener_2;
    raycaster: THREE.Raycaster;
    resizer: IResizer;
    storage: IStorage;
    history: IHistory;
    action: IAction;
    entities: IEntities;
    tween: ITween;
    draw: IDraw;
    view: IView;
    ramp: IRamp;
    link: ILink;
    dxf: IDxfManager;
    dwg: IDwgManager;
    helper: IHelper;
    spline: ISpline;
    disaster: IDisaster;
    detection: IDetection;
    select: ISelect;
    message: Message;
    last: string;
    state: string;
    schemeId?: string;
    schemeState?: boolean;
    wasmPath?: string;
    innerWidth: number;
    innerHeight: number;
    grid: IGridHelper;
    move: IMove;
    keyMap: {
        [key: string]: string;
    };
    keyConfig: KeyConfig;
    keydownHandler?: (event: KeyboardEvent) => void;
    containerKeydownHandler?: (event: KeyboardEvent) => void;
    /** 自定义资源 URL */
    resourceUrls: ResourceUrls;
    /** 初始化选项 */
    private options;
    /**
     * 创建 App 实例
     * @param container - 渲染容器元素
     * @param options - 初始化选项（可选）
     */
    constructor(container: HTMLElement, options?: AppOptions);
    createCamera(): void;
    createScene(): void;
    createRenderer(): void;
    createCSS3D(): void;
    createCSS2D(): void;
    createComposer(): void;
    createLights(): void;
    createControls(): void;
    createGrid(): void;
    setupKeyEvents(): void;
    handleCameraMovement(key: string, actionKey: string): void;
    bindMouseEvents(): void;
    loadTexture(file: string): Promise<THREE.Texture>;
    loadFile(file: string): Promise<string | ArrayBuffer>;
    loadGltf(file: string): Promise<GLTF>;
    loadFont(file: string): Promise<Font>;
    loadFileReader(file: File): Promise<string | ArrayBuffer>;
    render(): void;
    start(): void;
    stop(): void;
    destroy(): void;
    init(): Promise<void>;
    /**
     * 初始化纹理资源
     * 优先使用 resourceUrls 中配置的自定义 URL，否则使用内置的 base64 默认资源
     */
    private initResources;
    /**
     * 从 URL 或 base64 字符串加载纹理
     */
    private loadTextureFromSource;
    initEditor(): Promise<void>;
    initRamp(properties: Properties | undefined): void;
    initSpline(value: boolean): void;
    initLink(value: boolean): void;
    initDisaster(value: boolean): void;
    onRunDisaster(data: SimulationDisasterData): void;
    initDetection(value: boolean): void;
    initSelect(value: boolean): void;
    onUpload(file: File, properties: Properties): Promise<any>;
    onSubmit(properties: Properties): void;
    onAction(properties: Properties): void;
    onUndo(): boolean;
    onRedo(): boolean;
    canUndo(): boolean;
    canRedo(): boolean;
    onClear(): boolean;
    onSave(nodes: NodeItem[], groups: GroupItem[]): boolean;
    setCameraAndControls(boundingBox?: THREE.Box3): void;
    setCameraZoomAnimation(model: THREE.Object3D, range: number): void;
    isCameraMovementKey(key: string): string | null;
    /**
     * 初始化配置
     * @param localeConfig - 配置对象
     */
    initConfig(localeConfig: {
        entityOptions?: Array<{
            value: string;
            label: string;
        }>;
        defaultNames?: Partial<typeof Config.DEFAULT_NAME>;
    }): void;
    setKeyConfig(data: KeyConfig): void;
}

/**
 * 应用事件基类
 */
export declare interface AppEvent {
    type: string;
    target: object;
    object?: any;
    [key: string]: any;
}

/**
 * 应用事件映射
 */
declare interface AppEventMap {
    select: {
        object: any;
    };
    update: {
        object: any;
    };
    cancel: any;
    complete: any;
    loaded: any;
    readed: any;
    ramp: any;
    links: any;
    spline: any;
    generated: {
        nodes: NodeItem[];
        groups: GroupItem[];
        target: any;
    };
    multiselect: {
        ids: string[];
    };
    visibility: {
        visible: boolean;
    };
    batchmove: {
        active: boolean;
    };
    message: any;
}

/**
 * App 初始化选项
 */
export declare interface AppOptions {
    /** 自定义资源 URL 配置，未配置的资源将使用内置默认 base64 资源 */
    resourceUrls?: ResourceUrls;
    /** 场景设置配置 */
    setConfig?: Partial<SetConfig>;
    /** 快捷键配置 */
    keyConfig?: Partial<KeyConfig>;
    /** 参数配置 */
    paramConfig?: Partial<ParamConfig>;
    /** 方案 ID */
    schemeId?: string;
    /** 方案状态 */
    schemeState?: boolean;
    /** 比例尺 */
    scale?: number;
    /** 配置 */
    localeConfig?: LocaleConfig;
    /** WASM 文件路径 */
    wasmPath?: string;
}

/**
 * 批量移动事件
 */
export declare interface BatchMoveEvent extends AppEvent {
    type: 'batchmove';
    active: boolean;
}

/**
 * 清除事件
 */
export declare interface ClearEvent extends AppEvent {
    type: 'clear';
}

export declare const Config: {
    cameraPosition: {
        x: number;
        y: number;
        z: number;
    };
    COLORS: readonly [16711680, 16776960, 65280, 65535, 255, 16711935, 16777215, 8388608, 8421376, 32768, 8421504, 16744448];
    ENTITY_TYPE_OPTIONS: {
        value: string;
        label: string;
    }[];
    VISIBLE_ENTITIES: string[];
    DEFAULT_NAME: {
        groupName: string;
        sceneName: string;
        ductName: string;
        shapeName: string;
        spriteName: string;
        fanName: string;
        windName: string;
        doorName: string;
        sensorName: string;
        mainFanName: string;
        segmentName: string;
        entranceName: string;
        exitName: string;
        unknownNode: string;
        tempTunnel: string;
        nodeName: string;
    };
    SET_CONFIG: SetConfig;
    KEY_CONFIG: KeyConfig;
    PARAM_CONFIG: ParamConfig;
    MESSAGE_CODES: Record<number, "info" | "warn" | "error">;
    DECIMAL_NUM: number;
    PIPE_NAME: "LINE";
    FAN_NAME: "FAN";
    MAIN_NAME: "MAIN";
    WIND_NAME: "WIND";
    DOOR_NAME: "DOOR";
    DOORWIND_NAME: "DOORWIND";
    SENSOR_NAME: "SENSOR";
    SHAPE_NAME: "SHAPE";
    DUCT_NAME: "DUCT";
    POLLUTION_NAME: "POLLUTION";
    WORKER_NAME: "WORKER";
    EXIT_NAME: "EXIT";
    WINDSENSOR_NAME: "WINDSENSOR";
    STATION_NAME: "STATION";
    WASM_PATH: string;
    IMGS: {
        /** background 纹理 */
        background: string;
        /** jushan 纹理 */
        jushan: string;
        /** wind 纹理 */
        wind: string;
        /** door 纹理 */
        door: string;
        /** main 纹理 */
        main: string;
        /** sensor 纹理 */
        sensor: string;
        /** pollution 纹理 */
        pollution: string;
        /** worker 纹理 */
        worker: string;
        /** windsensor 纹理 */
        windsensor: string;
        /** exit 纹理 */
        exit: string;
        /** station 纹理 */
        station: string;
        /** doorwind 纹理 */
        doorwind: string;
    };
};

/**
 * deepvent-ts 配置类型定义
 * 包含应用配置、属性、参数等相关类型
 */
/**
 * DeepVent 应用配置
 */
export declare interface DeepventConfig {
    /** 渲染容器元素 */
    container: HTMLElement;
    /** 资源基础路径 */
    basePath?: string;
    /** 画布宽度 */
    width?: number;
    /** 画布高度 */
    height?: number;
    /** 是否开启抗锯齿 */
    antialias?: boolean;
    /** 背景颜色 */
    backgroundColor?: number;
    /** 是否开启阴影 */
    shadows?: boolean;
}

/**
 * 默认名称配置
 */
declare interface DefaultNameConfig {
    groupName?: string;
    sceneName?: string;
    ductName?: string;
    shapeName?: string;
    spriteName?: string;
    fanName?: string;
    windName?: string;
    doorName?: string;
    sensorName?: string;
    mainFanName?: string;
    segmentName?: string;
    entranceName?: string;
    exitName?: string;
    unknownNode?: string;
    tempTunnel?: string;
    nodeName?: string;
}

export declare class Detection implements IDetection {
    private app;
    constructor(app: IApp);
    init(value: boolean): void;
    start(values: string[]): void;
    update(values: string[]): void;
    clear(): void;
    dispose(): void;
}

/**
 * 空间尺寸范围
 */
export declare interface Dimensions {
    min: DxfPosition;
    max: DxfPosition;
}

export declare class Disaster implements IDisaster {
    private app;
    private movements;
    private pollution;
    constructor(app: IApp);
    init(value: boolean): void;
    start(contaminationPath: DisasterData[], evacuationPath: DisasterData[]): void;
    stop(): void;
    clear(): void;
    dispose(): void;
}

/**
 * 灾难数据接口
 */
export declare interface DisasterData {
    id: string;
    times: ITimes[];
}

/**
 * Draw - 绘制功能
 */
export declare class Draw implements IDraw {
    private app;
    temp: ITemp;
    plane: THREE.Mesh;
    group: THREE.Group;
    drawing: boolean;
    points: THREE.Vector3[];
    startPoint: THREE.Vector3 | null;
    currentPoint: THREE.Vector3 | null;
    hoveredPipe: IPipe | null;
    mouse: THREE.Vector2;
    mouseStart: THREE.Vector2;
    isDrawing: boolean;
    isDragging: boolean;
    properties: PanelData;
    continuousMode: boolean;
    lastPipe: IPipe | null;
    highlightedPipe: IPipe | null;
    lastClickTime: number;
    originalPlanePosition: THREE.Vector3;
    snapIndicator: THREE.Object3D | null;
    private lastMouseMoveTime;
    private mouseMoveThrottle;
    private distanceLabel;
    constructor(app: IApp);
    startDrawing(properties: PanelData): void;
    handleMouseMove(event: MouseEvent): void;
    handleFanMouseMove(): void;
    handleSpriteMouseMove(): void;
    handleShapeMouseMove(): void;
    handlePipeMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleFanMouseDown(): void;
    handleSpriteMouseDown(): void;
    handleShapeMouseDown(): void;
    formatDecimal(num: number, decimals: number): number;
    handlePipeMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handlePipeMouseUp(isDoubleClick: boolean): void;
    adjustPlaneHeight(height: number): void;
    resetPlaneHeight(): void;
    updateProperties(newProperties: Partial<PanelData>): PanelData;
    findNearestPipeEndpoint(pointer: THREE.Vector2): ExtendedVector3 | null;
    highlightPipe(pipe: IPipe): void;
    clearPipeHighlight(pipe: IPipe): void;
    clearAllPipeHighlights(): void;
    getPointFromMouse(event: MouseEvent): ExtendedVector3 | null;
    worldToScreen(worldPos: THREE.Vector3): THREE.Vector2;
    calculateSlopePoint(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, value: number | undefined): THREE.Vector3;
    private updateDistanceLabel;
    private clearDistanceLabel;
    cancel(): void;
    clear(): void;
    private ensureNumber;
    private clearHoveredPipe;
    private clearTempAndHoveredPipe;
    private calculateAngleFromPoints;
    private createVerticesFromPoints;
    private resetDrawingState;
    private createPipe;
    private findPipeIntersect;
    private getPipeFromIntersect;
    findNearestPipePoint(pointer: THREE.Vector2): ExtendedVector3 | null;
}

export declare class Duct implements IDuct {
    id: string;
    name: string;
    type: string;
    pipe: IPipe;
    mesh: THREE.Object3D;
    private airductRadius;
    private offsetHeight;
    private segmentsRadial;
    constructor(id: string, pipe: IPipe, properties?: Properties);
    createDuct(): void;
    private addCornerAtPoint;
    private createCylinder;
    updatePosition(): void;
    update(): void;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): DuctJSON;
}

/**
 * 风筒JSON表示
 */
export declare interface DuctJSON {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    pipeId: string;
    nodeId: string;
}

/**
 * DWG实体接口
 */
export declare interface DwgEntity {
    color: number;
    colorIndex: number;
    colorName: string;
    endPoint?: {
        x: number;
        y: number;
        z: number;
    };
    extrusionDirection: {
        x: number;
        y: number;
        z: number;
    };
    handle: number;
    isVisible: boolean;
    layer: string;
    lineType: string;
    lineTypeScale: number;
    lineweight: number;
    ownerBlockRecordSoftId: number;
    startPoint?: {
        x: number;
        y: number;
        z: number;
    };
    thickness: number;
    transparency: number;
    type: string;
    /** POLYLINE 顶点数组 */
    vertices?: Array<{
        x: number;
        y: number;
        z?: number;
    }>;
    /** LWPOLYLINE 高程值 */
    elevation?: number;
    /** 闭合标志 (1 = 闭合) */
    flag?: number;
}

/**
 * DxfManager - Dxf文件解析
 */
export declare class Dxf implements IDxfManager {
    private app;
    private parser;
    private entityDataList;
    private pipeProps;
    private properties;
    private generate;
    private importStats;
    constructor(app: IApp);
    /**
     * 从文件内容解析DXF
     */
    parseDxfContent(content: string): DxfJson | false;
    /**
     * 从文件对象解析DXF
     */
    parseDxfFile(content: string, properties: PanelData): void;
    /**
     * 提取实体数据
     */
    extractEntityData(dxf: DxfJson): void;
    createEntities(): void;
    /**
     * 提取LINE数据
     * @param entity LINE实体
     * @param dxf DXF数据
     * @param dims 尺寸范围
     */
    extractLineData(entity: DxfLineEntity, dxf: DxfJson, dims: Dimensions): void;
    /**
     * 更新尺寸边界
     * @param point 三维点
     * @param dims 尺寸对象
     */
    updateDimensions(point: THREE.Vector3, dims: Dimensions): void;
    /**
     * 坐标标准化处理
     * 关键优化：第一次导入时计算并保存变换参数，后续导入复用相同参数
     * 确保所有DXF导入使用统一的坐标系统，避免重复LINE
     * @param dims 尺寸范围
     */
    normalizeCoordinates(dims: Dimensions): void;
    /**
     * 获取实体颜色
     * @param entity DXF实体
     * @param dxf DXF数据
     * @returns 颜色值
     */
    getColorFromEntity(entity: DxfLineEntity, dxf: DxfJson): number;
    /**
     * 获取实体所属图层
     * @param entity DXF实体
     * @param dxf DXF数据
     * @returns 图层对象或undefined
     */
    private getEntityLayer;
    /**
     * 检查LINE坐标是否与已有对象重复
     * 使用转换后的坐标进行比对
     * @param vertices 转换后的顶点坐标数组 [起点, 终点]
     * @param existingPipes 场景中已有的管道列表
     * @returns 如果坐标重复返回true，否则返回false
     */
    private isLineCoordinatesDuplicated;
}

/**
 * DXF门实体接口
 */
export declare interface DxfDoorEntity {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    color?: number;
    pipeId: string;
    position: DxfPosition;
    relativePosition: number;
    direction: string;
    state?: 'open' | 'closed';
    nodeId?: string;
}

/**
 * DXF实体类型
 */
export declare type DxfEntity = DxfLineEntity | DxfFanEntity | DxfWindEntity | DxfDoorEntity | DxfMainEntity | DxfSensorEntity;

/**
 * DXF实体对象
 */
export declare interface DxfEntityObject {
    type: string;
    vertices: DxfPosition[];
    color: number;
    name?: string;
    handle?: string;
    layer?: string;
    mode?: string;
    startName?: string;
    endName?: string;
    angle?: number;
    width?: number;
    height?: number;
    nodeId?: string;
    groupId?: string;
}

/**
 * DXF风机实体接口
 */
export declare interface DxfFanEntity {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    color?: number;
    pipeId: string;
    position: DxfPosition;
    relativePosition: number;
    direction: string;
    velocity: number;
    pressure: number;
    rotationSpeed?: number;
    nodeId?: string;
}

/**
 * DXF JSON接口
 */
export declare interface DxfJson {
    header?: any;
    tables?: {
        layer?: {
            layers: {
                [key: string]: DxfLayer;
            };
        };
    };
    blocks?: any;
    nodes?: any;
    groups?: any;
    links?: any[];
    params?: any[];
    splines?: any[];
    emulators?: any[];
    entities: DxfEntity[];
    config?: SetConfig;
}

/**
 * DXF标签对象
 */
export declare interface DxfLabelObject {
    type: string;
    color: number;
    name?: string;
    handle?: string;
}

/**
 * DXF图层接口
 */
export declare interface DxfLayer {
    name: string;
    frozen: boolean;
    visible: boolean;
    colorIndex: number;
    color: number;
}

/**
 * DXF线实体接口
 */
export declare interface DxfLineEntity {
    id: string;
    type: 'LINE';
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    startName: string;
    endName: string;
    vertices: DxfPosition[];
    sensors?: string[];
    size?: number;
    width?: number;
    height?: number;
    color?: number;
    mode?: string;
    length?: number;
    angle?: number;
    nodeId?: string;
}

/**
 * DXF主要实体接口
 */
export declare interface DxfMainEntity {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    color?: number;
    pipeId: string;
    position: DxfPosition;
    relativePosition: number;
    direction: string;
    state?: 'open' | 'closed';
    nodeId?: string;
}

/**
 * DXF标准化参数接口
 */
export declare interface DxfNormalizationParams {
    center: {
        x: number;
        y: number;
        z: number;
    };
    scale: number;
}

/**
 * DXF坐标接口
 */
export declare interface DxfPosition {
    x: number;
    y: number;
    z: number;
}

/**
 * DXF传感器实体接口
 */
export declare interface DxfSensorEntity {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    color?: number;
    pipeId: string;
    position: DxfPosition;
    relativePosition: number;
    direction: string;
    state?: 'open' | 'closed';
    nodeId?: string;
    sensors: string[];
}

/**
 * DXF坐标变换参数 - 三维坐标
 */
export declare interface DxfTransformParams {
    x: number;
    y: number;
    z: number;
}

/**
 * DXF风力实体接口
 */
export declare interface DxfWindEntity {
    id: string;
    type: string;
    name: string;
    handle: string;
    layer: string;
    colorIndex: number;
    color?: number;
    pipeId: string;
    position: DxfPosition;
    relativePosition: number;
    direction: string;
    nodeId?: string;
}

/**
 * Entities - 处理实体操作
 */
export declare class Entities implements IEntities {
    private app;
    pipes: IPipe[];
    fans: IFan[];
    shapes: IShape[];
    sprites: ISprite[];
    labels: IText[];
    points: IPoint[];
    links: IPoint[];
    ducts: IDuct[];
    params: Params[];
    config: SetConfig;
    selected: IPipe | IFan | IShape | ISprite | IPoint | null;
    group: THREE.Group;
    label: THREE.Group;
    point: THREE.Group;
    link: THREE.Group;
    emulate: THREE.Group;
    height: THREE.Group;
    heightLabels: IText[];
    scale: number;
    center: Position;
    constructor(app: IApp);
    generateUniqueId(): string;
    setConfig(config: SetConfig): void;
    clearLabel(): void;
    createLabel(id: string, innerHTML: string): void;
    addPipe(properties: PanelData): IPipe | null;
    updatePipe(pipeId: string, properties: PanelData): boolean;
    removePipe(pipeId: string): boolean;
    addFan(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IFan | null;
    updateFan(fanId: string, properties: PanelData): boolean;
    removeFan(fanId: string): boolean;
    addShape(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IShape | null;
    addSprite(pipe: IPipe, position: THREE.Vector3, properties: PanelData): ISprite | null;
    updateShape(shapeId: string, properties: PanelData): boolean;
    updateSprite(spriteId: string, properties: PanelData): boolean;
    removeShape(shapeId: string): boolean;
    removeSprite(spriteId: string): boolean;
    addDuct(pipe: IPipe, properties?: PanelData): IDuct | null;
    addDuctsToPipes(pipeIds: string[]): IDuct[];
    updateDuct(ductId: string, properties: PanelData): boolean;
    removeDuct(ductId: string): boolean;
    removeDuctByPipeId(pipeId: string): boolean;
    updateProperties(id: string, newProperties: PanelData): boolean;
    remove(id: string): boolean;
    findById(id: string): IPipe | IFan | IShape | ISprite | IPoint | null;
    select(object: IPipe | IFan | IShape | IPoint | null): void;
    clear(): void;
    serialize(): SceneState;
    deserialize(data: SceneData): boolean;
    restorePipe(pipeData: PipeJSON, pipeMap: Map<string, IPipe>): void;
    restoreFan(fanData: FanJSON, pipeMap: Map<string, IPipe>): void;
    restoreShape(shapeData: ShapeJSON, pipeMap: Map<string, IPipe>): void;
    restoreSprite(spriteData: SpriteJSON, pipeMap: Map<string, IPipe>): void;
    restoreDuct(ductData: DuctJSON, pipeMap: Map<string, IPipe>): void;
    getDuctByPipeId(pipeId: string): IDuct | null;
    getSceneData(): SceneData;
    addPoint(properties: PanelData, position?: THREE.Vector3): IPoint;
    removePoint(id: string): boolean;
    updatePoint(id: string, properties: PanelData): boolean;
    addLink(properties: PanelData, position?: THREE.Vector3): IPoint;
    removeLink(id: string): boolean;
    updateLink(id: string, properties: PanelData): boolean;
    updateParams(properties: PanelData): void;
    deleteParams(id: string): void;
    createHeightLabels(): void;
    updateHeightLabels(): void;
    clearHeightLabels(): void;
    showHeightLabels(visible: boolean): void;
}

/**
 * 实体JSON表示
 */
export declare interface EntitiesJSON {
    pipes: PipeJSON[];
    fans: FanJSON[];
}

/**
 * 实体类型选项配置
 */
declare interface EntityOptionConfig {
    value: string;
    label: string;
}

/**
 * 事件监听器接口
 */
declare interface EventListener_2 {
    addEventListener<K extends keyof AppEventMap>(event: K, callback: (event: AppEventMap[K]) => void): void;
    removeEventListener<K extends keyof AppEventMap>(event: K, callback: (event: AppEventMap[K]) => void): void;
    dispatchEvent(event: SelectEvent | ClearEvent | LoadedEvent | ReadedEvent | UpdateEvent | MultiSelectEvent | VisibilityEvent | BatchMoveEvent | MessageEvent_2 | AppEvent): void;
}
export { EventListener_2 as EventListener }

/**
 * 扩展的射线检测结果
 */
export declare interface ExtendedIntersect extends THREE.Intersection {
    object: THREE.Object3D & {
        userData?: {
            id?: string;
            type?: string;
            isFan?: boolean;
            [key: string]: any;
        };
    };
}

/**
 * 扩展材质类型以包含color属性和emissive属性
 */
export declare interface ExtendedMaterial extends THREE.Material {
    color?: THREE.Color;
    emissive?: THREE.Color;
    emissiveIntensity?: number;
}

/**
 * 扩展THREE.Object3D以包含geometry和material属性
 */
export declare interface ExtendedObject3D extends THREE.Object3D {
    geometry?: THREE.BufferGeometry;
    material?: ExtendedMaterial | ExtendedMaterial[];
}

/**
 * 扩展的THREE.Vector3类型，带额外属性
 */
export declare interface ExtendedVector3 extends THREE.Vector3 {
    isSnapped?: boolean;
    attachedToPipe?: string;
}

/**
 * Fan - 风机对象
 */
export declare class Fan implements IFan, Updatable {
    id: string;
    name: string;
    type: string;
    pipe: IPipe;
    position: THREE.Vector3;
    velocity: number;
    pressure: number;
    direction: string;
    relativePosition: number;
    mesh: THREE.Mesh;
    animationTime: number;
    originalMaterials: THREE.Material[];
    originalUvs?: THREE.Vector2[];
    constructor(pipe: IPipe, position: THREE.Vector3, properties: Properties);
    createFan(): void;
    calculateRelativePosition(): void;
    calculatePositionOnPipe(): THREE.Vector3;
    updatePosition(): void;
    update(delta: number): void;
    getRotationSpeed(): number;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): FanJSON;
}

/**
 * 风机JSON表示
 */
export declare interface FanJSON {
    id: string;
    type: string;
    name: string;
    handle?: string;
    layer?: string;
    colorIndex?: number;
    color?: number;
    pipeId: string;
    nodeId: string;
    groupId: string;
    position: Position;
    relativePosition: number;
    velocity: number;
    pressure: number;
    direction: string;
}

/**
 * 风机属性接口
 */
export declare interface FanProperties {
    id: string;
    name: string;
    type: string;
    velocity: number;
    pressure: number;
    direction: string;
    pipeId: string;
}

/**
 * 风机属性接口
 */
export declare interface FanProps {
    velocity: number;
    pressure: number;
    direction: string;
    color: number;
}

/**
 * Generate - 中段自动生成处理类
 */
export declare class Generate {
    private app;
    private centerZ;
    private heightOffset;
    private binSize;
    private neighborRange;
    private mergeThreshold;
    private minCount;
    private groundLevelThreshold;
    private generatedNodes;
    private generatedGroups;
    private sectionInfoList;
    constructor(app: IApp);
    setCenterZ(centerZ: number): void;
    setHeightOffset(offset: number): void;
    getRealHeight(y: number): number;
    reset(): void;
    getSectionInfoList(): SectionInfo[];
    /**
     * 根据Y轴坐标确定所属中段和分组
     */
    getSectionByY(y: number, defaultNodeId?: string, defaultGroupId?: string): {
        nodeId: string;
        groupId: string;
    };
    /**
     * 生成中段
     */
    generateSections(level: number, entityDataList: DxfEntityObject[]): void;
    /**
     * 按固定间隔划分
     */
    private generateByFixedInterval;
    /**
     * 基于局部最大值检测
     */
    private generateByAutoDetection;
    /**
     * 合并相同的聚类
     */
    private mergeSameLevelClusters;
    /**
     * 检测局部最大值
     */
    private detectLocalMaxima;
    /**
     * 从峰值组创建聚类
     */
    private createClusterFromPeaks;
    /**
     * 添加中段
     */
    private addSection;
    /**
     * 触发生成完成事件
     */
    private dispatchSectionsGenerated;
}

/**
 * GridHelper - 网格辅助工具
 */
export declare class GridHelper implements IGridHelper {
    private app;
    private gridMesh;
    private axisGroup;
    private labels;
    private scale_;
    private gridSize_;
    private divisions_;
    group: THREE.Group;
    constructor(app: IApp);
    /**
     * 从config获取gridSize配置
     */
    private getConfigGridSize;
    /**
     * 从config获取scale配置
     */
    private getConfigScale;
    /**
     * 创建网格
     */
    private createGridMesh;
    /**
     * 创建坐标轴组
     */
    private createAxisGroup;
    /**
     * 创建坐标轴线
     */
    private createAxes;
    /**
     * 创建刻度标签
     */
    private createLabels;
    private createLabel;
    private createTickMark;
    private formatValue;
    /**
     * 清除坐标轴
     */
    private clearAxis;
    /**
     * 清除网格
     */
    private clearGridMesh;
    /**
     * 重建坐标轴
     */
    private rebuildAxis;
    /**
     * 重建整个网格
     */
    private rebuild;
    /**
     * 设置比例尺
     */
    setScale(scale: number): void;
    /**
     * 获取比例尺
     */
    getScale(): number;
    /**
     * 设置网格尺寸
     */
    setGridSize(size: number): void;
    /**
     * 获取网格尺寸
     */
    getGridSize(): number;
    /**
     * 从config刷新配置
     */
    refresh(): void;
    /**
     * 设置可见性
     */
    setVisible(visible: boolean): void;
    /**
     * 获取可见性
     */
    getVisible(): boolean;
    /**
     * 切换可见性
     */
    toggleVisible(): void;
    /**
     * 设置坐标轴可见性
     */
    setAxisVisible(visible: boolean): void;
    /**
     * 销毁
     */
    dispose(): void;
}

/**
 * 分组项
 */
export declare type GroupItem = {
    pId: string;
    label: string;
    value: string;
};

/**
 * Helper - 场景导航辅助器
 */
export declare class Helper implements IHelper {
    private app;
    viewHelper: ViewHelper;
    container: HTMLElement;
    animating: boolean;
    renderer: THREE.WebGLRenderer;
    constructor(app: IApp);
    /**
     * 更新方法，用于动画
     */
    update(delta?: number): void;
    /**
     * 渲染方法
     */
    render(): void;
    /**
     * 清理资源
     */
    dispose(): void;
}

/**
 * History - 处理历史记录
 */
declare class History_2 implements IHistory {
    private app;
    history: HistoryAction[];
    index: number;
    maxSize: number;
    isExecutingUndo: boolean;
    isExecutingRedo: boolean;
    constructor(app: IApp);
    addAction(action: HistoryAction): void;
    redo(): HistoryAction | null;
    undo(): HistoryAction | null;
    clear(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    createAddPipeAction(pipe: any): HistoryAction;
    createRemovePipeAction(pipe: any): HistoryAction;
    createUpdatePipeAction(pipe: any, data: any): HistoryAction;
    createAddFanAction(fan: any): HistoryAction;
    createRemoveFanAction(fan: any): HistoryAction;
    createUpdateFanAction(properties: any, data: any): HistoryAction;
    createAddShapeAction(shape: IShape): HistoryAction;
    createRemoveShapeAction(shape: IShape): HistoryAction;
    createUpdateShapeAction(shape: IShape, properties: Properties): HistoryAction;
    executeAction(action: HistoryAction): boolean;
    executeUndo(action: HistoryAction): boolean;
    getStats(): HistoryStats;
}
export { History_2 as History }

/**
 * 动作接口
 */
export declare interface HistoryAction {
    type: string;
    data: any;
}

/**
 * 状态接口
 */
export declare interface HistoryStats {
    total: number;
    current: number;
    canUndo: boolean;
    canRedo: boolean;
}

/**
 * 操作处理
 */
export declare interface IAction {
    stopDrawing(): void;
    startDrawing(properties: Properties): void;
    addPipe(properties: Properties): IPipe | null;
    updatePipe(pipeId: string, newProperties: Properties): boolean;
    removePipe(pipeId: string): boolean;
    addFan(pipe: IPipe, position: THREE.Vector3, properties: Properties): IFan | null;
    updateFan(fanId: string, newProperties: Properties): boolean;
    removeFan(fanId: string): boolean;
    addShape(pipe: IPipe, position: THREE.Vector3, properties: Properties): IShape | null;
    updateShape(shapeId: string, newProperties: Properties): boolean;
    removeShape(shapeId: string): boolean;
    addSprite(pipe: IPipe, position: THREE.Vector3, properties: Properties): ISprite | null;
    updateSprite(spriteId: string, newProperties: Properties): boolean;
    removeSprite(spriteId: string): boolean;
    removeBatch(ids: string[]): boolean;
    updateBatch(properties: Properties[]): boolean;
    addRamp(segmentPropertiesArray: Properties[]): IPipe[];
    handleFileUpload(file: File, properties: Properties): Promise<boolean | null>;
    parseDwgData(properties: PanelData): void;
    handleUndo(): boolean;
    handleRedo(): boolean;
    saveScene(name?: string): Promise<string> | any;
    loadScene(sceneId: string): Promise<boolean>;
}

/**
 * 风筒接口
 */
export declare interface IAirduct {
    createAirduct(ids: string[]): void;
    updateAirduct(pipeId: string): void;
    removeAirduct(pipeId: string): void;
    clearAirducts(): void;
}

/**
 * 应用程序接口
 */
export declare interface IApp {
    container: HTMLElement;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    css3d: CSS3DRenderer;
    css2d: CSS2DRenderer;
    composer: EffectComposer;
    outline: OutlinePass;
    controls: OrbitControls;
    listener: EventListener_2;
    message: IMessage;
    raycaster: THREE.Raycaster;
    resizer: IResizer;
    storage: IStorage;
    history: IHistory;
    action: IAction;
    entities: IEntities;
    tween: ITween;
    loop: ILoop;
    draw: IDraw;
    view: IView;
    ramp: IRamp;
    link: ILink;
    dxf: IDxfManager;
    helper: IHelper;
    spline: ISpline;
    state: string;
    last: string;
    schemeId?: string;
    schemeState?: boolean;
    innerWidth: number;
    innerHeight: number;
    grid: IGridHelper;
    dwg: IDwgManager;
    disaster: IDisaster;
    detection: IDetection;
    select: ISelect;
    move: IMove;
    keyMap: {
        [key: string]: string;
    };
    keyConfig: KeyConfig;
    createCamera(): void;
    createScene(): void;
    createRenderer(): void;
    createCSS3D(): void;
    createComposer(): void;
    createLights(): void;
    createControls(): void;
    createGrid(): void;
    setupKeyEvents(): void;
    bindMouseEvents(): void;
    loadTexture(file: string): Promise<THREE.Texture>;
    loadFile(file: string): Promise<string | ArrayBuffer>;
    loadGltf(file: string): Promise<any>;
    loadFileReader(file: File): Promise<string | ArrayBuffer>;
    render(): void;
    start(): void;
    stop(): void;
    destroy(): void;
    init(): Promise<void>;
    initEditor(): Promise<void>;
    initSpline(value: boolean): void;
    initLink(value: boolean): void;
    initDisaster(value: boolean): void;
    initDetection(value: boolean): void;
    initSelect(value: boolean): void;
    initRamp(properties: Properties | undefined): void;
    onUpload(file: File, properties: Properties): Promise<any>;
    onAction(properties: any): void;
    onRunDisaster(data: SimulationDisasterData): void;
    onUndo(): void;
    onRedo(): void;
    onClear(): boolean;
    onSave(nodes: NodeItem[], groups: GroupItem[]): boolean;
    setCameraAndControls(boundingBox?: THREE.Box3): void;
    setCameraZoomAnimation(model: THREE.Object3D, range: number): void;
    setKeyConfig(data: KeyConfig): void;
}

/**
 * 检测接口
 */
export declare interface IDetection {
    init(value: boolean): void;
    start(values: string[]): void;
    update(values: string[]): void;
    clear(): void;
    dispose(): void;
}

/**
 * 灾难模拟接口
 */
export declare interface IDisaster {
    init(value: boolean): void;
    start(contamination: any[], path: any[]): void;
    stop(): void;
    clear(): void;
    dispose(): void;
}

/**
 * 绘制管理
 */
export declare interface IDraw {
    temp: ITemp;
    plane: THREE.Mesh;
    group: THREE.Group;
    drawing: boolean;
    points: THREE.Vector3[];
    startPoint: THREE.Vector3 | null;
    currentPoint: THREE.Vector3 | null;
    hoveredPipe: IPipe | null;
    mouse: THREE.Vector2;
    mouseStart: THREE.Vector2;
    isDrawing: boolean;
    isDragging: boolean;
    properties: Properties;
    continuousMode: boolean;
    lastPipe: IPipe | null;
    highlightedPipe: IPipe | null;
    lastClickTime: number;
    originalPlanePosition: THREE.Vector3;
    snapIndicator?: THREE.Object3D | null;
    startDrawing(properties: Properties): void;
    handleMouseMove(event: MouseEvent): void;
    handleFanMouseMove(): void;
    handleShapeMouseMove(): void;
    handlePipeMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleFanMouseDown(): void;
    handleShapeMouseDown(): void;
    handlePipeMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handlePipeMouseUp(isDoubleClick: boolean): void;
    adjustPlaneHeight(height: number): void;
    resetPlaneHeight(): void;
    updateProperties(newProperties: Partial<Properties>): Properties;
    findNearestPipeEndpoint(pointer: THREE.Vector2): ExtendedVector3 | null;
    highlightPipe(pipe: IPipe): void;
    clearPipeHighlight(pipe: IPipe): void;
    clearAllPipeHighlights(): void;
    getPointFromMouse(event: MouseEvent): ExtendedVector3 | null;
    worldToScreen(worldPos: THREE.Vector3): THREE.Vector2;
    calculateSlopePoint(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, angle: number): THREE.Vector3;
    cancel(): void;
    clear(): void;
}

/**
 * 风筒实体接口
 */
export declare interface IDuct {
    id: string;
    name: string;
    type: string;
    pipe: IPipe;
    mesh: THREE.Object3D;
    setSelected(selected: boolean): void;
    updateProperties(properties: Properties): boolean;
    updatePosition(): void;
    dispose(): void;
    toJSON(): DuctJSON;
}

/**
 * DWG管理器接口
 */
export declare interface IDwgManager {
    initialize(wasmPath?: string): Promise<void>;
    parseDwg(fileContent: ArrayBuffer): Promise<any>;
    loadFromFile(file: File): Promise<any>;
    parseDwgData(entities: DwgEntity[], properties: PanelData): void;
}

/**
 * DXF管理器
 */
export declare interface IDxfManager {
    parseDxfContent(content: string): DxfJson | false;
    parseDxfFile(content: string, properties: PanelData): void;
}

/**
 * 实体管理
 */
export declare interface IEntities {
    pipes: IPipe[];
    fans: IFan[];
    shapes: IShape[];
    sprites: ISprite[];
    points: IPoint[];
    links: IPoint[];
    ducts: IDuct[];
    params: Params[];
    config: SetConfig | null;
    selected: IPipe | IFan | IShape | ISprite | IPoint | null;
    group: THREE.Group;
    label: THREE.Group;
    point: THREE.Group;
    link: THREE.Group;
    emulate: THREE.Group;
    height: THREE.Group;
    heightLabels: IText[];
    scale: number;
    center: Position;
    generateUniqueId(): string;
    setConfig(config: SetConfig): void;
    clearLabel(): void;
    createLabel(id: string, name: string): void;
    addPipe(properties: PanelData): IPipe | null;
    addFan(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IFan | null;
    addShape(pipe: IPipe, position: THREE.Vector3, properties: PanelData): IShape | null;
    addSprite(pipe: IPipe, position: THREE.Vector3, properties: PanelData): ISprite | null;
    addPoint(properties: PanelData, position?: THREE.Vector3): IPoint;
    addDuct(pipe: IPipe, properties?: PanelData): IDuct | null;
    addDuctsToPipes(pipeIds: string[]): IDuct[];
    updatePipe(pipeId: string, properties: PanelData): boolean;
    updateFan(fanId: string, properties: PanelData): boolean;
    updateShape(shapeId: string, properties: PanelData): boolean;
    updateSprite(spriteId: string, properties: PanelData): boolean;
    updatePoint(id: string, properties: PanelData): boolean;
    updateDuct(ductId: string, properties: PanelData): boolean;
    removePipe(pipeId: string): boolean;
    removeFan(fanId: string): boolean;
    removeShape(shapeId: string): boolean;
    removeSprite(spriteId: string): boolean;
    removePoint(id: string): boolean;
    removeDuct(ductId: string): boolean;
    removeDuctByPipeId(pipeId: string): boolean;
    getDuctByPipeId(pipeId: string): IDuct | null;
    getSceneData(): SceneData;
    findById(id: string): IPipe | IFan | IShape | ISprite | IPoint | null;
    select(object: IPipe | IFan | IShape | ISprite | IPoint | null): void;
    clear(): void;
    serialize(): SceneState;
    deserialize(data: SceneData): boolean;
    restorePipe(pipeData: PipeJSON, pipeMap: Map<string, IPipe>): void;
    restoreFan(fanData: FanJSON, pipeMap: Map<string, IPipe>): void;
    restoreShape(shapeData: ShapeJSON, pipeMap: Map<string, IPipe>): void;
    restoreSprite(spriteData: SpriteJSON, pipeMap: Map<string, IPipe>): void;
    restoreDuct(ductData: DuctJSON, pipeMap: Map<string, IPipe>): void;
    addLink(properties: PanelData, position?: THREE.Vector3): IPoint;
    removeLink(id: string): boolean;
    updateLink(id: string, properties: PanelData): boolean;
    updateParams(properties: PanelData): void;
    createHeightLabels(): void;
    updateHeightLabels(): void;
    clearHeightLabels(): void;
    showHeightLabels(visible: boolean): void;
}

/**
 * 风机实体接口
 */
export declare interface IFan {
    id: string;
    name: string;
    type: string;
    pipe: IPipe;
    position: THREE.Vector3;
    mesh: THREE.Object3D;
    setSelected(selected: boolean): void;
    updateProperties(properties: Properties): boolean;
    dispose(): void;
    toJSON(): FanJSON;
    updatePosition(): void;
    calculateRelativePosition(): void;
    calculatePositionOnPipe(): THREE.Vector3;
}

/**
 * 网格辅助工具（组合模式，包含网格和坐标轴标尺）
 */
export declare interface IGridHelper {
    group: THREE.Group;
    setScale(scale: number): void;
    getScale(): number;
    setGridSize(size: number): void;
    getGridSize(): number;
    refresh(): void;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    toggleVisible(): void;
    setAxisVisible(visible: boolean): void;
    dispose(): void;
}

/**
 * 场景导航
 */
export declare interface IHelper {
    viewHelper: any;
    container: HTMLElement;
    animating: boolean;
    renderer: THREE.WebGLRenderer;
    update(delta?: number): void;
    render(): void;
    dispose(): void;
}

/**
 * 历史记录
 */
export declare interface IHistory {
    history: HistoryAction[];
    index: number;
    maxSize: number;
    isExecutingUndo: boolean;
    isExecutingRedo: boolean;
    addAction(action: HistoryAction): void;
    redo(): HistoryAction | null;
    undo(): HistoryAction | null;
    clear(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    createAddPipeAction(pipe: any): HistoryAction;
    createRemovePipeAction(pipe: any): HistoryAction;
    createUpdatePipeAction(oldPipe: any, newProperties: any): HistoryAction;
    createAddFanAction(fan: any): HistoryAction;
    createRemoveFanAction(fan: any): HistoryAction;
    createUpdateFanAction(oldFan: any, newProperties: any): HistoryAction;
    createAddShapeAction(shape: IShape): HistoryAction;
    createRemoveShapeAction(shape: IShape): HistoryAction;
    createUpdateShapeAction(shape: IShape, oldProperties: Properties): HistoryAction;
    executeAction(action: HistoryAction): boolean;
    executeUndo(action: HistoryAction): boolean;
    getStats(): HistoryStats;
}

/**
 * 文本标注接口
 */
export declare interface ILabel {
    id: string;
    pId: string;
    text: string;
    position: THREE.Vector3;
    color: number;
    size: number;
    sprite: THREE.Sprite | null;
    mesh: THREE.Object3D;
    setText(text: string): void;
    setPosition(position: THREE.Vector3): void;
    setColor(color: number): void;
    setSize(size: number): void;
    setVisible(visible: boolean): void;
    dispose(): void;
}

/**
 * 链接工具接口
 */
export declare interface ILink {
    mouse: THREE.Vector2;
    temp: ITemp;
    group: THREE.Group;
    initPoint(visible: boolean): void;
    updatePoint(): void;
    updateNodePosition(nodeId: string, position: {
        x: number;
        y: number;
        z: number;
    }): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
}

/**
 * 动画循环
 */
export declare interface ILoop {
    updatables: Array<Updatable | any>;
    clock: THREE.Clock;
    start(): void;
    stop(): void;
    tick(): void;
    remove(object: any): boolean;
}

/**
 * 消息处理接口
 */
declare interface IMessage {
    send(code: number): void;
    info(code: number): void;
    warn(code: number): void;
    error(code: number): void;
}

/**
 * 批量移动工具接口
 */
export declare interface IMove {
    active: boolean;
    toggle(): void;
    start(): void;
    end(): void;
    cancel(): void;
    getDisplacement(): THREE.Vector3 | null;
    hasMovement(): boolean;
    getOriginalCoordinates(): Array<{
        id: string;
        vertices: Array<{
            x: number;
            y: number;
            z: number;
        }>;
    }>;
    getMovedCoordinates(): Array<{
        id: string;
        vertices: Array<{
            x: number;
            y: number;
            z: number;
        }>;
    }>;
    dispose(): void;
}

/**
 * 管道实体接口
 */
export declare interface IPipe {
    id: string;
    handle: string;
    name: string;
    startName: string;
    endName: string;
    nodeId: string;
    groupId: string;
    startLinkId: string;
    endLinkId: string;
    startPoint: THREE.Vector3;
    endPoint: THREE.Vector3;
    direction: THREE.Vector3;
    mesh: THREE.Mesh;
    size: number;
    width: number;
    height: number;
    length: number;
    angle: number;
    color: number;
    sensors: string[];
    originalMaterial: THREE.Material | THREE.Material[];
    setSelected(selected: boolean): void;
    setMultiSelected(selected: boolean): void;
    updateProperties(properties: Properties): boolean;
    dispose(): void;
    toJSON(): PipeJSON;
}

/**
 * 球体对象接口
 */
export declare interface IPoint {
    id: string;
    name: string;
    type: string;
    distance: number;
    radian: number;
    angle: number;
    mesh: THREE.Mesh;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): PointJSON;
}

/**
 * 斜坡工具接口
 */
export declare interface IRamp {
    properties: Properties;
    initRamp(properties: Properties | undefined): void;
    handleUpdate(properties: Properties): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handleDoubleClick?(event: MouseEvent): void;
    setPointFromCoordinates(type: 'start' | 'end', position: {
        x: number;
        y: number;
        z: number;
    }): void;
    clearPoints(type?: 'start' | 'end' | 'all'): void;
    cancel(): void;
}

/**
 * 窗口更新
 */
export declare interface IResizer {
    setSize(): void;
    onResize(): void;
    dispose(): void;
}

/**
 * 框选工具接口
 */
export declare interface ISelect {
    initSelect(value: boolean): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    cancel(): void;
    clearSelection(): void;
    getSelectedIds(): string[];
    setSelectionByIds(ids: string[]): void;
    appendSelection(pipes: IPipe[]): void;
    removeFromSelection(pipes: IPipe[]): void;
    dispose(): void;
}

/**
 * 构筑物实体接口
 */
export declare interface IShape {
    id: string;
    pipe: IPipe;
    position: THREE.Vector3;
    mesh: THREE.Object3D;
    type: string;
    name: string;
    sensors: string[];
    direction: string;
    relativePosition: number;
    string1?: string;
    string2?: string;
    string3?: string;
    number1?: number;
    number2?: number;
    number3?: number;
    setSelected(selected: boolean): void;
    updateProperties(properties: Properties): boolean;
    dispose(): void;
    toJSON(): ShapeJSON;
    updatePosition(): void;
    calculateRelativePosition(): void;
    calculatePositionOnPipe(): THREE.Vector3;
}

/**
 * 样条曲线接口
 */
export declare interface ISpline extends Updatable {
    handleSave(): void;
    handleCreate(): void;
    handlePreview(): void;
    handleDelete(properties: Properties): void;
    handleUpdate(properties: Properties): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    dispose(): void;
    update(delta: number): void;
    updateSpline(): void;
    handleSwitch(): void;
    initSpline(value: boolean): void;
}

/**
 * 精灵实体接口
 */
export declare interface ISprite {
    id: string;
    pipe: IPipe;
    position: THREE.Vector3;
    mesh: THREE.Object3D;
    type: string;
    name: string;
    setSelected(selected: boolean): void;
    updateProperties(properties: Properties): boolean;
    updatePosition(): void;
    dispose(): void;
    toJSON(): SpriteJSON;
}

/**
 * 数据存储
 */
export declare interface IStorage {
    db: IDBDatabase | null;
    dbName: string;
    dbVersion: number;
    storeName: string;
    lastSavedState: any;
    init(): Promise<IDBDatabase>;
    saveScene(sceneData: SceneState): Promise<string>;
    getScene(id: string): Promise<SceneState>;
    getLastScene(): Promise<SceneState | null>;
    getAllScenes(): Promise<SceneState[]>;
    getScenesList(): Promise<SceneMeta[]>;
    deleteScene(id: string): Promise<boolean>;
    clearAllScenes(): Promise<boolean>;
    createSceneVersion(id: string, name?: string): Promise<string>;
    getSceneVersions(originalId: string): Promise<SceneState[]>;
    exportSceneToJSON(id: string): Promise<boolean>;
    importSceneFromJSON(jsonContent: string): Promise<string>;
    getCurrentSceneState(): SceneState;
    restoreSceneState(sceneData: SceneState): boolean;
}

/**
 * 临时对象
 */
export declare interface ITemp {
    tempPipe: TempPipeMesh | null;
    tempFan: TempFanGroup | null;
    tempShape: TempFanGroup | null;
    tempSprite: TempSpriteGroup | null;
    currentFanPosition: THREE.Vector3 | null;
    currentShapePosition: THREE.Vector3 | null;
    currentSpritePosition: THREE.Vector3 | null;
    createTempPipe(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, properties: Properties): TempPipeMesh | null;
    updateTempPipe(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, properties: Properties): void;
    createTempFan(pipe: IPipe, position: THREE.Vector3): void;
    updateTempFan(pipe: IPipe, position: THREE.Vector3): void;
    createTempShape(pipe: IPipe, position: THREE.Vector3): void;
    updateTempShape(pipe: IPipe, position: THREE.Vector3): void;
    createTempSprite(pipe: IPipe, position: THREE.Vector3): void;
    updateTempSprite(pipe: IPipe, position: THREE.Vector3): void;
    clear(): void;
}

/**
 * CSS2D 文本接口
 */
export declare interface IText {
    id: string;
    pId: string;
    text: string;
    position: THREE.Vector3;
    mesh: CSS2DObject;
    setText(text: string): void;
    setPosition(position: THREE.Vector3): void;
    setUpdate(app: any): void;
    dispose(): void;
}

/**
 * 时间点接口
 */
export declare interface ITimes {
    arrivalTime: number;
    itemId: string;
}

/**
 * 动画管理
 */
export declare interface ITween {
    tweens: Array<any>;
    animateCamera(targetPosition: THREE.Vector3, targetCenter: THREE.Vector3): void;
    dispose(): void;
}

/**
 * 视图模块
 */
export declare interface IView {
    mouse: THREE.Vector2;
    selectedObject: THREE.Object3D | null;
    hoveredObject: THREE.Object3D | null;
    isDragging: boolean;
    lastClickTime: number;
    entitieId: string;
    selectedObjects: THREE.Object3D[];
    isMultiSelecting: boolean;
    backToCenter(reset: boolean): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    applyHoverEffect(object: THREE.Object3D): void;
    resetHoverEffect(object: THREE.Object3D): void;
    resetSelectionEffect(object: THREE.Object3D): void;
    updateProperties(newProperties: PanelData): void;
    updatePipeSlope(angle: number): void;
    removeProperties(): boolean;
    removeBatch(ids: string[]): boolean;
    updateBatch(ids: string[], properties: PanelData): boolean;
    setCameraZoomAnimation(model: THREE.Object3D, range: number, face?: number): void;
    updatePipePosition(properties: PanelData): void;
    createAirducts(ids: string[]): void;
    updateAirduct(pipeId: string): void;
    removeAirduct(pipeId: string): void;
    clearAirducts(): void;
    cancel(): void;
    applyMultiSelectEffect(object: THREE.Object3D): void;
    clearMultiSelection(): void;
    getMultiSelectedIds(): string[];
    syncMultiSelectionByIds(ids: string[]): void;
    setVisibilityByIds(ids: string[], visible: boolean): void;
}

/**
 * 快捷键配置
 */
export declare interface KeyConfig {
    hiddenKey: string;
    showKey: string;
    gridKey: string;
    boxKey: string;
    undoKey: string;
    redoKey: string;
    deleteKey: string;
    upKey: string;
    downKey: string;
    frontKey: string;
    afterKey: string;
    leftKey: string;
    rightKey: string;
    batchMoveKey: string;
}

export declare class Label implements ILabel {
    id: string;
    pId: string;
    text: string;
    position: THREE.Vector3;
    color: number;
    size: number;
    sprite: THREE.Sprite | null;
    mesh: THREE.Object3D;
    private visible;
    private fontFace;
    private fontSize;
    private backgroundColor;
    private padding;
    private spriteMaterial;
    private spriteMap;
    constructor(options: {
        id?: string;
        pId?: string;
        text: string;
        position: THREE.Vector3;
        color?: number;
        size?: number;
        fontFace?: string;
        fontSize?: number;
        backgroundColor?: string | null;
        padding?: number;
    });
    setText(text: string): void;
    setPosition(position: THREE.Vector3): void;
    setColor(color: number): void;
    setSize(size: number): void;
    setVisible(visible: boolean): void;
    dispose(): void;
    private getColorString;
}

export declare class Link implements ILink {
    private app;
    mouse: THREE.Vector2;
    snapDistance: number;
    selectedNode: IPoint | null;
    isDragging: boolean;
    isMouseDown: boolean;
    mouseDownPosition: THREE.Vector2 | null;
    dragThreshold: number;
    originalPosition: THREE.Vector3 | null;
    affectedPipes: {
        pipe: IPipe;
        isStart: boolean;
    }[];
    group: THREE.Group;
    temp: Temp;
    snapIndicator: THREE.Object3D | null;
    snapTargetNode: IPoint | null;
    constructor(app: IApp);
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    private startDragging;
    handleMouseUp(event: MouseEvent): void;
    private selectNode;
    updateNodePosition(nodeId: string, position: {
        x: number;
        y: number;
        z: number;
    }): void;
    initPoint(visible: boolean): void;
    updatePoint(): void;
    private createTempPipes;
    private updateTempPipes;
    private clearAllTempObjects;
    private updateAffectedPipes;
    private highlightHoveredNode;
    cancel(): void;
    private findNearestSnapNode;
    private worldToScreen;
    private handleNodeSnap;
    private calculateAngle;
}

/**
 * 加载完成事件
 */
export declare interface LoadedEvent extends AppEvent {
    type: 'loaded';
}

/**
 * 配置
 */
declare interface LocaleConfig {
    /** 实体类型选项 */
    entityOptions?: EntityOptionConfig[];
    /** 默认名称 */
    defaultNames?: DefaultNameConfig;
}

/**
 * Loop - 场景渲染循环
 */
export declare class Loop implements ILoop {
    private app;
    updatables: Array<Updatable | any>;
    clock: THREE.Clock;
    private lastFrameTime;
    private frameCount;
    private performanceWarningThreshold;
    /**
     * 创建动画循环
     * @param app 应用程序实例
     */
    constructor(app: IApp);
    /**
     * 开始渲染循环
     */
    start(): void;
    /**
     * 停止渲染循环
     */
    stop(): void;
    /**
     * 更新所有可更新对象
     */
    tick(): void;
    /**
     * 移除可更新对象
     * @param object 要移除的对象
     * @returns 是否成功移除
     */
    remove(object: any): boolean;
}

/**
 * 带几何体和材质的网格对象接口
 */
export declare interface MeshWithGeometryAndMaterial extends THREE.Object3D {
    geometry?: THREE.BufferGeometry;
    material?: THREE.Material | THREE.Material[];
    dispose?(): void;
}

/**
 * Message - 消息处理类
 * 用于统一处理异常和错误消息的触发
 */
export declare class Message {
    private app;
    constructor(app: IApp);
    /**
     * 发送消息
     * @param code - 消息编码
     */
    send(code: number): void;
    /**
     * 发送信息消息
     * @param code - 消息编码
     */
    info(code: number): void;
    /**
     * 发送警告消息
     * @param code - 消息编码
     */
    warn(code: number): void;
    /**
     * 发送错误消息
     * @param code - 消息编码
     */
    error(code: number): void;
    /**
     * 获取消息类型
     * @param code - 消息编码
     * @returns 消息类型
     */
    static getMessageType(code: number): 'info' | 'warn' | 'error' | undefined;
}

/**
 * 消息事件
 */
declare interface MessageEvent_2 extends AppEvent {
    type: 'message';
    data: {
        type: 'info' | 'warn' | 'error';
        code: number;
    };
}
export { MessageEvent_2 as MessageEvent }

/**
 * 批量移动工具类 - 使用 TransformControls 批量移动选中的三维对象
 */
export declare class Move implements IMove {
    private app;
    private transformControls;
    private moveGroup;
    private originalCoordinates;
    private initialCenter;
    private currentDisplacement;
    active: boolean;
    private selectedIds;
    constructor(app: IApp);
    toggle(): void;
    start(): void;
    private initializeCoordinates;
    end(): void;
    cancel(): void;
    private restore;
    private createMoveGroup;
    private createTransformControls;
    private updatePositions;
    getDisplacement(): THREE.Vector3 | null;
    hasMovement(): boolean;
    getOriginalCoordinates(): Array<{
        id: string;
        vertices: Array<{
            x: number;
            y: number;
            z: number;
        }>;
    }>;
    getMovedCoordinates(): Array<{
        id: string;
        vertices: Array<{
            x: number;
            y: number;
            z: number;
        }>;
    }>;
    private cleanup;
    dispose(): void;
}

export declare class Movement implements Updatable {
    private app;
    private pathLines;
    private movementPath;
    private startTime;
    private trailGroup;
    private hasFinished;
    private _tmpNewPos;
    private tempWorkerMesh;
    constructor(app: IApp);
    update(_delta: number): void;
    start(data: DisasterData): void;
    stop(): void;
    clear(): void;
    dispose(): void;
    private cleanupTempWorker;
    private normalizeTimes;
    private getPositionByNodeId;
    private getPositionByExitId;
    private createPathSegments;
    private buildCumulativeTimes;
    private drawPathLines;
    private updateSpritePosition;
    private addTrailSegment;
    private updateTrail;
    private getWorkers;
    private findWorkerById;
    private createTempWorkerFrom;
}

/**
 * 多选事件
 */
export declare interface MultiSelectEvent extends AppEvent {
    type: 'multiselect';
    ids: string[];
}

/**
 * 节点项
 */
export declare type NodeItem = {
    label: string;
    value: string;
};

/**
 * 面板数据接口
 */
export declare interface PanelData {
    handle?: string;
    id?: string;
    name: string;
    type: string;
    mode?: string;
    level?: number;
    size?: number;
    width?: number;
    length?: number;
    height?: number;
    color?: number;
    angle?: number;
    radian?: number;
    rotation?: number;
    velocity?: number;
    pressure?: number;
    keyarea?: number;
    airflow?: number;
    direction?: string;
    relativePosition?: number;
    startName?: string;
    endName?: string;
    nodeId?: string;
    groupId?: string;
    startLinkId?: string;
    endLinkId?: string;
    string1?: string;
    string2?: string;
    string3?: string;
    number1?: number;
    number2?: number;
    number3?: number;
    sensors?: string[];
    layers?: string[];
    vertices?: {
        x: number;
        y: number;
        z: number;
    }[];
    distance?: number;
    tunnelLocation?: string;
    tunnelType?: string;
    tunnelLength?: number;
    tunnelGirth?: number;
    tunnelArea?: number;
    tunnelAlpha?: number;
    localAirResistance?: number;
    naturalAirPressure?: number;
    fixedAirPressure?: number;
    tunnelAirResistance?: number;
    tunnelAirQ?: number;
    tunnelAirV?: number;
    tunnelAirP?: number;
    measuredAirflowVolume?: string;
    measuredAirPressure?: string;
    tunnelInterfaceType?: string;
    needAirflowVolume?: number;
    allowedAirSpeed?: number;
    airflowType?: string;
    initialResistance?: number;
    fixedAirflowVolume?: number;
    initialSpeed?: number;
    isAdjustable?: boolean;
    isBlockage?: boolean;
    isNeedTunnel?: boolean;
    isAtmosphere?: boolean;
    autoLength?: boolean;
    auxiliaryQ?: number;
    auxiliaryP?: number;
    equivalentAirResistance?: number;
    pressureRegulation?: number;
    bladeAngle?: number;
    effectiveArea?: number;
    adjustmentLB?: number;
    adjustmentUB?: number;
    workerCount?: number;
    explosiveUsage?: number;
    dieselPower?: number;
    gasEmission?: number;
    maxVelocity?: number;
    minVelocity?: number;
    gasCoefficient?: number;
    localVentilationq?: number;
    heatFactor?: number;
    temperature?: number;
    temperatureDiff?: number;
    storageVolume?: number;
    hydrogenGeneration?: number;
    equipmentPower?: number;
    deviceId?: string;
    deviceType?: string;
    a0?: number;
    a1?: number;
    a2?: number;
    a3?: number;
    a4?: number;
    a5?: number;
}

/**
 * 参数配置
 */
export declare interface ParamConfig {
    tunnelType: string;
    tunnelAlpha: number;
    tunnelInterfaceType: string;
    initialResistance: number;
    localAirResistance: number;
    isNeedTunnel: boolean;
    keyarea: number;
    initialSpeed: number;
    naturalAirPressure: number;
    fixedAirflowVolume: number;
    airflowType: string;
    isBlockage: boolean;
    isAdjustable: boolean;
    autoLength: boolean;
    gasCoefficient: number;
    heatFactor: number;
}

/**
 * 参数接口
 */
export declare interface Params {
    entitieId: string;
    tunnelLocation?: string;
    tunnelType?: string;
    tunnelLength?: number;
    tunnelGirth?: number;
    tunnelArea?: number;
    tunnelAlpha?: number;
    localAirResistance?: number;
    naturalAirPressure?: number;
    fixedAirPressure?: number;
    tunnelAirResistance?: number;
    tunnelAirQ?: number;
    tunnelAirV?: number;
    tunnelAirP?: number;
    measuredAirflowVolume?: string;
    measuredAirPressure?: string;
    tunnelInterfaceType?: string;
    needAirflowVolume?: number;
    allowedAirSpeed?: number;
    airflowType?: string;
    initialResistance?: number;
    fixedAirflowVolume?: number;
    initialSpeed?: number;
    isAdjustable?: boolean;
    isBlockage?: boolean;
    isNeedTunnel?: boolean;
    isAtmosphere?: boolean;
    autoLength?: boolean;
    auxiliaryQ?: number;
    auxiliaryP?: number;
    equivalentAirResistance?: number;
    pressureRegulation?: number;
    bladeAngle?: number;
    effectiveArea?: number;
    adjustmentLB?: number;
    adjustmentUB?: number;
    workerCount?: number;
    explosiveUsage?: number;
    dieselPower?: number;
    gasEmission?: number;
    maxVelocity?: number;
    minVelocity?: number;
    gasCoefficient?: number;
    localVentilationq?: number;
    heatFactor?: number;
    temperature?: number;
    temperatureDiff?: number;
    storageVolume?: number;
    hydrogenGeneration?: number;
    equipmentPower?: number;
    deviceId?: string;
    deviceType?: string;
    a0?: number;
    a1?: number;
    a2?: number;
    a3?: number;
    a4?: number;
    a5?: number;
}

/**
 * Pipe - 管道对象
 */
export declare class Pipe implements IPipe {
    id: string;
    name: string;
    nodeId: string;
    groupId: string;
    startName: string;
    endName: string;
    type: string;
    mode: string;
    handle: string;
    startPoint: THREE.Vector3;
    endPoint: THREE.Vector3;
    startLinkId: string;
    endLinkId: string;
    length: number;
    angle: number;
    size: number;
    width: number;
    height: number;
    color: number;
    airflow: number;
    keyarea: number;
    sensors: string[];
    direction: THREE.Vector3;
    mesh: THREE.Mesh;
    originalMaterial: THREE.MeshStandardMaterial;
    constructor(properties: Properties);
    createPipe(): void;
    private createMaterialByAirflow;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    setMultiSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): PipeJSON;
}

/**
 * 事件类型 - 管道绘制事件
 */
export declare interface PipeDrawEvent extends THREE.Event {
    type: string;
    object?: any;
    target: any;
    [key: string]: any;
}

/**
 * 管道信息接口
 */
export declare interface PipeInfo {
    id: string;
    direction: THREE.Vector3;
    size: number;
    startPoint: THREE.Vector3;
    endPoint: THREE.Vector3;
}

/**
 * 管道JSON表示
 */
export declare interface PipeJSON {
    id: string;
    type: string;
    name: string;
    nodeId: string;
    groupId?: string;
    handle: string;
    layer: string;
    startName: string;
    endName: string;
    startLinkId?: string;
    endLinkId?: string;
    colorIndex: number;
    vertices: Position[];
    size?: number;
    width?: number;
    height?: number;
    color?: number;
    airflow?: number;
    keyarea?: number;
    mode?: string;
    length?: number;
    angle?: number;
}

/**
 * 管道选项接口
 */
export declare interface PipeOptions {
    size: number;
    color: number;
    mode: string;
    name: string;
    startName: string;
    endName: string;
    [key: string]: any;
}

/**
 * 管道属性接口
 */
export declare interface PipeProps {
    size: number;
    width: number;
    height: number;
    color: number;
}

export declare class Point implements IPoint {
    id: string;
    name: string;
    type: string;
    size: number;
    distance: number;
    radian: number;
    angle: number;
    color: number;
    mesh: THREE.Mesh;
    originalMaterial: THREE.MeshStandardMaterial;
    constructor(properties: Properties, position?: THREE.Vector3);
    private createPoint;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): PointJSON;
}

/**
 * 点位JSON表示
 */
export declare interface PointJSON {
    id: string;
    type: string;
    name: string;
    position: Position;
}

export declare class Pollution implements Updatable {
    private app;
    private schedule;
    private scheduleIndex;
    private startTime;
    private isActive;
    private appliedPipeIds;
    private highlightColor;
    constructor(app: IApp);
    start(data: DisasterData): void;
    update(_: number): void;
    stop(): void;
    clear(): void;
    dispose(): void;
    private applyColorToPipe;
    private restorePipeColors;
}

/**
 * 位置接口
 */
export declare interface Position {
    x: number;
    y: number;
    z: number;
}

/**
 * 属性接口
 */
export declare interface Properties {
    handle?: string;
    id?: string;
    name: string;
    type: string;
    mode?: string;
    level?: number;
    size?: number;
    width?: number;
    height?: number;
    length?: number;
    color?: number;
    angle?: number;
    radian?: number;
    rotation?: number;
    velocity?: number;
    airflow?: number;
    keyarea?: number;
    pressure?: number;
    direction?: string;
    relativePosition?: number;
    startName?: string;
    endName?: string;
    nodeId?: string;
    groupId?: string;
    startLinkId?: string;
    endLinkId?: string;
    sensors?: string[];
    layers?: string[];
    vertices?: {
        x: number;
        y: number;
        z: number;
    }[];
    distance?: number;
    string1?: string;
    string2?: string;
    string3?: string;
    number1?: number;
    number2?: number;
    number3?: number;
}

/**
 * Ramp - 基于管道交点的坡道绘制功能
 */
export declare class Ramp implements IRamp {
    private app;
    properties: Properties;
    private drawing;
    private startPoint;
    private endPoint;
    private startPipe;
    private endPipe;
    private mouse;
    private clickCount;
    private rampPreviewPipes;
    private startIndicator;
    private endIndicator;
    constructor(app: IApp);
    initRamp(properties: Properties | undefined): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(_event: MouseEvent): void;
    private findPipeIntersection;
    private setStartPoint;
    private setEndPoint;
    private validateVerticalRelation;
    private calculateOptimalParameters;
    private resetEndPoint;
    private createStartIndicator;
    private createEndIndicator;
    private clearStartIndicator;
    private clearEndIndicator;
    handleDoubleClick(_event: MouseEvent): void;
    private finishRampCreation;
    private calculateRampPoints;
    private calculateSpiralHorizontalOffset;
    private optimizePoints;
    private createRampSegments;
    private generateRampPreview;
    private createRampPreviewPipes;
    private clearRampPreview;
    handleUpdate(properties: Properties): void;
    setPointFromCoordinates(type: 'start' | 'end', position: {
        x: number;
        y: number;
        z: number;
    }): void;
    clearPoints(type?: 'start' | 'end' | 'all'): void;
    cancel(): void;
    clear(): void;
}

/**
 * 斜坡事件
 */
export declare interface RampEvent extends AppEvent {
    type: 'ramp';
    object: object | null;
}

/**
 * 读取完成事件
 */
export declare interface ReadedEvent extends AppEvent {
    type: 'readed';
    entities: DwgEntity[];
}

/**
 * 调整大小管理器类
 */
export declare class Resizer implements IResizer {
    private app;
    private resizeObserver;
    private resizeTimeout;
    private lastWidth;
    private lastHeight;
    constructor(app: IApp);
    /**
     * 设置渲染尺寸
     */
    setSize(): void;
    /**
     * 窗口大小变化回调
     */
    onResize(): void;
    /**
     * 销毁资源
     */
    dispose(): void;
}

/**
 * 全局资源对象
 */
export declare const Resources: ResourcesType;

/**
 * 资源类型
 */
export declare interface ResourcesType {
    /** 场景背景纹理 */
    background: THREE.Texture | null;
    /** 风机纹理 */
    jushan: THREE.Texture | null;
    /** 构筑物纹理 - 风门 */
    door: THREE.Texture | null;
    /** 构筑物纹理 - 风窗 */
    wind: THREE.Texture | null;
    /** 构筑物纹理 - 主扇 */
    main: THREE.Texture | null;
    /** 构筑物纹理 - 传感器 */
    sensor: THREE.Texture | null;
    /** 构筑物纹理 - 污染源 */
    pollution: THREE.Texture | null;
    /** 构筑物纹理 - 工人 */
    worker: THREE.Texture | null;
    /** 构筑物纹理 - 出口 */
    exit: THREE.Texture | null;
    /** 构筑物纹理 - 风速传感器 */
    windsensor: THREE.Texture | null;
    /** 构筑物纹理 - 避灾硐室 */
    station: THREE.Texture | null;
    /** 构筑物纹理 - 风门风窗 */
    doorwind: THREE.Texture | null;
}

/**
 * 资源 URL 配置
 * 用于自定义纹理资源路径
 */
declare interface ResourceUrls {
    /** 背景图片 URL */
    background?: string;
    /** 风机纹理 URL */
    jushan?: string;
    /** 风门纹理 URL */
    door?: string;
    /** 风窗纹理 URL */
    wind?: string;
    /** 主扇纹理 URL */
    main?: string;
    /** 传感器纹理 URL */
    sensor?: string;
    /** 污染源纹理 URL */
    pollution?: string;
    /** 工人纹理 URL */
    worker?: string;
    /** 出口纹理 URL */
    exit?: string;
    /** 风速传感器纹理 URL */
    windsensor?: string;
    /** 避灾硐室纹理 URL */
    station?: string;
    /** 风门风窗纹理 URL */
    doorwind?: string;
}

/**
 * 场景数据接口
 */
export declare interface SceneData {
    name?: string;
    entities?: any[];
    splines?: any[];
    nodes?: any[];
    groups?: any[];
    params?: any[];
    config?: SetConfig;
    param?: ParamConfig;
    center?: DxfTransformParams;
    scale?: number;
    timestamp?: number;
    id?: string;
    [key: string]: any;
}

/**
 * 场景元数据接口
 */
export declare interface SceneMeta {
    id: string;
    name: string;
    lastModified: number;
    version: number;
}

/**
 * 场景状态接口
 */
export declare interface SceneState {
    id?: string;
    name?: string;
    lastModified?: number;
    version?: number;
    entities?: any;
    splines?: any;
    pipes?: any[];
    fans?: any[];
    params?: any[];
    config?: SetConfig;
    center?: DxfTransformParams;
    scale?: number;
    importedAt?: number;
    originalId?: string;
    isVersion?: boolean;
    [key: string]: any;
}

/**
 * 中段信息
 */
declare interface SectionInfo {
    nodeId: string;
    groupId: string;
    level: number;
    minHeight: number;
    maxHeight: number;
}

/**
 * 框选工具类 - 实现三维场景中的框选功能
 */
export declare class Select implements ISelect {
    private app;
    private isDragging;
    private startPoint;
    private endPoint;
    private selectionBox;
    constructor(app: IApp);
    private createSelectionBox;
    initSelect(value: boolean): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    private cancelAndExit;
    private exitSelectMode;
    cancel(): void;
    private showSelectionBox;
    private hideSelectionBox;
    private updateSelectionBox;
    private performSelection;
    private getObjectsInSelectionBox;
    private applySelection;
    appendSelection(pipes: IPipe[]): void;
    removeFromSelection(pipes: IPipe[]): void;
    clearSelection(): void;
    getSelectedIds(): string[];
    setSelectionByIds(ids: string[]): void;
    dispose(): void;
}

/**
 * 选择事件
 */
export declare interface SelectEvent extends AppEvent {
    type: 'select';
    object: object | null;
}

/**
 * 场景设置配置
 */
export declare interface SetConfig {
    grid: number;
    scale: number;
    iterator: number;
    solutionType: string;
    ventilationCoefficient: number;
    maxIterations: number;
    maxError: number;
    minAirVelocity: number;
    maxAirVelocity: number;
    maxRound: number;
    stopLowerBound: number;
    stopUpperBound: number;
}

/**
 * 完整设置数据
 */
export declare interface SettingData {
    grid: number;
    scale: number;
    iterator: number;
    solutionType: string;
    ventilationCoefficient: number;
    maxIterations: number;
    maxError: number;
    minAirVelocity: number;
    maxAirVelocity: number;
    maxRound: number;
    stopLowerBound: number;
    stopUpperBound: number;
    boxKey: string;
    gridKey: string;
    showKey: string;
    hiddenKey: string;
    undoKey: string;
    redoKey: string;
    deleteKey: string;
    upKey: string;
    downKey: string;
    frontKey: string;
    afterKey: string;
    leftKey: string;
    rightKey: string;
    batchMoveKey: string;
    tunnelType: string;
    tunnelAlpha: number;
    tunnelInterfaceType: string;
    initialResistance: number;
    localAirResistance: number;
    isNeedTunnel: boolean;
    keyarea: number;
    initialSpeed: number;
    naturalAirPressure: number;
    fixedAirflowVolume: number;
    airflowType: string;
    isBlockage: boolean;
    isAdjustable: boolean;
    autoLength: boolean;
    gasCoefficient: number;
    heatFactor: number;
}

/**
 * Shape - 构筑物对象
 */
export declare class Shape implements IShape {
    id: string;
    name: string;
    type: string;
    handle: string;
    pipe: IPipe;
    position: THREE.Vector3;
    direction: string;
    relativePosition: number;
    string1?: string;
    string2?: string;
    string3?: string;
    number1?: number;
    number2?: number;
    number3?: number;
    mesh: THREE.Mesh;
    originalMaterials: THREE.Material[];
    sensors: string[];
    constructor(pipe: IPipe, position: THREE.Vector3, properties: Properties);
    createShape(): void;
    calculateRelativePosition(): void;
    calculatePositionOnPipe(): THREE.Vector3;
    updatePosition(): void;
    update(): void;
    updateProperties(properties: Properties): boolean;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): ShapeJSON;
}

/**
 * 构筑物JSON表示
 */
export declare interface ShapeJSON {
    id: string;
    type: string;
    name: string;
    handle?: string;
    layer?: string;
    colorIndex?: number;
    color?: number;
    pipeId: string;
    nodeId: string;
    groupId: string;
    position: Position;
    relativePosition: number;
    direction: string;
    sensors: string[];
    string1?: string;
    string2?: string;
    string3?: string;
    number1?: number;
    number2?: number;
    number3?: number;
}

/**
 * 模拟灾难数据
 */
export declare interface SimulationDisasterData {
    contaminationPath: DisasterData[];
    evacuationPath: DisasterData[];
}

export declare class Spline implements ISpline {
    private app;
    private group;
    private point;
    private raycaster;
    private pointer;
    private onUpPosition;
    private onDownPosition;
    private transformControl;
    private spline;
    private ARC_SEGMENTS;
    private dragObject;
    private cameraPreview;
    private cameraHelper;
    private previewRenderer;
    private previewContainer;
    private isPreviewing;
    private previewDirection;
    private previewProgress;
    private isFullScreen;
    constructor(app: IApp);
    private updateCameraPreview;
    private updatePreview;
    private render;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    initSpline(value: boolean): void;
    updateSpline(): void;
    handlePreview(): void;
    handleUpdate(properties: Properties): void;
    handleDelete(properties: Properties): void;
    handleCreate(): void;
    handleSwitch(): void;
    handleSave(): void;
    dispose(): void;
    update(delta: number): void;
}

/**
 * 样条曲线事件
 */
export declare interface SplineEvent extends AppEvent {
    type: 'spline';
    object: object | null;
}

/**
 * Sprite - 装饰物对象
 */
export declare class Sprite implements ISprite {
    id: string;
    name: string;
    type: string;
    pipe: IPipe;
    position: THREE.Vector3;
    direction: string;
    relativePosition: number;
    mesh: THREE.Mesh;
    originalMaterials: THREE.Material[];
    constructor(pipe: IPipe, position: THREE.Vector3, properties: Properties);
    createSprite(): void;
    calculateRelativePosition(): void;
    calculatePositionOnPipe(): THREE.Vector3;
    updatePosition(): void;
    updateProperties(properties: Properties): boolean;
    update(): void;
    setSelected(selected: boolean): void;
    dispose(): void;
    toJSON(): SpriteJSON;
}

/**
 * 精灵JSON表示
 */
export declare interface SpriteJSON {
    id: string;
    type: string;
    name: string;
    handle?: string;
    layer?: string;
    colorIndex?: number;
    color?: number;
    pipeId: string;
    nodeId: string;
    groupId: string;
    position: Position;
    relativePosition: number;
    direction: string;
}

/**
 * Storage - 存储场景数据
 */
declare class Storage_2 implements IStorage {
    private app;
    db: IDBDatabase | null;
    dbName: string;
    dbVersion: number;
    storeName: string;
    lastSavedState: any;
    constructor(app: IApp);
    init(): Promise<IDBDatabase>;
    saveScene(sceneData: SceneState): Promise<string>;
    getScene(id: string): Promise<SceneState>;
    getLastScene(): Promise<SceneState | null>;
    getAllScenes(): Promise<SceneState[]>;
    getScenesList(): Promise<SceneMeta[]>;
    deleteScene(id: string): Promise<boolean>;
    clearAllScenes(): Promise<boolean>;
    createSceneVersion(id: string, name?: string): Promise<string>;
    getSceneVersions(originalId: string): Promise<SceneState[]>;
    exportSceneToJSON(id: string): Promise<boolean>;
    importSceneFromJSON(jsonContent: string): Promise<string>;
    getCurrentSceneState(): SceneState;
    restoreSceneState(sceneData: SceneState): boolean;
}
export { Storage_2 as Storage }

/**
 * Temp - 临时对象管理
 */
export declare class Temp implements ITemp {
    private draw;
    tempPipe: TempPipeMesh | null;
    tempFan: TempFanGroup | null;
    tempShape: TempFanGroup | null;
    tempSprite: TempSpriteGroup | null;
    currentFanPosition: THREE.Vector3 | null;
    currentShapePosition: THREE.Vector3 | null;
    currentSpritePosition: THREE.Vector3 | null;
    constructor(draw: IDraw | ILink);
    createTempPipe(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, properties: Properties): TempPipeMesh | null;
    updateTempPipe(startPoint: THREE.Vector3, currentPoint: THREE.Vector3, properties: Properties): void;
    createTempFan(pipe: IPipe, position: THREE.Vector3): void;
    updateTempFan(pipe: IPipe, position: THREE.Vector3): void;
    createTempShape(pipe: IPipe, position: THREE.Vector3): void;
    updateTempShape(pipe: IPipe, position: THREE.Vector3): void;
    createTempSprite(pipe: IPipe, position: THREE.Vector3): void;
    updateTempSprite(pipe: IPipe, position: THREE.Vector3): void;
    clear(): void;
}

/**
 * 临时风机组接口
 */
export declare interface TempFanGroup extends THREE.Group {
    children: THREE.Object3D[];
    position: THREE.Vector3;
    userData: {
        type: string;
        pipeId: string;
        pipeSize: number;
        relativePosition?: number;
        [key: string]: any;
    };
}

/**
 * 临时风机网格接口
 */
export declare interface TempFanMesh extends THREE.Mesh {
    geometry: THREE.BufferGeometry;
    material: THREE.Material | THREE.Material[];
}

/**
 * 临时管道网格接口
 */
export declare interface TempPipeMesh extends THREE.Mesh {
    geometry: THREE.BufferGeometry;
    material: THREE.Material | THREE.Material[];
    userData: {
        type: string;
        size: number;
        width: number;
        height: number;
        color: number;
        mode: string;
        [key: string]: any;
    };
}

/**
 * 临时Sprite组接口
 */
export declare interface TempSpriteGroup extends THREE.Group {
    children: THREE.Object3D[];
    position: THREE.Vector3;
    userData: {
        type: string;
        pipeId: string;
        pipeSize: number;
        relativePosition?: number;
        [key: string]: any;
    };
}

declare class Text_2 implements IText {
    id: string;
    pId: string;
    text: string;
    position: THREE.Vector3;
    mesh: CSS2DObject;
    private app;
    constructor(options: {
        id?: string;
        pId?: string;
        text: string;
        position: THREE.Vector3;
        className?: string;
    });
    setText(text: string): void;
    setPosition(position: THREE.Vector3): void;
    setUpdate(app: IApp): void;
    dispose(): void;
}
export { Text_2 as Text }

export declare const Tools: {
    /**
     * 运行时规范化键名
     */
    keyToCanonical(key: string): string;
    /**
     * 展示用友好符号
     */
    keyToDisplay(key: string): string;
    /**
     * 兼容旧调用
     */
    normalizeKey(key: string): string;
    /**
     * 格式化小数
     */
    formatDecimal(num: number, decimals: number): number;
    /**
     * 格式化顶点坐标
     */
    formatVertices(point: DxfPosition): DxfPosition;
    /**
     * 变换顶点坐标
     */
    transformVertices(point: DxfPosition, height: number, angle: number, distance: number): DxfPosition;
    /**
     * 计算阻力
     */
    getResistance(tunnelLength: number, tunnelGirth: number, tunnelArea: number, tunnelAlpha: number): number;
    /**
     * 计算相对于地面的坡度角度
     */
    calculateSlopeAngle(point1: DxfPosition, point2: DxfPosition): number;
};

/**
 * 树形节点项
 */
export declare type TreeItem = {
    key: string;
    name: string;
    children?: TreeItem[];
};

/**
 * Tween 动画管理类
 */
export declare class Tween implements ITween, Updatable {
    private app;
    tweens: Array<any>;
    constructor(app: IApp);
    /**
     * 更新所有动画
     */
    update(): void;
    /**
     * 相机动画
     * @param targetPosition 目标位置
     * @param targetCenter 目标中心点
     */
    animateCamera(targetPosition: THREE.Vector3, targetCenter: THREE.Vector3): void;
    /**
     * 销毁所有动画
     */
    dispose(): void;
}

/**
 * 可更新对象接口，用于Loop系统调用
 */
export declare interface Updatable {
    update(delta: number): void;
}

/**
 * 更新事件
 */
export declare interface UpdateEvent extends AppEvent {
    type: 'update';
    object: object | null;
}

export declare const VERSION = "1.1.2";

export declare class View implements IView {
    private app;
    mouse: THREE.Vector2;
    selectedObject: THREE.Object3D | null;
    selectedObjects: THREE.Object3D[];
    hoveredObject: THREE.Object3D | null;
    isDragging: boolean;
    nodeMarkers: THREE.Mesh[];
    lastClickTime: number;
    private lastMouseMoveTime;
    private mouseMoveThrottle;
    target: THREE.Vector3 | null;
    center: THREE.Vector3 | null;
    entitieId: string;
    constructor(app: IApp);
    get isMultiSelecting(): boolean;
    backToCenter(reset: boolean): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    applyHoverEffect(object: THREE.Object3D): void;
    resetHoverEffect(object: THREE.Object3D): void;
    applyMultiSelectEffect(object: THREE.Object3D): void;
    clearMultiSelection(): void;
    getMultiSelectedIds(): string[];
    syncMultiSelectionByIds(ids: string[]): void;
    setVisibilityByIds(ids: string[], visible: boolean): void;
    resetSelectionEffect(object: THREE.Object3D): void;
    updatePipeSlope(angle: number): void;
    updateProperties(properties: PanelData): void;
    removeProperties(): boolean;
    removeBatch(ids: string[]): boolean;
    updateBatch(ids: string[], properties: PanelData): boolean;
    showNodeMarkers(pipe: IPipe): void;
    clearNodeMarkers(): void;
    getPointFromMouse(event: MouseEvent): THREE.Vector3 | null;
    setCameraZoomAnimation(model: THREE.Object3D, range: number, face?: number): void;
    cancel(): void;
    createAirducts(ids: string[]): void;
    updateAirduct(pipeId: string): void;
    removeAirduct(pipeId: string): void;
    clearAirducts(): void;
    updatePipePosition(properties: PanelData): void;
}

/**
 * 可见性事件
 */
export declare interface VisibilityEvent extends AppEvent {
    type: 'visibility';
    visible: boolean;
}

export { }


declare module 'three' {
    interface EventDispatcher {
        dispatchEvent(event: PipeDrawEvent): void;
    }
}
