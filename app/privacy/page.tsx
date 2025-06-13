"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Button variant="ghost" asChild className="mb-6">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: December 2024
              </p>
            </motion.div>

            {/* Privacy Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Data Protection</h3>
                <p className="text-sm text-muted-foreground">
                  We use industry-standard security measures
                </p>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Clear information about data usage
                </p>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Your Control</h3>
                <p className="text-sm text-muted-foreground">
                  You control your personal information
                </p>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">No Selling</h3>
                <p className="text-sm text-muted-foreground">
                  We never sell your personal data
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    1. Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information you provide directly to us, such as
                    when you:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Fill out our contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request a quote or consultation</li>
                    <li>Communicate with us via email or phone</li>
                    <li>Use our website and services</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    This may include your name, email address, phone number,
                    company information, project details, and any other
                    information you choose to provide.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>
                      Respond to your inquiries and provide customer support
                    </li>
                    <li>Send you technical notices and support messages</li>
                    <li>
                      Communicate with you about projects, services, and
                      promotional offers
                    </li>
                    <li>Process transactions and send related information</li>
                    <li>Monitor and analyze trends and usage</li>
                    <li>
                      Detect, investigate, and prevent fraudulent transactions
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    3. Information Sharing and Disclosure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties except in the following
                    circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>With your explicit consent</li>
                    <li>
                      To trusted service providers who assist us in operating
                      our website and conducting business
                    </li>
                    <li>
                      When required by law or to protect our rights and safety
                    </li>
                    <li>
                      In connection with a merger, acquisition, or sale of
                      assets
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction. This includes encryption, secure servers, and
                    regular security assessments. However, no method of
                    transmission over the internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    5. Cookies and Tracking Technologies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>
                      Improve our website functionality and user experience
                    </li>
                    <li>Provide personalized content and advertisements</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    You can control cookies through your browser settings, but
                    disabling them may affect website functionality.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    6. Your Rights and Choices
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                    <li>Object to processing of your personal information</li>
                    <li>Request data portability</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    To exercise these rights, please contact us using the
                    information provided below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    7. Data Retention
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this privacy
                    policy, unless a longer retention period is required or
                    permitted by law. When we no longer need your information,
                    we will securely delete or anonymize it.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    8. Third-Party Links
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our website may contain links to third-party websites. We
                    are not responsible for the privacy practices or content of
                    these external sites. We encourage you to review the privacy
                    policies of any third-party sites you visit.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    9. Children's Privacy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If we become aware that we have collected
                    such information, we will take steps to delete it promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    10. Changes to This Privacy Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will
                    notify you of any material changes by posting the new policy
                    on this page and updating the "Last updated" date. We
                    encourage you to review this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    11. Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="p-6 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          General Inquiries
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          <strong>Email:</strong> office@innobytex.com
                          <br />
                          <strong>Phone:</strong> +959 408 688 648 , +959 425
                          743 536, +959 797 961 628
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Mailing Address</h4>
                        <p className="text-muted-foreground text-sm">
                          No.Nga-4/89, 64th St 108 & 109 St,
                          <br />
                          ChanMyathazi Township, Mandalay
                          <br />
                          Myanmar
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
