export interface WhereHeardInterface {
  id: number
  name: string
}

export class WhereHeard implements WhereHeardInterface {

  constructor(

    public id = 0,
    public name = '',

    ) {}

  static adapt(item?: any): WhereHeard {

    return new WhereHeard(
      item?.id,
      item?.name,
    )

  }

}


