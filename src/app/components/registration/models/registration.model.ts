export interface RegistrationInfoInterface {
  id: number
  firstName: string
  lastName: string
  email: string
  ageGroup: number
  gender: number
  heard: number
  ageAppropriate: boolean
  code: string
}

export class RegistrationInfo implements RegistrationInfoInterface {

  constructor(

    public id = 0,
    public firstName = '',
    public lastName = '',
    public email = '',
    public ageGroup = 0,
    public gender = 0,
    public heard = 0,
    public ageAppropriate = false,
    public code = '',

    ) {}

  static adapt(item?: any): RegistrationInfo {

    return new RegistrationInfo(
      item?.id,
      item?.firstName,
      item?.lastName,
      item?.email,
      item?.ageGroup,
      item?.gender,
      item?.heard,
      item?.ageAppropriate,
      item?.code,
    )

  }

}


