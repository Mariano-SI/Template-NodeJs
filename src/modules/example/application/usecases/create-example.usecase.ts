import { ExampleRepository } from '../../domain/repositories/example.repository'

type Input = {
  name: string
  age: number
  status: string
}

export default class CreateExampleUseCase {
  constructor(private readonly exampleRepository: ExampleRepository) {}
  async execute(input: Input) {
    const { name, age, status } = input
    const example = await this.exampleRepository.create({
      name,
      age,
      status,
    })
    return example
  }
}
