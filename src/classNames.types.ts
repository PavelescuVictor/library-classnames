export interface IClassNamesObject {
    [key: string]: boolean
}
export type IClassNamesArg = string | Array<string> | IClassNamesObject | undefined;
export type IUseClassNamesArgs = Array<IClassNamesArg>;