type Props = {
  title: string;
  description: string;
};

export default function DashboardHeaderSection({
  title,
  description,
}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}