import Image from 'next/image';
import React, { useState, FC } from 'react';
import ReactMarkdown from 'react-markdown';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface CustomImageProps {
    src: string;
    alt?: string;
}

// 自定义图片组件
export default function CustomImage(props: CustomImageProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <div className=' items-center flex justify-center'>
            <Dialog>
                <DialogTrigger>
                    <Image src={props.src} alt={props.alt ?? ""}
                        width={600}
                        height={400}
                        className=' rounded-md  shadow-lg max-w-max'
                        style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                    /></DialogTrigger>
                <DialogContent>
                    <Image src={props.src} alt={props.alt ?? ""}
                        layout="responsive"
                        width={800}
                        height={600}
                        className=' rounded-md  shadow-lg max-w-max'
                        style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                    />
                </DialogContent>
            </Dialog>

        </div>
    );
};

