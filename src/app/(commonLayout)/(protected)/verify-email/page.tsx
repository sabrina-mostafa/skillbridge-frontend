import Link from "next/link";
import { MailCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResendVerificationButton from "./ResendVerificationButton";
import { getEmailProviderLink } from "@/helpers/email-provider";



type Props = {
  searchParams: Promise<{
    email?: string;
  }>;
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email } = await searchParams;

  const inboxLink = getEmailProviderLink(email);


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-132 rounded-3xl border bg-background shadow-xl overflow-hidden">

          {/* Header */}
          <div className="h-30 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 relative">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="h-20 w-20 rounded-full bg-background shadow-lg flex items-center justify-center border">
                <MailCheck className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pt-16 pb-8 text-center">

            <h1 className="text-3xl font-bold">
              Verify your email
            </h1>

            <p className="mt-2 text-muted-foreground">
              We&apos;ve sent a verification link to
            </p>

            {/* Email Display */}
            <div className="mt-4 rounded-xl border bg-muted/40 px-4 py-3">
              <p className="font-semibold text-primary break-all">
                {email || "your email address"}
              </p>
            </div>

            {/* Inbox Action (Senior UX Pattern) */}
            {email && inboxLink && (
              <div className="mt-2">
                <a
                  href={inboxLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Open your email inbox
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Please check your inbox and spam folder. Click the verification link
              in the email to activate your account.
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="w-full font-bold">
                <Link href="/">
                  Back to Login
                </Link>
              </Button>

              <ResendVerificationButton email={email} />
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Didn&apos;t receive the email? Wait a minute and check your spam folder
              before requesting a new one.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}