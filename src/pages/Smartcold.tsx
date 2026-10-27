import { Beef, Fish, KeyRound, Milk, ShoppingBasket, Snowflake, Sprout, Thermometer, Wallet } from "lucide-react";
import ProductPage from "@/components/site/ProductPage";
import LockerVisual from "@/components/site/LockerVisual";
import { Accent } from "@/components/site/Section";
import { SMARTDROP_URL, waitlistHref } from "@/components/site/content";

const Smartcold = () => (
  <ProductPage
    tone="frost"
    name="Smartcold"
    heroTitle={
      <>
        Cold storage,
        <br />
        <Accent className="text-gradient-frost pr-2">on every corner.</Accent>
      </>
    }
    heroDescription="Smartcold applies the Smartdrop locker model to perishables. Sellers drop fish, meat, dairy and fresh produce into refrigerated lockers, and buyers collect them fresh whenever it suits them."
    heroVisual={<LockerVisual variant="cold" className="mx-auto max-w-sm" />}
    primaryCta={{ label: "Join the waitlist", href: waitlistHref("Smartcold") }}
    secondaryCta={{ label: "See Smartdrop", href: SMARTDROP_URL }}
    audienceTitle={
      <>
        Built for people who sell <Accent className="text-ink-300">what can't wait.</Accent>
      </>
    }
    audiences={[
      {
        icon: Fish,
        title: "Fish traders",
        body: "Hand off the morning catch without it sitting in the heat while you wait for buyers.",
      },
      {
        icon: Beef,
        title: "Butchers",
        body: "Fulfil pre-orders for collection after hours, kept chilled until the customer arrives.",
      },
      {
        icon: Milk,
        title: "Dairies",
        body: "Get milk, yoghurt and cheese closer to customers with a cold, secure pickup point.",
      },
      {
        icon: ShoppingBasket,
        title: "Grocers & online food sellers",
        body: "Offer click-and-collect for fresh groceries without running your own cold delivery fleet.",
      },
      {
        icon: Sprout,
        title: "Farmers & cooperatives",
        body: "Cut post-harvest losses by moving produce into cold storage nearer to where it sells.",
      },
      {
        icon: Snowflake,
        title: "Households",
        body: "Collect fresh food on your way home, at the right temperature, with a one-time code.",
      },
    ]}
    band={{
      image: "/images/produce-crates.jpg",
      alt: "Crates of freshly harvested produce",
      title: (
        <>
          Freshness shouldn't depend on <Accent className="text-gradient-frost pr-1">who's home.</Accent>
        </>
      ),
      body: "Too much food spoils between the seller and the buyer. Smartcold closes that gap.",
    }}
    stepsTitle={
      <>
        Same simple flow. <Accent className="text-gradient-frost pr-1">Colder doors.</Accent>
      </>
    }
    steps={[
      {
        icon: Wallet,
        title: "Book a cold door",
        body: "Choose a Smartcold locker and door size, and pay with M-Pesa, the same way merchants book on Smartdrop.",
      },
      {
        icon: Thermometer,
        title: "Drop it chilled",
        body: "Load the order into a refrigerated compartment designed to hold perishables at a steady, safe temperature.",
      },
      {
        icon: KeyRound,
        title: "Buyer collects fresh",
        body: "The buyer gets an SMS with a one-time code and picks up the order, still cold, on their own schedule.",
      },
    ]}
    closingTitle={
      <>
        Want Smartcold <Accent className="text-gradient-frost pr-1">near you?</Accent>
      </>
    }
    closingBody="Join the waitlist to hear first about pilot sites, or tell us about a location where cold lockers would make a difference."
    closingCtas={[
      { label: "Join the waitlist", href: waitlistHref("Smartcold") },
      { label: "Suggest a location", href: waitlistHref("Smartcold location suggestion") },
    ]}
  />
);

export default Smartcold;
