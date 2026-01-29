import { AlertCircle, Check, DollarSign, Paintbrush } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@itsukis-products/pagedeck-ui";

const problems = [
  {
    Icon: AlertCircle,
    title: "Website Management Complexity",
    description:
      "Traditional website builders are bloated with features you'll never use, making simple tasks unnecessarily complex.",
    solution: "Simplified to essential features",
    solutionDetail: "Only the tools you actually need, nothing more.",
  },
  {
    Icon: Paintbrush,
    title: "Inconsistent Design",
    description:
      "Templates look great initially, but extending them leads to inconsistent, unprofessional designs that break brand guidelines.",
    solution: "Brand consistency by design",
    solutionDetail: "Set colors & fonts once. All widgets follow automatically.",
  },
  {
    Icon: DollarSign,
    title: "Expensive Pricing",
    description:
      "Business website builders charge premium prices that don't match the value they provide to most businesses.",
    solution: "Fair, transparent pricing",
    solutionDetail: "Free plan + affordable paid tiers for teams of all sizes.",
  },
];

export const ProblemsGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {problems.map((problem, index) => {
        const { Icon } = problem;
        return (
          <Card key={index} className="border border-border bg-card">
            <CardContent>
              <div className="mb-4 flex items-start gap-4">
                <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </div>
              <CardDescription className="mb-6 ml-9">{problem.description}</CardDescription>
              <div className="ml-9 border-border border-t pt-4">
                <div className="mb-1 flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-medium text-foreground text-sm">{problem.solution}</span>
                </div>
                <p className="ml-6 text-muted-foreground text-sm">{problem.solutionDetail}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
