export interface ConfirmedRegistrationInterface {
  id: number
  confirmed: boolean
}

export class ConfirmedRegistration implements ConfirmedRegistrationInterface {

  constructor(

    public id: 0,
    public confirmed = false,

    ) {}

  static adapt(item?: any): ConfirmedRegistration {

    return new ConfirmedRegistration(
      item?.id,
      item?.confirmed,
    )

  }

}


