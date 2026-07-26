"use client";

import {
  CalendarClock,
  Radio,
  CalendarDays,
  CircleCheckBig,
} from "lucide-react";

type Props = {
  upcoming: number;
  ongoing: number;
  today: number;
  completed: number;
};

const cards = [
  {
    key: "upcoming",
    title: "Upcoming",
    icon: CalendarClock,
  },
  {
    key: "ongoing",
    title: "Ongoing",
    icon: Radio,
  },
  {
    key: "today",
    title: "Today",
    icon: CalendarDays,
  },
  {
    key: "completed",
    title: "Completed",
    icon: CircleCheckBig,
  },
] as const;

export default function SessionSummary({
  upcoming,
  ongoing,
  today,
  completed,
}: Props) {
  const values = {
    upcoming,
    ongoing,
    today,
    completed,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <Icon className="h-5 w-5 text-primary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              {values[card.key]}
            </h2>
          </div>
        );
      })}
    </div>
  );
}