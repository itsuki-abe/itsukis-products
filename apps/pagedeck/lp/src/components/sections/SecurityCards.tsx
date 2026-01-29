import { SiCloudflare } from "@icons-pack/react-simple-icons";
import { CheckCircle, Lock } from "lucide-react";
import { Card, CardContent } from "@itsukis-products/pagedeck-ui";

export const SecurityCards = () => {
  return (
    <>
      {/* Security Features Grid */}
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {/* TLS/SSL */}
        <Card className="hover:-translate-y-0.5 cursor-pointer transition-all duration-200 hover:shadow-sm">
          <CardContent>
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="mb-3 font-bold text-2xl text-foreground">TLS/SSL Encryption</h3>
                <p className="text-muted-foreground leading-relaxed">
                  TLS/SSL encrypts and secures your data, ensuring peace of mind and protection from
                  unauthorized access. All connections are encrypted by default with automatic
                  certificate management.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-medium text-green-500 text-sm">
              <CheckCircle className="h-5 w-5" />
              <span>Automatic HTTPS for all sites</span>
            </div>
          </CardContent>
        </Card>

        {/* Cloudflare */}
        <Card className="hover:-translate-y-0.5 cursor-pointer transition-all duration-200 hover:shadow-sm">
          <CardContent>
            <div className="mb-6 flex items-start gap-4">
              <div
                className={"flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"}
              >
                <SiCloudflare color="default" className="h-8 w-8" />
              </div>
              <div>
                <h3 className="mb-3 font-bold text-2xl text-foreground">Cloudflare Protection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience secure data protection and top performance with the reliable cloud
                  services of Cloudflare. DDoS protection, CDN acceleration, and edge computing
                  built-in.
                </p>
              </div>
            </div>
            <div className={"flex items-center gap-2 font-medium text-[#F38020] text-sm"}>
              <CheckCircle className="h-5 w-5" />
              <span>Global CDN with DDoS protection</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const SecurityTitle = () => {
  return (
    <div className="mb-4 inline-flex items-center gap-2">
      <h2 className="font-bold text-4xl text-foreground md:text-5xl">Your Data is Secured</h2>
    </div>
  );
};
