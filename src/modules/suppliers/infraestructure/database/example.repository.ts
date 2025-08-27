import { SelectAllOutput } from '@/common/domain/repositories/repository-interface'
import { ExampleModel } from '../../domain/models/example.model'
import {
  CreateExampleProps,
  ExampleRepository,
} from '../../domain/repositories/example.repository'
import { randomUUID } from 'node:crypto'

export class ExampleRepositoryPG implements ExampleRepository {
  private static instance: ExampleRepositoryPG

  private static examples: ExampleModel[] = [
    {
      id: randomUUID(),
      name: 'Alice',
      age: 25,
      status: 'active',
      created_at: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Bob',
      age: 30,
      status: 'inactive',
      created_at: new Date(),
    },
    {
      id: randomUUID(),
      name: 'Charlie',
      age: 40,
      status: 'archived',
      created_at: new Date(),
    },
  ]

  static getInstance(): ExampleRepositoryPG {
    if (!ExampleRepositoryPG.instance) {
      ExampleRepositoryPG.instance = new ExampleRepositoryPG()
    }
    return ExampleRepositoryPG.instance
  }

  async findByName(name: string): Promise<ExampleModel> {
    const example = ExampleRepositoryPG.examples.find(
      example => example.name === name,
    )

    return example ? example : null
  }
  async create(props: CreateExampleProps): Promise<ExampleModel> {
    const example: ExampleModel = {
      id: randomUUID(),
      name: props.name,
      age: props.age,
      status: props.status,
      created_at: new Date(),
    }
    ExampleRepositoryPG.examples.push(example)
    return example
  }

  async findById(id: string): Promise<ExampleModel> {
    const example = ExampleRepositoryPG.examples.find(
      example => example.id === id,
    )
    return example ? example : null
  }

  async update(model: ExampleModel): Promise<ExampleModel> {
    const { id } = model

    const index = ExampleRepositoryPG.examples.findIndex(
      example => example.id === id,
    )
    ExampleRepositoryPG.examples[index] = {
      ...ExampleRepositoryPG.examples[index],
      ...model,
    }

    const updatedExample = ExampleRepositoryPG.examples[index]
    return updatedExample
  }
  async delete(id: string): Promise<void> {
    const index = ExampleRepositoryPG.examples.findIndex(
      example => example.id === id,
    )
    if (index !== -1) {
      ExampleRepositoryPG.examples.splice(index, 1)
    }
  }
  async selectAll(_props: any): Promise<SelectAllOutput<ExampleModel>> {
    return {
      items: ExampleRepositoryPG.examples,
      total: ExampleRepositoryPG.examples.length,
    }
  }
}
