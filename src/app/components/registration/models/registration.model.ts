export interface RegistrationInfoInterface {
  id: number
  first_name: string
  last_name: string
  email: string
  age_group_id: number
  gender_id: number
  heard_id: number
  age_appropriate: boolean
  code_id: string
}

export class RegistrationInfo implements RegistrationInfoInterface {

  constructor(

    public id = 0,
    public first_name = '',
    public last_name = '',
    public email = '',
    public age_group_id = 0,
    public gender_id = 0,
    public heard_id = 0,
    public age_appropriate = false,
    public code_id = '',

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


