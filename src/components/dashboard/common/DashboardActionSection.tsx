type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DashboardActionSection({
  title,
  children,
}: Props) {
  return (
    <div className="p-6 rounded-xl border">
      <h2 className="font-semibold mb-3">
        {title}
      </h2>

      <div className="flex flex-wrap gap-3">
        {children}
      </div>
    </div>
  );
}