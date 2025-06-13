"use client";

import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: December 2024
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using StudioFlow's website and services,
                    you accept and agree to be bound by the terms and provision
                    of this agreement. If you do not agree to abide by the
                    above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    2. Services Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    StudioFlow provides digital agency services including but
                    not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Web development and design</li>
                    <li>Mobile application development</li>
                    <li>UI/UX design services</li>
                    <li>Digital consulting</li>
                    <li>Technical support and maintenance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    3. User Responsibilities
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As a user of our services, you agree to:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>
                      Provide accurate and complete information when requested
                    </li>
                    <li>
                      Maintain the confidentiality of your account credentials
                    </li>
                    <li>
                      Use our services in compliance with all applicable laws
                    </li>
                    <li>
                      Not engage in any activity that could harm our systems or
                      other users
                    </li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    4. Payment Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Payment terms will be specified in individual project
                    agreements. Generally, we require a deposit before beginning
                    work, with the remainder due upon project completion. Late
                    payments may incur additional fees as specified in the
                    project agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    5. Intellectual Property
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Upon full payment, clients receive ownership of the final
                    deliverables created specifically for their project.
                    However, StudioFlow retains the right to use general
                    methodologies, techniques, and knowledge gained during the
                    project for future work. We also retain the right to
                    showcase completed work in our portfolio unless otherwise
                    agreed upon.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    6. Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    StudioFlow shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including
                    without limitation, loss of profits, data, use, goodwill, or
                    other intangible losses, resulting from your use of our
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    7. Termination
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Either party may terminate services with written notice.
                    Upon termination, payment will be due for all work completed
                    up to the termination date. Any materials or work products
                    will be delivered in their current state.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    8. Privacy Policy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. Please review our Privacy
                    Policy, which also governs your use of our services, to
                    understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    9. Changes to Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We
                    will notify users of any material changes via email or
                    through our website. Continued use of our services after
                    such modifications constitutes acceptance of the updated
                    terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">
                    10. Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> legal@studioflow.com
                      <br />
                      <strong>Address:</strong> 123 Innovation Street, Tech
                      District, San Francisco, CA 94105
                      <br />
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
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
