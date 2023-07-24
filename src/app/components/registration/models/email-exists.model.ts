export interface EmailExistsInterface {
  id: number
  exists: boolean
  email: string
}

export class EmailExists implements EmailExistsInterface {

  constructor(

    public id = 0,
    public exists = false,
    public email = '',

    ) {}

  static adapt(item?: any): EmailExists {

    return new EmailExists(
      item?.id,
      item?.exists,
      item?.email,
    )

  }

}


