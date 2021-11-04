import { HttpMethod } from 'types/http';

interface HttpApiTriggerType {
  path: string;
  method: string;
}

export class HttpApiContract<Path extends string, Method extends HttpMethod> {
  private _path: Path;
  private _method: Method;

  constructor({ path, method }: { path: Path; method: Method }) {
    this._path = path;
    this._method = method;
  }

  get trigger(): HttpApiTriggerType {
    return { path: this._path, method: this._method };
  }
}
