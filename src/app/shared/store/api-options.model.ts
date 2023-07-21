export interface ApiOptionsInterface {
  server: string
  endpoint: string[]
  polling?: number //seconds
}

export class ApiOptions implements ApiOptionsInterface {

  constructor(
    public server = '',
    public endpoint: string[] = [],
    public polling?: number,
  ) {}

  static adapt(item?: any): ApiOptions {

    return new ApiOptions(
      item?.server,
      item?.endpoint,
      item?.polling,
    )

  }

}


