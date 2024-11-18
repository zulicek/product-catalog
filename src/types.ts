export interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
  images: string[]
}

export interface Category {
  slug: string
  name: string
  url: string
}
