'use client';

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import CloseIcon from '~/assets/icons/CloseIcon';
import { gsap, useGSAP } from '~/utils/gsapClient';

interface OverlayMenuProps {
    show?: boolean;
    toggleMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const OverlayMenu = ({ show, toggleMenu }: OverlayMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        gsap.set('.menu-link a', { y: 75, opacity: 0 });

        tl.current = gsap
            .timeline({ paused: true })
            .to(menuRef.current, {
                duration: 1,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'power4.inOut'
            })
            .to('.animate-icon', {
                scale: 1,
                rotate: 360,
                duration: 1
            }, '<')
            .to('.menu-link a', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.inOut',
            }, '<')

    }, [])

    useEffect(() => {
        if (show) {
            tl.current?.play();

        } else {
            tl.current?.reverse();
        }
    }, [show])
    
    return (
        <div ref={menuRef} className="menu-overlay">
            <div className='relative !p-[20px] h-full'>
                <div className="flex-between" onClick={toggleMenu}>
                    <h5 className='font-bold text-2xl'>frontendjon</h5>

                    <div className="animate-icon scale-0">
                        <CloseIcon />
                    </div>
                </div>

                <div className="menu-link">
                    <Link 
                        onClick={() => tl.current?.reverse()} 
                        className='font-md text-[32px]' href='/'>
                        Characters
                    </Link>

                    <Link 
                        onClick={() => tl.current?.reverse()} 
                        className='font-md text-[32px]' 
                        href='/about'>
                        About
                    </Link>
                </div>
                
                <div className="fixed bottom-[60px] flex justify-between w-[80%]">
                    <div className='flex-1 flex flex-col gap-[4px]'>
                        <p className='text-[14px]'>LinkedIn</p>
                        <p className='text-[14px]'>Instagram</p>
                        <p className='text-[14px]'>Github</p>
                    </div>
                    <div className='flex-1 flex flex-col gap-[4px]'>
                        <p className='text-[14px]'>Whats App</p>
                        <p className='text-[14px]'>+62 81235885584</p>
                        <p className='text-[14px]'>jntnafrizal@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverlayMenu