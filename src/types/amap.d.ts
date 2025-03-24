// 扩展全局 Window 接口

declare namespace AMap {
  interface ControlOptions {
    position?: string;
    offset?: [number, number];
  }

  interface MapOptions {
    viewMode?: string;
    zoom?: number;
    zooms?: [number, number];
    center?: [number, number];
    pitch?: number;
    rotation?: number;
    mapStyle?: string;
    features?: string[];
    buildingAnimation?: boolean;
    showBuildingBlock?: boolean;
  }

  interface Map {
    on(event: string, callback: Function): void;
    addControl(control: any): void;
    destroy(): void;
  }

  interface MapConstructor {
    new(container: string | HTMLElement, options?: MapOptions): Map;
  }

  interface Control {
    new(options?: ControlOptions): any;
  }
}

declare global {
  const AMap: {
    Map: AMap.MapConstructor;
    Scale: AMap.Control;
    ToolBar: AMap.Control;
    MapType: AMap.Control;
    ControlBar: AMap.Control;
  };
}

export {};
