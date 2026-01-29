import { MoveRightIcon } from "lucide-react";
import { Button } from "@itsukis-products/pagedeck-ui";
import { WaitlistForm } from "./WaitlistForm";

// ローンチ後用のボタン（保持）
export const CTAButtonsLaunch = () => {
  return (
    <Button size="lg" variant="secondary" className="h-auto px-8 py-4 text-lg">
      Create for free
      <MoveRightIcon className="mr-2 h-5 w-5" />
    </Button>
  );
};

// プリローンチ用のWaitlistフォーム
export const CTAButtons = () => {
  return <WaitlistForm variant="cta" />;
};
