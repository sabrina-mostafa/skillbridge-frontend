"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            onClick={scrollToTop}
            size="icon"
            className={cn(
                "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full",
                " bg-primary/30 border border-white/10 cursor-pointer",
                "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                "transition-all duration-300 ease-out",
                "hover:scale-110 hover:-translate-y-1 hover:bg-background/80",
                "active:scale-95",
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
            )}
        >
            {/* subtle glow ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 opacity-80 blur-md" />

            {/* icon */}
            <ArrowUp className="h-5 w-5 relative z-10 text-foreground hover:text-black" />
        </Button>
    );
}