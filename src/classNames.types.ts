export interface IClassNamesObject {
    [key: string]: boolean
}
export type IClassNamesProp = string | Array<string> | IClassNamesObject | undefined;
export type IUseClassNamesArgs = Array<IClassNamesProp>;