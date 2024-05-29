import { ReactNode } from "react";

const postDateTemplate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

interface LayoutProps {
    children: ReactNode
}

export default function ArticleLayout({ children }: LayoutProps) {

    return (
        <div className="w-full py-1 flex flex-col justify-center scroll-smooth">
            {children}
        </div>
    )
}