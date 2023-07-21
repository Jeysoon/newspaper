export interface GenderInterface {
  id: number
  name: string
}

export class Gender implements GenderInterface {

  constructor(

    public id = 0,
    public name = '',

    ) {}

  static adapt(item?: any): Gender {

    return new Gender(
      item?.id,
      item?.name,
    )

  }

}


