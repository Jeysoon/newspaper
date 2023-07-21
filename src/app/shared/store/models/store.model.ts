import { StorageOptions } from "./storage-options.model"

export interface GlobalStorageInterface {
  store: string
  options?: StorageOptions
}

export class GlobalStorage implements GlobalStorageInterface {

  constructor(
    public store = '',
    public options = StorageOptions.adapt(),
  ) {}

  static adapt(item?: any): GlobalStorage {

    return new GlobalStorage(
      item?.name,
      (item?.options) ? StorageOptions.adapt(item?.options) : StorageOptions.adapt(),
    )

  }

}
