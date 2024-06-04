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
        <>

            {/* <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } }}>
                <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
            </Modal> */}
            <Dialog>
                <DialogTrigger><Image src={props.src} alt={props.alt ?? ""}
                    width={600}
                    height={400}
                    className=' rounded-md  shadow-lg max-w-max'
                    onClick={() => setModalIsOpen(true)}
                    style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                /></DialogTrigger>
                <DialogContent>
                    <Image src={props.src} alt={props.alt ?? ""}
                        width={600}
                        height={400}
                        className=' rounded-md  shadow-lg max-w-max'
                        onClick={() => setModalIsOpen(true)}
                        style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }}
                    />
                    {/* <DialogHeader> */}
                    {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                    {/* <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription> */}
                    {/* </DialogHeader> */}
                </DialogContent>
            </Dialog>

        </>
    );
};

