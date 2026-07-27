export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-primary/15" />
        <div className="absolute inset-0 h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary" />
      </div>

      <h2 className="mt-6 text-lg font-semibold text-foreground">
        Loading...
      </h2>

      <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
        Please wait while we prepare your experience.
      </p>
    </div>
  );
}