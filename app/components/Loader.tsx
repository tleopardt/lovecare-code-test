'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "~/utils/gsapClient";

type LoaderProps = {
    className?: string;
    width?: number;
    height?: number;
}

const Loader: React.FC<LoaderProps> = ({ className, width, height }) => {

  const loaderRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = loaderRef.current;

    if (!el) return;

    gsap.to(el, {
      rotation: 360,
      duration: 1,
      ease: 'linear',
      repeat: -1,
    })
  }, [])

  return (
    <span 
      ref={loaderRef}
      style={{ width: width ?? 48, height: height ?? 48 }}
      className={`
         inline-block border-[5px] border-black border-b-transparent rounded-full box-border
          ${className}
      `}
    />
  )
}

export default Loader