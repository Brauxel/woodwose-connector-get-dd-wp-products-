export interface DynamoDbWordPressProduct {
  id: string
  slug: string
  name: string
  variations: Set<string>
  date_created_gmt: string
  date_modified_gmt: string
}

export interface DynamoDBWordPressProductVariation {
  id: string
  sku: string
  price: number
  quantity: number
  size: string
  permalink: string
  date_created_gmt: string
  date_modified_gmt: string
}

export type WordPressProductVariation = DynamoDBWordPressProductVariation

export interface WordPressProduct
  extends Omit<DynamoDbWordPressProduct, 'variations'> {
  variations: WordPressProductVariation[]
}
