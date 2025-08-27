import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export function validateProductVariants(variants: any[]) {
  function sortObjectKeys(obj: Record<string, any>) {
    return Object.keys(obj)
      .sort()
      .reduce(
        (result, key) => {
          result[key] = obj[key]
          return result
        },
        {} as Record<string, any>,
      )
  }

  const sortedAttributes = variants.map(variant => {
    const obj =
      typeof variant.attributes === 'string'
        ? JSON.parse(variant.attributes)
        : variant.attributes
    return JSON.stringify(sortObjectKeys(obj))
  })

  const keysSet = new Set(
    sortedAttributes.map(attr =>
      Object.keys(JSON.parse(attr)).sort().join(','),
    ),
  )
  if (keysSet.size > 1) {
    throw new BadRequestError('All variants must have the same attribute keys')
  }

  const attributesSet = new Set(sortedAttributes)
  if (attributesSet.size !== variants.length) {
    throw new BadRequestError(
      'Variants with identical attributes are not allowed',
    )
  }
}
