"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Award,
  Coffee,
  Heart,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { IconButton } from "@/components/ui/modern-button";
import {
  ScrollReveal,
  Stagger,
} from "@/components/animations/motion-components";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  dribbble?: string | null;
  behance?: string | null;
};

type TeamProps = {
  data: TeamMember[];
};

// Social Link Component
function SocialLink({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
        "hover:scale-110 hover:shadow-lg",
        color
      )}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}

// Team Member Card Component
function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Asymmetrical positioning based on index
  const getCardVariant = () => {
    const variants = [
      "lg:translate-y-0",
      "lg:translate-y-8",
      "lg:translate-y-4",
      "lg:translate-y-12",
    ];
    return variants[index % variants.length];
  };

  const getImageClip = () => {
    const clips = [
      "clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)",
      "clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
      "clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
      "clip-path: polygon(0 0, 85% 0, 100% 100%, 15% 100%)",
    ];
    return clips[index % clips.length];
  };

  return (
    <motion.div
      className={cn(
        "group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-border/50",
        "hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-500",
        "hover:shadow-2xl hover:shadow-primary-500/10",
        getCardVariant()
      )}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -12,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Member Image */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ clipPath: getImageClip() }}
        >
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating social links */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-4 right-4 flex flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
            >
              {member.twitter && (
                <SocialLink
                  href={member.twitter}
                  icon={Twitter}
                  label="Twitter"
                  color="bg-blue-500 text-white hover:bg-blue-600"
                />
              )}
              {member.linkedin && (
                <SocialLink
                  href={member.linkedin}
                  icon={Linkedin}
                  label="LinkedIn"
                  color="bg-blue-700 text-white hover:bg-blue-800"
                />
              )}
              {member.github && (
                <SocialLink
                  href={member.github}
                  icon={Github}
                  label="GitHub"
                  color="bg-neutral-800 text-white hover:bg-neutral-900"
                />
              )}
              {(member.dribbble || member.behance) && (
                <SocialLink
                  href={member.dribbble || member.behance || "#"}
                  icon={ExternalLink}
                  label="Portfolio"
                  color="bg-accent-purple text-white hover:bg-accent-purple/80"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role badge */}
        <motion.div
          className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {member.role}
        </motion.div>
      </div>

      {/* Member Info */}
      <div className="p-6 relative z-10">
        <Typography.Heading
          size="lg"
          className="mb-2 group-hover:text-primary-600 transition-colors duration-200"
        >
          {member.name}
        </Typography.Heading>

        <Typography.Body size="md" color="muted" className="mb-4 line-clamp-3">
          {member.bio}
        </Typography.Body>

        {/* Stats/Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Coffee className="w-3 h-3" />
            <span>Coffee Lover</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>Remote</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>Expert</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full py-2 px-4 bg-gradient-to-r from-primary-50 to-accent-cyan/10 hover:from-primary-100 hover:to-accent-cyan/20 text-primary-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Show Less" : "Learn More"}
        </motion.button>

        {/* Expandable Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="mt-4 pt-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>
                    {member.name.toLowerCase().replace(" ", ".")}@innobytex.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Passionate about innovation</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export function Team({ data }: TeamProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Sort team members by order
  const sortedTeamMembers = [...data].sort((a, b) => a.order - b.order);

  return (
    <section
      id="team"
      className="relative py-20 bg-neutral-50/50 dark:bg-neutral-900/50 overflow-hidden"
    >
      {/* Floating elements */}
      <SectionFloatingElements density="medium" colors="mixed" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal type="up">
            <Typography.Display
              size="md"
              className="mb-4"
              gradient
              gradientType="primary"
            >
              Meet Our Team
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              Our diverse team of passionate professionals brings together years
              of experience, creativity, and technical expertise to deliver
              exceptional digital solutions.
            </Typography.Body>
          </ScrollReveal>

          {/* Team stats */}
          <motion.div
            className="flex justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <Typography.Heading size="lg" className="text-primary-600">
                {sortedTeamMembers.length}+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Team Members
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-green">
                50+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Projects Delivered
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

        {/* Team Grid - Asymmetrical Layout */}
        <div ref={ref}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {sortedTeamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <Typography.Heading size="lg" className="mb-4">
              Want to Join Our Team?
            </Typography.Heading>
            <Typography.Body size="lg" color="muted" className="mb-6">
              We're always looking for talented individuals who share our
              passion for innovation and excellence.
            </Typography.Body>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium shadow-lg hover:shadow-button-hover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
