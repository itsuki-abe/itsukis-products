import { CheckCircle, ClipboardList, FileText, Layout, Paintbrush, Search } from "lucide-react";
import { AnimatedList, BentoCard, BentoGrid, Marquee, cn } from "@itsukis-products/pagedeck-ui";

// Widget cards for the builder preview
const _widgets = [
  { name: "Hero Section", type: "Layout" },
  { name: "Feature Grid", type: "Content" },
  { name: "Testimonials", type: "Social" },
  { name: "Pricing Table", type: "Commerce" },
  { name: "Contact Form", type: "Forms" },
  { name: "Image Gallery", type: "Media" },
];

const _WidgetCard = ({ name, type }: { name: string; type: string }) => (
  <figure
    className={cn(
      "relative w-36 cursor-pointer overflow-hidden rounded-lg border p-3",
      "border-border bg-card hover:bg-muted/50",
      "transform-gpu transition-all duration-300 ease-out",
    )}
  >
    <div className="flex flex-col gap-1">
      <figcaption className="font-medium text-foreground text-sm">{name}</figcaption>
      <span className="text-muted-foreground text-xs">{type}</span>
    </div>
  </figure>
);

// CMS content items
const contentItems = [
  { title: "Blog Post Draft", status: "Draft", time: "2m ago" },
  { title: "Product Update", status: "Published", time: "5m ago" },
];

const ContentItem = ({ title, status, time }: { title: string; status: string; time: string }) => (
  <figure
    className={cn(
      "relative w-full cursor-pointer overflow-hidden rounded-lg border p-3",
      "border-border bg-card",
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <figcaption className="font-medium text-foreground text-sm">{title}</figcaption>
        <span className="text-muted-foreground text-xs">{time}</span>
      </div>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs",
          status === "Published" && "bg-green-100 text-green-700",
          status === "Draft" && "bg-muted text-muted-foreground",
        )}
      >
        {status}
      </span>
    </div>
  </figure>
);

// Notification items for approval flow
const notifications = [
  { name: "Sarah", action: "approved", page: "Homepage", time: "2m ago" },
  { name: "Mike", action: "submitted", page: "About Us", time: "5m ago" },
  { name: "Emma", action: "commented on", page: "Pricing", time: "8m ago" },
  { name: "John", action: "published", page: "Blog Post", time: "12m ago" },
];

const NotificationItem = ({
  name,
  action,
  page,
  time,
}: {
  name: string;
  action: string;
  page: string;
  time: string;
}) => (
  <figure
    className={cn(
      "relative w-full cursor-pointer overflow-hidden rounded-lg border p-3",
      "border-border bg-card",
    )}
  >
    <div className="flex flex-col gap-1">
      <p className="text-foreground text-sm">
        <span className="font-medium">{name}</span>{" "}
        <span className="text-muted-foreground">{action}</span>{" "}
        <span className="font-medium">{page}</span>
      </p>
      <span className="text-muted-foreground text-xs">{time}</span>
    </div>
  </figure>
);

// Form fields preview
const formFields = [
  { label: "Full Name", type: "text" },
  { label: "Email Address", type: "email" },
  { label: "Message", type: "textarea" },
];

const FormPreview = () => (
  <div className="flex w-full max-w-[180px] flex-col gap-2">
    {formFields.map((field) => (
      <div key={field.label} className="flex flex-col gap-1">
        <label className="text-muted-foreground text-xs">{field.label}</label>
        <div
          className={cn(
            "rounded border border-border bg-background",
            field.type === "textarea" ? "h-10" : "h-6",
          )}
        />
      </div>
    ))}
    <div className="mt-1 h-6 rounded bg-primary" />
  </div>
);

// SEO metrics
const seoMetrics = [
  { label: "Performance", score: 95 },
  { label: "Accessibility", score: 100 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 100 },
];

const SeoPreview = () => (
  <div className="flex gap-4">
    {seoMetrics.map((metric) => (
      <div key={metric.label} className="flex flex-col items-center gap-1">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border-4 font-bold text-sm",
            metric.score >= 90
              ? "border-green-500 text-green-600"
              : "border-yellow-500 text-yellow-600",
          )}
        >
          {metric.score}
        </div>
        <span className="text-muted-foreground text-xs">{metric.label}</span>
      </div>
    ))}
  </div>
);

// Color palette preview
const colors = [
  "var(--primary)",
  "var(--primary-foreground)",
  "var(--secondary)",
  "var(--secondary-foreground)",
  "var(--destructive)",
];

const ColorPalettePreview = () => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className="h-8 w-8 rounded-lg border border-border"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
    <div className="flex gap-2">
      <div className="h-6 w-20 rounded bg-foreground" />
      <div className="h-6 w-16 rounded bg-muted" />
    </div>
  </div>
);

// Mini widget previews for vertical marquee
const HeroWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Hero Section</div>
    <div className="space-y-2">
      <div className="h-3 w-3/4 rounded bg-foreground" />
      <div className="h-2 w-1/2 rounded bg-muted" />
      <div className="mt-2 flex gap-1">
        <div className="h-4 w-12 rounded bg-primary" />
        <div className="h-4 w-12 rounded border border-border" />
      </div>
    </div>
  </div>
);

const FeatureGridWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Feature Grid</div>
    <div className="grid grid-cols-3 gap-1">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-square rounded bg-muted" />
      ))}
    </div>
  </div>
);

const TestimonialsWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Testimonials</div>
    <div className="flex items-start gap-2">
      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-muted" />
      <div className="flex-1 space-y-1">
        <div className="h-2 w-full rounded bg-muted" />
        <div className="h-2 w-3/4 rounded bg-muted" />
        <div className="mt-1 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PricingWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Pricing Table</div>
    <div className="flex gap-1">
      {["Free", "Pro", "Team"].map((plan) => (
        <div key={plan} className="flex-1 rounded border border-border p-1 text-center">
          <div className="font-medium text-[8px] text-foreground">{plan}</div>
          <div className="mt-1 h-1.5 w-full rounded bg-muted" />
          <div className="mt-1 h-3 w-full rounded bg-primary" />
        </div>
      ))}
    </div>
  </div>
);

const GalleryWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Image Gallery</div>
    <div className="grid grid-cols-3 gap-1">
      <img
        className="col-span-2 row-span-2 h-full w-full rounded object-cover"
        src="/images/gallery-1.avif"
        alt="Gallery preview 1"
      />
      <img
        className="col-span-1 row-span-1 h-full w-full rounded object-cover"
        src="/images/gallery-2.avif"
        alt="Gallery preview 2"
      />
      <img
        className="col-span-1 row-span-1 h-full w-full rounded object-cover"
        src="/images/gallery-3.avif"
        alt="Gallery preview 3"
      />
    </div>
  </div>
);

const FAQWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">FAQ Accordion</div>
    <div className="space-y-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-1 rounded bg-muted p-1">
          <div className="h-2 w-2 rounded-full bg-foreground/30" />
          <div className="h-1.5 flex-1 rounded bg-foreground/20" />
        </div>
      ))}
    </div>
  </div>
);

const TeamWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Team Cards</div>
    <div className="flex justify-center gap-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-muted" />
          <div className="mt-1 h-1.5 w-8 rounded bg-muted" />
        </div>
      ))}
    </div>
  </div>
);

const TimelineWidgetPreview = () => (
  <div className="w-full rounded-lg border border-border bg-card p-3">
    <div className="mb-2 text-[10px] text-muted-foreground">Timeline</div>
    <div className="flex gap-1">
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <div className="h-6 w-0.5 bg-border" />
        <div className="h-2 w-2 rounded-full bg-muted" />
        <div className="h-6 w-0.5 bg-border" />
        <div className="h-2 w-2 rounded-full bg-muted" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-2 w-3/4 rounded bg-foreground/20" />
        <div className="h-2 w-1/2 rounded bg-foreground/10" />
        <div className="h-2 w-2/3 rounded bg-foreground/10" />
      </div>
    </div>
  </div>
);

const widgetPreviews = [
  <HeroWidgetPreview key="hero" />,
  <FeatureGridWidgetPreview key="feature" />,
  <TestimonialsWidgetPreview key="testimonials" />,
  <PricingWidgetPreview key="pricing" />,
  <GalleryWidgetPreview key="gallery" />,
  <FAQWidgetPreview key="faq" />,
  <TeamWidgetPreview key="team" />,
  <TimelineWidgetPreview key="timeline" />,
];

const features = [
  {
    name: "Widget-Based Site Creator",
    description:
      "Drag and drop professional widgets to build your site. No design skills required. Choose from 40+ pre-built components including hero sections, galleries, timelines, and more.",
    Icon: Layout,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-3",
    background: (
      <Marquee
        vertical
        pauseOnHover
        className="absolute top-10 right-4 left-4 [--duration:30s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {widgetPreviews.map((preview, idx) => (
          <div
            key={idx}
            className="transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none"
          >
            {preview}
          </div>
        ))}
      </Marquee>
    ),
    href: "#",
    cta: "Learn more",
  },
  {
    name: "CMS without mess.",
    description:
      "Collaborate on content creation in one central location. Edit collaboratively in real-time and publish them at any time.",
    Icon: FileText,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    background: (
      <div className="absolute top-10 right-4 left-4 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]">
        {contentItems.map((item, idx) => (
          <div key={idx} className="mb-2">
            <ContentItem {...item} />
          </div>
        ))}
      </div>
    ),
    href: "#",
    cta: "Learn more",
  },
  {
    name: "One-Click Publish or Approval Flow",
    description:
      "Choose your workflow: publish instantly or enable approval workflows for team control and brand safety.",
    Icon: CheckCircle,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    background: (
      <AnimatedList
        delay={2000}
        className="absolute top-10 right-4 left-4 h-[150px] overflow-hidden [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]"
      >
        {notifications.map((item, idx) => (
          <NotificationItem key={idx} {...item} />
        ))}
      </AnimatedList>
    ),
    href: "#",
    cta: "Learn more",
  },
  {
    name: "Form your way.",
    description:
      "Create custom forms for lead capture, surveys, and contact. Integrate with your CRM or receive email notifications.",
    Icon: ClipboardList,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    background: (
      <div className="absolute top-10 right-4 left-4 flex justify-center [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]">
        <FormPreview />
      </div>
    ),
    href: "#",
    cta: "Learn more",
  },
  {
    name: "SEO you can control.",
    description:
      "Optimizing for search engines has never been easier. Tailor for each piece of content, auto-generate sitemaps, and more. Built-in best practices ensure your sites rank well.",
    Icon: Search,
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-5",
    background: (
      <div className="absolute top-10 left-6 [mask-image:linear-gradient(to_top,transparent_15%,#000_60%)]">
        <SeoPreview />
      </div>
    ),
    href: "#",
    cta: "Learn more",
  },
  {
    name: "Figma is not needed.",
    description:
      "You can create a website simply by deciding on colors and fonts and placing widgets. Our design system ensures every combination looks professional. No design skills or Figma required.",
    Icon: Paintbrush,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5",
    background: (
      <div className="absolute top-10 right-4 left-4 flex justify-center [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]">
        <ColorPalettePreview />
      </div>
    ),
    href: "#",
    cta: "Learn more",
  },
];

export const FeaturesGrid = () => {
  return (
    <BentoGrid className="mx-auto max-w-7xl">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
};
