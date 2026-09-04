"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import Link from "next/link";

export interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
}

export interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

export interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
}

export interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export const defaultNavItems: iNavItem[] = [
  {
    heading: "Home",
    href: "/",
    subheading: "Welcome to our website",
    imgSrc: "/images/home.jpg",
  },
  {
    heading: "Projects",
    href: "/projects",
    subheading: "View our projects",
    imgSrc: "/images/about.jpg",
  },
  {
    heading: "Blogs",
    href: "/blogs",
    subheading: "Read our articles",
    imgSrc: "/images/services.jpg",
  },
  {
    heading: "Achievements",
    href: "/achievements",
    subheading: "Awards & milestones",
    imgSrc: "/images/contact.jpg",
  },
];

export const CustomFooter: React.FC = () => {
  return (
    <div className="flex w-full justify-between px-10 py-5 text-sm text-black md:px-24">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
        </svg>
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </a>
    </div>
  );
};

export const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = () => {
    return setIsActive(false);
  };

  const isExternalLink = index === 4 || index === 3;
  const linkProps = isExternalLink
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-black/30 py-4 uppercase transition-colors duration-500 md:py-8"
      {...linkProps}
    >
      <Link ref={ref} onMouseMove={handleMouseMove} href={href}>
        <div className="relative flex items-start">
          <span className="mr-2 text-4xl font-thin text-black transition-colors duration-500">
            {index}.
          </span>
          <div className="flex flex-row gap-2">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -16 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.075,
                delayChildren: 0.25,
              }}
              className="relative z-10 block text-4xl font-extralight text-black transition-colors duration-500 md:text-4xl"
            >
              {heading.split("").map((letter, i) => {
                return (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: 16 },
                    }}
                    transition={{ type: "spring" }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Curve: React.FC = () => {
  const [h, setH] = useState(800);

  useEffect(() => {
    setH(window.innerHeight);
    const onResize = () => setH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <svg
      className="absolute -left-[99px] top-0 h-full w-[100px] stroke-none"
      style={{ fill: "#ffffff" }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

export const CurvedNavbar: React.FC<
  iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 z-40 h-[100dvh] w-screen max-w-screen-sm bg-white"
    >
      <div className="flex h-full flex-col justify-between pt-11">
        <div className="mt-0 flex flex-col gap-3 px-10 text-5xl md:px-24">
          <div className="mb-0 border-b border-black/30 text-sm uppercase text-black">
            <p>Navigation</p>
          </div>
          <section className="mt-0 bg-transparent">
            <div className="mx-auto max-w-7xl">
              {navItems.map((item, index) => {
                return (
                  <NavLink
                    key={item.href}
                    {...item}
                    setIsActive={setIsActive}
                    index={index + 1}
                  />
                );
              })}
            </div>
          </section>
        </div>
        {footer}
      </div>
      <Curve />
    </motion.div>
  );
};

export const Header: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  footer = <CustomFooter />,
}) => {
  const [isActive, setIsActive] = useState(false);
  const openAudioRef = useRef<HTMLAudioElement | null>(null);
  const closeAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (isActive) {
      closeAudioRef.current?.play();
    } else {
      openAudioRef.current?.play();
    }
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="relative">
        <div
          onClick={handleClick}
          className="fixed -right-1 top-0 z-50 m-5 flex size-12 cursor-pointer items-center justify-center rounded-none bg-white md:-right-1"
        >
          <div className="relative flex h-6 w-8 flex-col items-center justify-between">
            <span
              className={`block h-1 w-7 bg-black transition-transform duration-300 ${
                isActive ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-1 w-7 bg-black transition-opacity duration-300 ${
                isActive ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-7 bg-black transition-transform duration-300 ${
                isActive ? "-translate-y-3 -rotate-45" : ""
              }`}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <CurvedNavbar
            setIsActive={setIsActive}
            navItems={navItems}
            footer={footer}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
