'use client'

import { gsap } from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, useGSAP, ScrollTrigger, SplitText }
