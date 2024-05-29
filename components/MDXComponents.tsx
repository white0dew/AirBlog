import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import type { MDXComponents } from 'mdx/types'
import Image from '@/components/Image'
import CustomLink from '@/components/Link'

export const MDXcomponents: MDXComponents = {
  Image,
  TOCInline,
  // @ts-ignore
  a: CustomLink,
  // @ts-ignore
  pre: Pre,
  // table: TableWrapper,
}
