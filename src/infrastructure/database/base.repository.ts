import { PrismaClient } from '@prisma/client';

export class BaseRepository<TModel> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly modelName: keyof PrismaClient
  ) {}

  getAll(): Promise<TModel[]> {
    return (this.prisma[this.modelName] as any).findMany();
  }

  getById(id: String): Promise<TModel | null> {
    return (this.prisma[this.modelName] as any).findUnique({ where: { id } });
  }

  create(data: Partial<TModel>): Promise<TModel> {
    return (this.prisma[this.modelName] as any).create({ data });
  }

  update(id: String, data: Partial<TModel>): Promise<TModel> {
    return (this.prisma[this.modelName] as any).update({ where: { id }, data });
  }

  delete(id: String): Promise<void> {
    return (this.prisma[this.modelName] as any).delete({ where: { id } });
  }
}
