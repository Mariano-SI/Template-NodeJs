import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ExampleRepository } from '../../domain/repositories/example.repository'

type Input = {
  id: string
}

export default class ListExampleUseCase {
  constructor(private readonly exampleRepository: ExampleRepository) {}
  async execute(input: Input) {
    const { id } = input
    const example = await this.exampleRepository.findById(id)

    if (!example) {
      throw new NotFoundError('Example not found')
    }
    return example
  }
}
