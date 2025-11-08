export class ResponseError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
  }
}
