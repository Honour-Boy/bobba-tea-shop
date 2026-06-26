// Turn an error (Supabase AuthError / PostgrestError, or any Error) into a
// human-readable message for the UI.
export function apiError(err) {
  return (
    err?.message ||
    err?.error_description ||
    err?.error ||
    "Something went wrong. Please try again."
  );
}
