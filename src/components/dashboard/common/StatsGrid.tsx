import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

type StatItem = {
  label: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  href?: string;
};

type Props = {
  items: StatItem[];
};

export default function StatsGrid({ items }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        const content = (
          <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

            {/* Decorative glow */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />

            <div className="relative flex h-full flex-col justify-between">

              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>

                  <h2 className="text-4xl font-bold tracking-tight">
                    {item.value}
                  </h2>

                  {item.description && (
                    <p className="max-w-45 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>

                {Icon && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-primary/5 transition-colors group-hover:bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                )}
              </div>

              {/* Bottom */}
              {item.href && (
                <div className="mt-8 flex items-center justify-between border-t pt-4 text-sm">
                  <span className="font-medium text-primary">
                    View Details
                  </span>

                  <div className="rounded-full bg-primary/10 p-2 transition-all group-hover:translate-x-1">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}

            </div>
          </div>
        );

        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          >
            {content}
          </Link>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
  );
}