import { MoveRightIcon } from "lucide-react";
import { Button } from "@itsukis-products/pagedeck-ui";
import { WaitlistForm } from "./WaitlistForm";

export const HeroButtonsLaunch = () => {
  return (
    <Button size="lg" className="h-auto px-8 py-4 text-lg" asChild>
      <a href="/auth/register">
        Create for Free
        <MoveRightIcon className="mr-2 h-5 w-5" />
      </a>
    </Button>
  );
};

export const HeroButtons = () => {
  return <WaitlistForm variant="default" />;
};
