import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">TRUKFLOW Africa – Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last Updated: November 2, 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using TRUKFLOW Africa (the "Platform"), including the website at www.trukafrica.com and mobile applications, you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree, do not use the Platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>"We," "Us," "Our," "TRUKFLOW Africa" – TRUKFLOW Africa Limited, a company registered in Kenya.</li>
                <li>"You," "User" – Any individual or entity using the Platform.</li>
                <li>"Recruiter" – A company or individual seeking to hire drivers.</li>
                <li>"Driver" – A job seeker registered to find employment.</li>
                <li>"Subscription" – Paid access to premium features.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Eligibility</h2>
              <p>You must be:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>At least 18 years old.</li>
                <li>Legally capable of entering into contracts.</li>
                <li>A licensed driver (for Drivers) or a registered business (for Recruiters).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Account Registration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate, complete, and current information.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
                <li>You are liable for all activities under your account.</li>
                <li>We may suspend or terminate accounts for violations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Subscriptions & Payments</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subscriptions are required to access the Driver Job Board.</li>
                <li>Payments are processed via M-PESA or Paystack (card).</li>
                <li>All fees are in Kenyan Shillings (KES) and non-refundable.</li>
                <li>Subscriptions auto-renew unless canceled.</li>
                <li>You may cancel anytime; access continues until the end of the billing cycle.</li>
                <li>We reserve the right to change pricing with 30 days' notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Recruiter Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Platform only for lawful hiring purposes.</li>
                <li>Not contact drivers for spam, harassment, or illegal activities.</li>
                <li>Respect contact limits as per your plan.</li>
                <li>Not share driver data with third parties without consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Driver Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide truthful and up-to-date information and documents.</li>
                <li>Upload valid licenses, certificates, and ID.</li>
                <li>Respond promptly to legitimate job inquiries.</li>
                <li>Not create multiple accounts.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Document Verification</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We verify driver documents (license, Good Conduct, PSV, etc.).</li>
                <li>Verification status: Pending → Approved → Rejected.</li>
                <li>We are not liable for forged documents.</li>
                <li>Rejected drivers may reapply after 30 days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Prohibited Activities</h2>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use bots, scrapers, or automated tools.</li>
                <li>Post false information or impersonate others.</li>
                <li>Engage in fraudulent activities.</li>
                <li>Violate any laws or regulations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All content, logos, and code are owned by TRUKFLOW Africa.</li>
                <li>You are granted a limited, non-transferable license to use the Platform.</li>
                <li>You may not copy, modify, or distribute content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Platform is provided "as is" and "as available".</li>
                <li>We do not guarantee job placement or hiring.</li>
                <li>We are not responsible for disputes between users.</li>
                <li>Internet delays or failures are not our liability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We are not liable for indirect, incidental, or consequential damages.</li>
                <li>Our total liability shall not exceed the amount you paid in the last 12 months.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">13. Termination</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may suspend or terminate your access at any time, with or without cause.</li>
                <li>You may delete your account via settings.</li>
                <li>Upon termination, your right to use the Platform ceases immediately.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">14. Governing Law</h2>
              <p>These Terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Nairobi.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">15. Changes to Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may update these Terms at any time.</li>
                <li>Changes are effective upon posting.</li>
                <li>Continued use constitutes acceptance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">16. Contact Us</h2>
              <div className="space-y-1">
                <p><strong>TRUKFLOW Africa Limited</strong></p>
                <p>Email: support@trukafrica.com</p>
                <p>Phone: +254 758 594 951</p>
                <p>Website: www.trukafrica.com</p>
                <p>Address: Nairobi, Kenya</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;
