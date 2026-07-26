import ResetPasswordForm from "./ResetPasswordForm";

type PageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function Page({
  searchParams,
}: PageProps) {
  const { token } = await searchParams;

  return (
    <ResetPasswordForm token={token} />
  );
}