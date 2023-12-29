declare module 'xss' {
  export interface IFilterXSSOptions {
    whiteList?: {
      [key: string]: string[];
    };
    stripIgnoreTag?: boolean;
    stripIgnoreTagBody?: string[];
  }

  export default function xss(html: string, options?: IFilterXSSOptions): string;
}
