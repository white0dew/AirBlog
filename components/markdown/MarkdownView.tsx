'use client';

import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import rehypePrismPlus from "rehype-prism-plus";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import NextImage, { ImageProps } from 'next/image'
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// @ts-ignore
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { useTheme } from 'next-themes';
const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />
type MDViewerParams = {
    source: string;
};



const MDViewer = (params: MDViewerParams) => {
    const components = {

        // pre: Pre,
        // image: Image,
    };
    const { theme, setTheme, resolvedTheme } = useTheme()
    return (
        <Markdown
            components={{
                code(props) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match && node?.tagName === "code" ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={extractAndConcatTextValues(node).replace(/\n$/, '')}
                            language={match[1]}
                            style={coldarkDark}
                        />
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
            remarkPlugins={
                [
                    remarkGfm,
                    remarkMath,
                ]}
            rehypePlugins={
                [
                    rehypeSlug,
                    rehypeSanitize,
                    [
                        rehypeAutolinkHeadings,
                    ],
                    rehypeKatex,
                    [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
                ]}
        >
            {params.source}
        </Markdown >
    );
};

export default MDViewer;

function extractAndConcatTextValues(node: any) {
    let result = '';

    function traverse(node: any) {
        if (node.type === 'text') {
            result += node.value;
        } else if (node.children) {
            // @ts-ignore
            node.children.forEach(child => traverse(child));
        }
    }

    traverse(node);
    return result;
}