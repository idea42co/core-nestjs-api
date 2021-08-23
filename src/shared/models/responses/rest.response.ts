export class RestResponse<M = any, R = any> {
  private _meta: M;
  private _response: R;
  private _correlationId: string;

  constructor(correlationId: string, response: R, meta?: M) {
    this._meta = meta;
    this._correlationId = correlationId;
    this._response = response;
  }

  public toJSON(): any {
    return {
      meta: {
        ...this._meta,
        response: {
          correlationId: this._correlationId,
          generatedOn: new Date(),
        },
      },
      data: this._response,
    };
  }
}
