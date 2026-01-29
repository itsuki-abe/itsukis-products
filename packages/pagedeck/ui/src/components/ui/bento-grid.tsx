import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "border border-border bg-card",
      "dark:border-border dark:bg-card",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6">
      <div className="lg:group-hover:-translate-y-10 pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300">
        <Icon className="h-5 w-5 origin-left transform-gpu text-muted-foreground transition-all duration-300 ease-in-out group-hover:scale-90" />
        <h3 className="font-semibold text-foreground text-lg">{name}</h3>
        <p className="max-w-lg text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center pt-4 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden",
        )}
      >
        <Button variant="link" asChild size="sm" className="pointer-events-auto p-0 text-primary">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex",
      )}
    >
      <Button variant="link" asChild size="sm" className="pointer-events-auto p-0 text-primary">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-muted/50" />
  </div>
);

export { BentoCard, BentoGrid };
