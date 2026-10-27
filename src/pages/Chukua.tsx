import { Building2, MapPinned, PackageCheck, Route, Sprout, Truck, UserCheck } from "lucide-react";
import ProductPage from "@/components/site/ProductPage";
import Reveal from "@/components/site/Reveal";
import { Accent } from "@/components/site/Section";
import { waitlistHref } from "@/components/site/content";

const Chukua = () => (
  <ProductPage
    tone="leaf"
    name="Chukua App"
    heroImage="/images/cargo-loading.jpg"
    heroImageAlt="Cargo being loaded into a truck"
    heroTitle={
      <>
        Chukua App.
        <br />
        <Accent className="text-gradient-leaf pr-2">We'll pick it up.</Accent>
      </>
    }
    heroDescription="On-demand collection for cargo and farm produce. Request a pickup, get matched with a verified transporter, and move goods from the farm gate, warehouse or shop to wherever they need to be."
    primaryCta={{ label: "Join the waitlist", href: waitlistHref("Chukua App") }}
    secondaryCta={{ label: "I'm a transporter", href: "#transporters" }}
    audienceTitle={
      <>
        For everyone who needs goods <Accent className="text-ink-300">moved, not stuck.</Accent>
      </>
    }
    audiences={[
      {
        icon: Sprout,
        title: "Farmers & cooperatives",
        body: "Get produce collected at the farm gate and to market while it's still fresh, without hunting for a truck.",
      },
      {
        icon: Building2,
        title: "Traders & businesses",
        body: "Book reliable collection for stock, supplies and general cargo between suppliers, warehouses and shops.",
      },
      {
        icon: Truck,
        title: "Transporters & brokers",
        body: "Fill empty capacity with verified collection jobs close to where you already operate.",
      },
    ]}
    band={{
      image: "/images/crates-field.jpg",
      alt: "Harvested produce in crates ready for collection",
      title: (
        <>
          The first mile is where <Accent className="text-gradient-leaf pr-1">value is lost.</Accent>
        </>
      ),
      body: "The Chukua App makes collection predictable, so less produce spoils waiting for transport.",
    }}
    stepsTitle={
      <>
        Request. Match. <Accent className="text-gradient-leaf pr-1">Move.</Accent>
      </>
    }
    steps={[
      {
        icon: MapPinned,
        title: "Request a pickup",
        body: "Tell us what you're moving, where it is and where it needs to go.",
      },
      {
        icon: UserCheck,
        title: "Get matched",
        body: "We connect you with a verified transporter suited to your load and route.",
      },
      {
        icon: Route,
        title: "Track to delivery",
        body: "Follow the trip to the market, depot, buyer, or a Smartdrop or Smartcold locker.",
      },
    ]}
    extra={
      <section id="transporters" className="pb-24 md:pb-32">
        <div className="site-container">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="card-surface h-full p-8 md:p-10">
                <span className="eyebrow">For transporters & brokers</span>
                <h3 className="display mt-6 text-3xl md:text-4xl">Drive with the Chukua App.</h3>
                <p className="mt-4 leading-relaxed text-ink-300">
                  We're building our launch network of verified transporters and brokers. Register your interest
                  and we'll reach out when onboarding opens.
                </p>
                <a href={waitlistHref("Chukua App transporter")} className="btn-light mt-8">
                  Register interest
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card-surface h-full p-8 md:p-10">
                <PackageCheck className="h-7 w-7 text-leaf-400" />
                <h3 className="mt-6 text-2xl font-normal tracking-[-0.02em] text-white">
                  Used agriTRUK or cargoTRUK?
                </h3>
                <p className="mt-4 leading-relaxed text-ink-300">
                  We retired the TRUK app and its agriTRUK and cargoTRUK services. The Chukua App is their successor,
                  rebuilt around what we learned moving farm produce and cargo with you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    }
    closingTitle={
      <>
        Be first in line when <Accent className="text-gradient-leaf pr-1">the Chukua App launches.</Accent>
      </>
    }
    closingBody="Join the waitlist as a shipper or transporter and we'll let you know as soon as pickups open in your area."
    closingCtas={[
      { label: "Join as a shipper", href: waitlistHref("Chukua App") },
      { label: "Join as a transporter", href: waitlistHref("Chukua App transporter") },
    ]}
  />
);

export default Chukua;
