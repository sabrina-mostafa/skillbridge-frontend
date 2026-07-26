"use client";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function SessionInfoItem({
  label,
  children,
}: Props) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <div className="font-medium">
        {children}
      </div>
    </div>
  );
}