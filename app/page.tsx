import { Hero } from "@/components/site/sections/hero";
import { Solutions } from "@/components/site/sections/solutions";
import { WorkProcess } from "@/components/site/sections/work-process";
import { Team } from "@/components/site/sections/team";
import { Projects } from "@/components/site/sections/projects";
import { TechStack } from "@/components/site/sections/tech-stack";
import { Contact } from "@/components/site/sections/contact";
import { SiteHeader } from "@/components/site/site-header";
import { CustomCursor } from "@/components/site/custom-cursor";
import { prisma } from "@/lib/prisma";
import { SiteFooter } from "@/components/site/site-footer";
import { About } from "@/components/site/sections/about";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageTransition } from "@/components/animations/motion-components";

const defaultHero = {
  id: "placeholder",
  title: "Creating Digital Experiences That Matter",
  subtitle: "We turn ideas into exceptional digital products",
  description:
    "A forward-thinking team of designers and developers creating innovative solutions that help businesses grow and succeed in the digital landscape.",
  imageUrl: "/images/image.png",
  buttonText: "Get in Touch",
  buttonUrl: "#contact",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const defaultSolutions = [
  {
    id: "1",
    title: "Web Development",
    description:
      "Creating fast, responsive, and user-friendly websites and web applications tailored to your specific business needs.",
    icon: "Code",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "UI/UX Design",
    description:
      "Crafting beautiful, intuitive interfaces with a focus on usability, accessibility, and an exceptional user experience.",
    icon: "Palette",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Mobile Development",
    description:
      "Building high-performance, feature-rich mobile applications for iOS and Android platforms.",
    icon: "Smartphone",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultWorkProcess = [
  {
    id: "1",
    title: "Discovery",
    description:
      "We start by understanding your business goals, target audience, and project requirements.",
    icon: "Search",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Planning",
    description:
      "Creating detailed project roadmap, wireframes, and technical specifications.",
    icon: "ClipboardList",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Development",
    description:
      "Building your solution using the latest technologies and best practices.",
    icon: "Code2",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Launch",
    description:
      "Thorough testing, deployment, and ongoing support to ensure success.",
    icon: "Rocket",
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultTeamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in digital product development, Alex leads our team with passion and vision.",
    imageUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    order: 1,
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Lead Designer",
    bio: "Sarah brings creativity and strategic thinking to every project, ensuring our designs are both beautiful and functional.",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    order: 2,
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Senior Developer",
    bio: "Michael is an expert in frontend and backend technologies with a knack for solving complex problems.",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    order: 3,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-featured online store with real-time inventory management and secure payments.",
    imageUrl:
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    projectUrl: "https://example.com",
    category: "Web Development",
    technologies: ["React", "Node.js", "PostgreSQL"],
    featured: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description:
      "Secure and user-friendly mobile banking application with biometric authentication.",
    imageUrl:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    projectUrl: "https://example.com",
    category: "Mobile Development",
    technologies: ["React Native", "TypeScript", "Firebase"],
    featured: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Healthcare Dashboard",
    description:
      "Interactive dashboard for healthcare professionals to monitor patient data in real-time.",
    imageUrl:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    projectUrl: "https://example.com",
    category: "UI/UX Design",
    technologies: ["Vue.js", "D3.js", "Tailwind CSS"],
    featured: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultTechnologies = [
  {
    id: "1",
    name: "React",
    imageUrl:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "TypeScript",
    imageUrl:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Node.js",
    imageUrl:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const defaultAbout = {
  id: "placeholder",
  title: "Who We Are",
  subtitle: "Passionate Team of Digital Innovators",
  description:
    "Founded in 2025, our team brings together experts in design, development, and digital strategy. We believe in creating digital solutions that not only look great but deliver real results for our clients. Our collaborative approach ensures that every project we undertake is tailored to meet the unique needs and goals of our clients.",
  imageUrl:
    "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  features: [
    "Client-focused approach with personalized solutions",
    "Agile development methodology for faster delivery",
    "Continuous support and maintenance",
    "Cutting-edge technologies and best practices",
    "Transparent communication throughout the project",
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default async function Home() {
  let heroData = defaultHero;
  let aboutData = defaultAbout;
  let solutions = defaultSolutions;
  let workProcess = defaultWorkProcess;
  let teamMembers = defaultTeamMembers;
  let projects = defaultProjects;
  let technologies = defaultTechnologies;

  try {
    // Attempt to fetch data from the database
    const [
      dbHero,
      dbSolutions,
      dbWorkProcess,
      dbTeamMembers,
      dbProjects,
      dbTechnologies,
    ] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.solution.findMany({ orderBy: { order: "asc" } }),
      prisma.workProcess.findMany({ orderBy: { order: "asc" } }),
      prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.technology.findMany({ orderBy: { order: "asc" } }),
    ]);

    // Use database data if available, otherwise keep defaults
    if (dbHero) heroData = dbHero;
    // if (dbAbout) aboutData = dbAbout;
    if (dbSolutions.length > 0) solutions = dbSolutions;
    if (dbWorkProcess.length > 0) workProcess = dbWorkProcess;
    // @ts-ignore
    if (dbTeamMembers.length > 0) teamMembers = dbTeamMembers;
    // @ts-ignore
    if (dbProjects.length > 0) projects = dbProjects;
    if (dbTechnologies.length > 0) technologies = dbTechnologies;
  } catch (error) {
    console.error("Failed to fetch data from database:", error);
    // Continue with default data
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="innobytex-theme">
      <PageTransition>
        <main className="min-h-screen relative overflow-x-hidden">
          {/* Global cursor */}
          <CustomCursor />

          {/* Navigation */}
          <SiteHeader />

          {/* Page sections with smooth transitions */}
          <div className="relative">
            <Hero data={heroData} />
            <About data={aboutData} />
            <Solutions data={solutions} />
            <WorkProcess data={workProcess} />
            {/* <Team data={teamMembers} /> */}
            <Projects data={projects} />
            <TechStack data={technologies} />
            <Contact />
          </div>

          {/* Footer */}
          <SiteFooter />
        </main>
      </PageTransition>
    </ThemeProvider>
  );
}
