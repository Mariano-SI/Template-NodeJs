import { ExampleRepository } from '../../domain/repositories/example.repository'

export default class ListExamplesUseCase {
  constructor(private readonly exampleRepository: ExampleRepository) {}
  async execute() {
    const examples = await this.exampleRepository.selectAll()

    return examples
  }
}
