"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { RegisterModal } from "../auth/RegisterModal";
import { LoginModal } from "../auth/LoginModal";
import { User } from "@/types/user.type";
import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { USER_ROLES } from "@/constants/user/UserRoles";


const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/category", label: "Courses" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];


export default function Navbar({ user }: { user: User }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();

  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);


  return (
    <header className="fixed top-0 w-full z-50">
      <div className="mx-auto max-w-360 mt-4 px-4 md:px-6">
        <div className="flex items-center justify-between
  bg-background/70 backdrop-blur-xl border border-border/50 
  rounded-full px-4 md:px-6 py-3 shadow-sm">

          {/* Logo */}
          <Link
            href="/"
            className="text-lg md:text-xl font-bold tracking-tight"
          >
            Skill<span className="text-primary">BRIDGE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
        relative text-sm font-medium text-muted-foreground
        transition-colors hover:text-foreground

        after:absolute after:left-0 after:-bottom-1
        after:h-0.5 after:w-0 after:bg-primary
        after:transition-all

        hover:after:w-full
      "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              >
                <SheetTrigger asChild>
                  <button
                    className="cursor-pointer flex items-center justify-center
          h-10 w-10 rounded-full border border-border/60 bg-background/70
          backdrop-blur-md hover:bg-primary/10 active:scale-95 transition-all duration-200"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="flex flex-col h-full w-[320px] border-l
        bg-transparent backdrop-blur-2xl px-6 py-6"
                >
                  {/* Header */}
                  <SheetHeader className="space-y-2 border-b border-white dark:border-gray-600 pb-6">
                    <SheetTitle className="text-2xl font-bold tracking-tight">
                      Skill
                      <span className="text-primary">BRIDGE</span>
                    </SheetTitle>

                    <p className="text-sm text-muted-foreground">
                      Learn skills. Build projects. Grow your career.
                    </p>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="mt-8 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center rounded-2xl px-4 py-3 transition-all",
                          pathname === item.href
                            ? "bg-primary/20 text-primary font-semibold"
                            : "hover:bg-primary/10 hover:text-primary"
                        )}
                      >
                        <span className="flex-1">
                          {item.label}
                        </span>

                        <span
                          className="
                opacity-0
                translate-x-1
                group-hover:opacity-100
                group-hover:translate-x-0
                transition-all duration-200
              "
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </nav>

                  {/* Bottom Section */}
                  <div className="mt-auto border-t border-white dark:border-gray-500 pt-6">

                    {((user?.role === USER_ROLES.ADMIN) || user?.profileCompleted) ? (

                      <div className="flex h-full justify-between items-center rounded-2xl border border-muted-foreground/20 bg-card/30 p-4 shadow-sm">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                            Logged in as
                          </p>
                          <p className="font-semibold truncate">
                            {user.name}
                          </p>
                        </div>

                        <div>
                          <UserDropdown user={user} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold">
                            Welcome 👋
                          </h3>

                          <p className="text-sm dark:text-muted-foreground">
                            Login or create an account to start learning.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LoginModal
                            open={loginOpen}
                            setOpen={setLoginOpen}
                            openRegister={() => {
                              setLoginOpen(false);

                              setTimeout(() => {
                                setRegisterOpen(true);
                              }, 150);
                            }}
                          />
                        </button>

                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                          }}
                        >
                          <RegisterModal
                            open={registerOpen}
                            setOpen={setRegisterOpen}
                            openLogin={() => {
                              setRegisterOpen(false);

                              setTimeout(() => {
                                setLoginOpen(true);
                              }, 150);
                            }}
                          />
                        </button>
                      </div>
                    )}

                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <ModeToggle />

            {(user?.role === USER_ROLES.ADMIN) || user?.profileCompleted === true ? (
              <div className="hidden lg:flex">
                <UserDropdown user={user} />
              </div>

            ) : (
              // {/* Auth Buttons for Desktop */ }
              < div className="hidden lg:flex items-center gap-2 ml-2">
                <LoginModal
                  open={loginOpen}
                  setOpen={setLoginOpen}
                  openRegister={() => {
                    setLoginOpen(false);

                    setTimeout(() => {
                      setRegisterOpen(true);
                    }, 150);
                  }}
                />

                <RegisterModal
                  open={registerOpen}
                  setOpen={setRegisterOpen}
                  openLogin={() => {
                    setRegisterOpen(false);

                    setTimeout(() => {
                      setLoginOpen(true);
                    }, 150);
                  }}
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </header >
  );
}