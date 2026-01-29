import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button, Input, cn } from "@itsukis-products/pagedeck-ui";

type FormState = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  variant?: "default" | "cta";
}

export function WaitlistForm({ variant = "default" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isCta = variant === "cta";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFormState("success");
      setEmail("");
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  if (formState === "success") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          isCta ? "text-primary-foreground" : "text-primary",
        )}
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full",
            isCta ? "bg-primary-foreground/20" : "bg-primary/10",
          )}
        >
          <Check className="size-5" />
        </div>
        <span className="font-medium text-lg">You're on the list!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formState === "error") {
              setFormState("idle");
              setErrorMessage("");
            }
          }}
          disabled={formState === "loading"}
          className={cn(
            "h-12 flex-1 text-base",
            isCta && "border-white/20 bg-white text-foreground",
          )}
          aria-label="Email address"
        />
        <Button
          type="submit"
          size="lg"
          variant={isCta ? "secondary" : "default"}
          disabled={formState === "loading"}
          className="h-12 px-6"
        >
          {formState === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
      {formState === "error" && errorMessage && (
        <p
          className={cn(
            "mt-2 text-center text-sm sm:text-left",
            isCta ? "text-red-200" : "text-destructive",
          )}
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
