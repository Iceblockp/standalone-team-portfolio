"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import {
  AnimatedInput,
  AnimatedButton,
} from "@/components/animations/micro-interactions";
import { ScrollReveal } from "@/components/animations/motion-components";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { toast } from "sonner";
import { createContact } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Contact Info Card Component
function ContactInfoCard({
  icon: Icon,
  title,
  content,
  link,
  index,
}: {
  icon: any;
  title: string;
  content: string;
  link?: string;
  index: number;
}) {
  const CardContent = (
    <motion.div
      className="group p-6 rounded-2xl glass-card hover:shadow-lg transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <Typography.Heading
            size="sm"
            className="mb-2 group-hover:text-primary-600 transition-colors duration-200"
          >
            {title}
          </Typography.Heading>
          <Typography.Body size="md" color="muted">
            {content}
          </Typography.Body>
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

// Modern Form Component
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await createContact(data);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Message sent successfully!");
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="glass-card p-8 rounded-2xl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="mb-8">
        <Typography.Heading size="lg" className="mb-3">
          Send us a Message
        </Typography.Heading>
        <Typography.Body size="md" color="muted">
          Fill out the form below and we'll get back to you within 24 hours.
        </Typography.Body>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedInput
            label="Full Name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
            disabled={isSubmitting}
          />

          <AnimatedInput
            label="Email Address"
            type="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
            disabled={isSubmitting}
          />
        </div>

        <AnimatedInput
          label="Subject"
          {...form.register("subject")}
          error={form.formState.errors.subject?.message}
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Message
          </label>
          <motion.textarea
            className={cn(
              "w-full px-4 py-3 border-2 rounded-lg bg-background transition-colors duration-200 min-h-[120px] resize-none",
              "focus:outline-none focus:ring-0",
              form.formState.errors.message
                ? "border-error text-error"
                : "border-neutral-300 focus:border-primary-500"
            )}
            placeholder="Tell us about your project..."
            {...form.register("message")}
            disabled={isSubmitting}
            whileFocus={{ scale: 1.01 }}
          />
          {form.formState.errors.message && (
            <motion.p
              className="mt-1 text-sm text-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {form.formState.errors.message.message}
            </motion.p>
          )}
        </div>

        <AnimatedButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          success={isSuccess}
          className="w-full"
          icon={
            isSuccess ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )
          }
          iconPosition="right"
        >
          {isSubmitting
            ? "Sending..."
            : isSuccess
            ? "Message Sent!"
            : "Send Message"}
        </AnimatedButton>
      </form>

      {/* Additional info */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>We typically respond within 24 hours</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "office@innobytex.com",
      link: "mailto:office@innobytex.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+959 797 961 628",
      link: "tel:+959797961628",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Kun Ywe Street, Kyi Myin Daing Township, Yangon",
      link: "https://maps.app.goo.gl/NhDF4Qse5u3fufTm6",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM EST",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating elements */}
      <SectionFloatingElements density="low" colors="mixed" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal type="up">
            <Typography.Display
              size="md"
              className="mb-4"
              gradient
              gradientType="primary"
            >
              Get in Touch
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              Ready to bring your vision to life? Let's discuss your project and
              explore how we can help you achieve your goals with innovative
              digital solutions.
            </Typography.Body>
          </ScrollReveal>

          {/* Quick stats */}
          <motion.div
            className="flex justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <Typography.Heading size="lg" className="text-primary-600">
                24h
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Response Time
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-green">
                100%
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Client Satisfaction
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-purple">
                5+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Years Experience
              </Typography.Body>
            </div>
          </motion.div>
        </div>

        {/* Split Layout */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography.Heading size="lg" className="mb-6">
                Let's Start a Conversation
              </Typography.Heading>
              <Typography.Body size="lg" color="muted" className="mb-8">
                Whether you have a specific project in mind or just want to
                explore possibilities, we're here to help. Reach out through any
                of the channels below.
              </Typography.Body>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={info.title}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  link={info.link}
                  index={index}
                />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Typography.Heading size="sm" className="mb-4">
                Follow Us
              </Typography.Heading>
              <div className="flex gap-4">
                {[
                  { name: "LinkedIn", icon: Globe, link: "#" },
                  { name: "Twitter", icon: MessageCircle, link: "#" },
                  { name: "GitHub", icon: Globe, link: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-950 hover:bg-primary-100 dark:hover:bg-primary-900 flex items-center justify-center text-primary-600 hover:text-primary-700 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal type="up">
          <div className="mt-20 text-center glass-card p-8 rounded-2xl">
            <Typography.Heading size="lg" className="mb-4">
              Prefer to Schedule a Call?
            </Typography.Heading>
            <Typography.Body size="lg" color="muted" className="mb-6">
              Book a free 30-minute consultation to discuss your project in
              detail.
            </Typography.Body>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-button-hover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              Schedule a Call
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
