import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">TRUKFLOW Africa – Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: November 2, 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>TRUKFLOW Africa ("We") respects your privacy and is committed to protecting your personal data under the Kenya Data Protection Act, 2019.</p>
              <p className="mt-2">This Privacy Policy explains how we collect, use, store, and protect your information when you use www.trukafrica.com and our mobile apps.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Data We Collect</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">User Type</th>
                      <th className="border border-border p-3 text-left">Data Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Drivers</td>
                      <td className="border border-border p-3">Name, phone, email, National ID, driving license, Certificate of Good Conduct, PSV badge, photo, location, experience, ratings</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Recruiters</td>
                      <td className="border border-border p-3">Company name, contact person, phone, email, payment details, subscription history</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">All Users</td>
                      <td className="border border-border p-3">IP address, device info, browser type, usage patterns, cookies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Purpose</th>
                      <th className="border border-border p-3 text-left">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Create and manage your account</td>
                      <td className="border border-border p-3">Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Verify driver documents</td>
                      <td className="border border-border p-3">Legitimate Interest</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Match drivers with job opportunities</td>
                      <td className="border border-border p-3">Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Process payments and subscriptions</td>
                      <td className="border border-border p-3">Contract</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Send job alerts and notifications</td>
                      <td className="border border-border p-3">Consent</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Improve platform performance</td>
                      <td className="border border-border p-3">Legitimate Interest</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Prevent fraud and ensure security</td>
                      <td className="border border-border p-3">Legitimate Interest</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Comply with legal obligations</td>
                      <td className="border border-border p-3">Legal Obligation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Sharing</h2>
              <p>We share your data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Payment processors (Safaricom M-PESA, Paystack) – encrypted and PCI-compliant.</li>
                <li>Verified recruiters – only approved driver profiles and contact info (with consent).</li>
                <li>Law enforcement or regulators – when required by Kenyan law.</li>
                <li>Trusted service providers (cloud hosting, analytics) – under strict data processing agreements.</li>
              </ul>
              <p className="mt-2 font-semibold">We never sell your personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is encrypted in transit (TLS/HTTPS) and at rest (AES-256).</li>
                <li>Access is restricted and audited.</li>
                <li>Regular penetration testing and security updates.</li>
                <li>In case of a breach, we will notify you and the Office of the Data Protection Commissioner within 72 hours.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights (Under Kenya Data Protection Act)</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access a copy of your data.</li>
                <li>Correct inaccurate information.</li>
                <li>Delete your data (subject to legal retention).</li>
                <li>Object to processing.</li>
                <li>Restrict processing.</li>
                <li>Withdraw consent at any time.</li>
                <li>Lodge a complaint with the ODPC.</li>
              </ul>
              <p className="mt-2">Email your request to: support@trukafrica.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Data Type</th>
                      <th className="border border-border p-3 text-left">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">Active Accounts</td>
                      <td className="border border-border p-3">Duration of account + 7 years</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Payment Records</td>
                      <td className="border border-border p-3">7 years (tax compliance)</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">Analytics Data</td>
                      <td className="border border-border p-3">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Cookies & Tracking</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies: Required for login, security, and core functionality.</li>
                <li>Analytics cookies: Optional – help us improve the app (you can disable).</li>
                <li>Third-party services: Paystack, Google Analytics – see their privacy policies.</li>
              </ul>
              <p className="mt-2">Manage preferences in Settings &gt; Privacy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
              <p>TRUKFLOW Africa is not intended for users under 18. We do not knowingly collect data from minors.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
              <p>Your data may be processed in Kenya, EU, or US. We ensure adequate safeguards using:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Binding Corporate Rules (where applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contact Our Data Protection Officer</h2>
              <div className="space-y-1">
                <p><strong>DPO: Data Protection Team</strong></p>
                <p>Email: support@trukafrica.com</p>
                <p>Phone: +254 758 594 951</p>
                <p>Response within 7 business days.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Changes to This Policy</h2>
              <p>We may update this Privacy Policy. Changes will be posted on this page with the updated date. Continued use means you accept the changes.</p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="font-semibold">By using TRUKFLOW Africa, you consent to this Privacy Policy.</p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
