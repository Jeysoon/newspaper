export interface AgeGroupsInterface {
  id: number
  age_start: string
  age_end: string
  name: string
}

export class AgeGroups implements AgeGroupsInterface {

  constructor(

    public id = 0,
    public age_start = '',
    public age_end = '',
    public name = '',

    ) {}

  static adapt(item?: any): AgeGroups {

    return new AgeGroups(
      item?.id,
      item?.age_start,
      item?.age_end,
      item?.name,
    )

  }

}


