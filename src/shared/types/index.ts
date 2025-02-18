import { FC, SVGProps } from 'react'

export type SVGIcon = FC<SVGProps<SVGSVGElement>>

export interface ICategory {
  id: string
  title: string
  Icon: SVGIcon
  sublist: Array<{
    sub_title: string
    Icon: SVGIcon
  }>
}

export interface IProduct {
  id: number
  title: string
  type: string
  price: number
  image: {
    id: number
    url: string
    name: string
    formats?: {
      large?: {
        id: number
        url: string
        name: string
      }
      small?: {
        id: number
        url: string
        name: string
      }
      thumbnail?: {
        id: number
        url: string
        name: string
      }
    }
  }[]
  old_price: number
  reviews: number
  discount: number
  desc_1: string
  image_1: {
    url: string
  }
  desc_2: string
  desc_title_2: string
  image_2: {
    url: string
  }
  desc_3: string
  desc_title_3: string
  image_3: {
    url: string
  }
  categories: {
    Name: string
  }[]
}

export interface IBlogProject {
  id: number
  title: string
  image: string
  date: string
  description: string
}

export interface IServices {
  id: string
  text: string
  href: string
}
