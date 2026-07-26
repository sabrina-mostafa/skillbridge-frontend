export const getEmailProviderLink = (email?: string) => {
  if (!email) return null;

  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain) return null;

  // Gmail
  if (domain.includes("gmail.com")) {
    return "https://mail.google.com/mail/u/0/";
  }

  // Outlook / Hotmail
  if (
    domain.includes("outlook.com") ||
    domain.includes("hotmail.com") ||
    domain.includes("live.com")
  ) {
    return "https://outlook.live.com/mail/0/";
  }

  // Yahoo
  if (domain.includes("yahoo.com")) {
    return "https://mail.yahoo.com/";
  }

  // Default fallback (generic mail login page)
  return "https://mail.google.com/";
};