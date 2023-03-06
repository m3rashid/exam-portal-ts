export interface IError {
  name?: string;
  statusCode: number;
  message?: string;
}

export const throwError = (props: IError) => new Error(JSON.stringify(props));
