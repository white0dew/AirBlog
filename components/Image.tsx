'use client';

import NextImage, { ImageProps } from 'next/image';
import { useRef, useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const Image = ({ ...rest }: ImageProps) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = '[data-fancybox]';
    const options = {};

    Fancybox.bind(container, delegate, options);

    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, []);

  return (
    <figure ref={containerRef}>
      <NextImage
        className="mx-auto hover:cursor-pointer"
        data-fancybox="single"
        data-caption={rest.alt}
        width={800}
        height={800}
        {...rest}
      />
    </figure>
  );
}

export default Image;
