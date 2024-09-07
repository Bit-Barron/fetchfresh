import ResetPasswordForm from "../../../components/elements/RestPasswordForm";

export default function ResetPassword() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Passwort zurücksetzen
          </h1>
          <p className="mt-2 text-muted-foreground">
            Bitte geben Sie Ihr neues Passwort ein.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
