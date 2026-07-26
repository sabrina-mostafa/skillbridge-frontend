import Link from "next/link";

type ActionItem = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  href: string;
};

type ActionGridProps = {
  title: string;
  actions: ActionItem[];
};

export default function ActionGrid({ title, actions }: ActionGridProps) {
  return (
    <div className="p-6 rounded-xl border">
      <h2 className="font-semibold mb-3">{title}</h2>

      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Link href={action.href} key={action.label}>
            <button
              onClick={action.onClick}
              className={
                action.variant === "primary"
                  ? "px-4 py-2 rounded-lg bg-primary cursor-pointer text-white"
                  : "px-4 py-2 rounded-lg border cursor-pointer"
              }
            >
              {action.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}