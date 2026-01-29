import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@itsukis-products/pagedeck-ui";

const faqs = [
  {
    question: "What is PageDeck?",
    answer:
      "PageDeck is a widget-based website builder designed for businesses. It allows you to create professional websites without coding by simply dragging and dropping pre-built components.",
  },
  {
    question: "Do I need coding skills to use PageDeck?",
    answer:
      "No coding skills are required. PageDeck is designed for non-technical users. You can create beautiful websites by selecting widgets, customizing colors and fonts, and arranging content visually.",
  },
  {
    question: "How many sites can I have?",
    answer:
      "The number of sites depends on your plan. Free plans allow 1 site, while paid plans offer unlimited sites. Each site can have its own custom domain and settings.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes, you can connect your own custom domain to your PageDeck site. We also provide free subdomains if you prefer to start without purchasing a domain.",
  },
  {
    question: "How do I create a website with PageDeck?",
    answer:
      "Simply sign up for a free account, choose a template that fits your needs, and start customizing with our drag-and-drop widget editor. You can publish your site in minutes.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes, we offer a free plan that includes essential features to get started. You can upgrade to paid plans for additional features like custom domains, team collaboration, and advanced analytics.",
  },
  {
    question: "How does team collaboration work?",
    answer:
      "Team plans allow multiple users to work on the same website. You can set roles and permissions, enable approval workflows, and maintain brand consistency across your organization.",
  },
  {
    question: "Can I migrate my existing website to PageDeck?",
    answer:
      "While we do not offer automatic migration, our widget-based system makes it easy to recreate your existing content. Our support team can assist you with the transition.",
  },
  {
    question: "What features are included in paid PageDeck plans?",
    answer:
      "Paid plans include custom domains, advanced analytics, team collaboration with roles and permissions, approval workflows, priority support, and access to premium widgets and templates.",
  },
];

export const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
