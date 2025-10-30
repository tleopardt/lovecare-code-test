'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '~/utils/gsapClient';
import OverlayMenu from './OverlayMenu';
import MenuIcon from '~/assets/icons/MenuIcon';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    useGSAP(() => {
        let lastScrollY = window.scrollY;

        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                const direction = self.direction; // 1 = down, -1 = up

                if (direction === 1 && window.scrollY > lastScrollY) {
                    gsap.to('nav', { y: '-100%', duration: 1, ease: 'power2.out' });

                } else if (direction === -1) {
                    gsap.to('nav', { y: '0%', duration: 1, ease: 'power2.out' });
                }

                lastScrollY = window.scrollY;
            }
        });
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <Fragment>
            <nav className='flex justify-between items-center !py-[20px] !px-[20px] md:!px-[70px]'>
                <h5 className='font-bold text-2xl'>frontendjon</h5>

                <ul className='!hidden md:!flex md:gap-6'>
                    <li><Link href='/' className='text-md underline underline-offset-4'>Characters</Link></li>  
                    <li><Link href='/about' className='text-md underline underline-offset-4'>About</Link></li>  
                </ul>

                <div onClick={toggleMenu} className='menu-icon md:hidden'>
                    <MenuIcon />
                </div>
            </nav>

            <OverlayMenu show={showMenu} toggleMenu={toggleMenu} />
        </Fragment>
    )
}

export default Navbar