import { RepositoryInterface } from '@/common/domain/repositories/repository-interface'
import { ExampleModel } from '../models/example.model'

export type CreateExampleProps = {
  id?: string
  name: string
  age: number
  status: string
  created_at?: Date
  updated_at?: Date
}

export interface ExampleRepository
  extends RepositoryInterface<ExampleModel, CreateExampleProps> {
  findByName(name: string): Promise<ExampleModel>
}
