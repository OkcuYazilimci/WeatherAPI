export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: String): Promise<T | null>;
  create(entity: Partial<T>): Promise<T>;
  update(id: String, entity: Partial<T>): Promise<T>;
  delete(id: String): Promise<void>;
}
