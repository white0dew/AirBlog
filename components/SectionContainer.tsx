import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className="mx-auto md:px-10 xl:px-40">{children}</div>
  );
}
// max - w - 4xl px - 4 sm: px - 6 xl: max - w - 7xl