import { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function DashboardSection({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && (
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}