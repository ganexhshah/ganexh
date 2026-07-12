"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  MailIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandContent,
  CommandItem,
  CommandSection,
  CommandSectionHeader,
} from "@/ui/command";
import {
  ModalBackdrop,
  ModalOverlay,
  ModalPanel,
  ModalViewport,
} from "@/ui/modal";
import { SearchField } from "@/ui/search-field";
import { Input, InputGroup, InputGroupAddon } from "@/components/ui/input";
import { Magnetic } from "@/components/gsap-ui";
import { socialLinks } from "@/data/social";

type CommandAction = {
  id: string;
  textValue: string;
  label: string;
  href?: string;
  onSelect?: () => void;
};

const navigationCommands: CommandAction[] = [
  { id: "home", textValue: "Home", label: "Home", href: "/" },
  {
    id: "profile",
    textValue: "Profile About Ganesh Shah",
    label: "Profile",
    href: "/#profile",
  },
  {
    id: "projects",
    textValue: "Projects Showcase Portfolio",
    label: "Projects",
    href: "/projects",
  },
  {
    id: "about",
    textValue: "About Education Skills Process",
    label: "About",
    href: "/about",
  },
  {
    id: "blogs",
    textValue: "Blogs Articles Read Learn",
    label: "Blogs",
    href: "/blogs",
  },
  {
    id: "achievements",
    textValue: "Achievements Game Jam Daydream Winner Awards",
    label: "Achievements",
    href: "/achievements",
  },
];

const socialCommands: CommandAction[] = [
  {
    id: "github",
    textValue: "GitHub ganexhshah",
    label: "GitHub",
    href: socialLinks.github,
  },
  {
    id: "linkedin",
    textValue: "LinkedIn ganesh-shah2064",
    label: "LinkedIn",
    href: socialLinks.linkedin,
  },
  {
    id: "instagram",
    textValue: "Instagram ganesh_sha1",
    label: "Instagram",
    href: socialLinks.instagram,
  },
  {
    id: "tiktok",
    textValue: "TikTok _ganexx",
    label: "TikTok",
    href: socialLinks.tiktok,
  },
  {
    id: "email",
    textValue: "Email Contact hello.ganeshshah",
    label: "Email",
    href: socialLinks.mailto,
  },
];

type NavbarProps = {
  variant?: "hero" | "page";
};

export function Navbar({ variant = "hero" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleCommandAction(key: React.Key) {
    const action = [...navigationCommands, ...socialCommands].find(
      (item) => item.id === key,
    );

    if (!action) return;

    if (action.href) {
      if (action.href.startsWith("mailto:")) {
        window.location.href = action.href;
      } else if (action.href.startsWith("http")) {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(action.href);
      }
    } else {
      action.onSelect?.();
    }

    setOpen(false);
  }

  const headerClass =
    variant === "hero"
      ? "absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 sm:py-4 md:px-8"
      : "sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:py-4 md:px-8";

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={headerClass}
      >
        <Link href="/" aria-label="Go to home" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Ganesh Shah"
            width={140}
            height={40}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        <Magnetic strength={0.25} className="max-w-[220px] flex-1 sm:max-w-xs">
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-9 w-full items-center gap-2 rounded-md border border-white/15 bg-black/30 px-3 text-left text-sm text-white backdrop-blur-sm transition-colors hover:border-white/30"
            aria-label="Open command menu"
          >
            <SearchIcon className="size-4 shrink-0 text-white/70" />
            <span className="truncate text-white/70">Search...</span>
            <kbd className="ml-auto hidden rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/60 sm:inline">
              ⌘K
            </kbd>
          </motion.button>
        </Magnetic>
      </motion.header>

      <ModalOverlay isOpen={open} onOpenChange={setOpen} isDismissable>
        <ModalBackdrop className="bg-black/70" />
        <ModalViewport>
          <ModalPanel className="max-w-lg overflow-hidden border-white/10 bg-neutral-950 p-0 text-white sm:max-w-lg">
            <Command
              aria-label="Portfolio navigation"
              className="max-h-[min(70vh,420px)] text-white"
            >
              <SearchField
                aria-label="Search navigation"
                autoFocus
                placeholder="Type a command or search..."
                className="text-white"
              >
                <InputGroup
                  size="lg"
                  className="rounded-none border-0 border-b border-white/10 bg-transparent text-white"
                >
                  <InputGroupAddon className="text-white/60">
                    <SearchIcon />
                  </InputGroupAddon>
                  <Input
                    placeholder="Type a command or search..."
                    className="text-white placeholder:text-white/50"
                  />
                </InputGroup>
              </SearchField>

              <CommandContent
                aria-label="Commands"
                className="max-h-72 overflow-y-auto p-1 text-white **:data-listbox-item-label:text-white **:data-listbox-section-header:text-white/50"
                onAction={(key) => handleCommandAction(key)}
              >
                <CommandSection>
                  <CommandSectionHeader>Navigation</CommandSectionHeader>
                  {navigationCommands.map((item) => (
                    <CommandItem key={item.id} id={item.id} textValue={item.textValue}>
                      {item.id === "home" ? (
                        <HomeIcon className="size-4" />
                      ) : (
                        <UserIcon className="size-4" />
                      )}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandSection>

                <CommandSection>
                  <CommandSectionHeader>Social</CommandSectionHeader>
                  {socialCommands.map((item) => (
                    <CommandItem key={item.id} id={item.id} textValue={item.textValue}>
                      {item.id === "email" ? (
                        <MailIcon className="size-4" />
                      ) : (
                        <span className="text-xs font-medium uppercase">{item.label[0]}</span>
                      )}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandSection>
              </CommandContent>
            </Command>
          </ModalPanel>
        </ModalViewport>
      </ModalOverlay>
    </>
  );
}
