declare module '@amap/amap-jsapi-loader' {
  interface LoaderOptions {
    key: string;
    version: string;
    plugins?: string[];
  }

  interface AMapLoader {
    load(options: LoaderOptions): Promise<any>;
  }

  const _default: AMapLoader;
  export default _default;
}
