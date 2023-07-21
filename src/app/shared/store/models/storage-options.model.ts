
export interface StorageOptionsInterface {
  expiresIn?: string
  override?: boolean
  session?: boolean
  encrypt?: boolean
}

export class StorageOptions implements StorageOptionsInterface {

  constructor(
    public expiresIn = '',
    public override = false,
    public session = false,
    public encrypt = false,
  ) {}

  static adapt(item?: any): StorageOptions {

    return new StorageOptions(
      item?.expiresIn,
      item?.override,
      item?.session,
      item?.encrypt,
    )

  }

}
