"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Microscope,
  FlaskRoundIcon as Flask,
  Atom,
  Beaker,
  Dna,
  ArrowRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// JSON Data for reusable components
const heroData = {
  backgroundImage:
    "https://images.pexels.com/photos/9574327/pexels-photo-9574327.jpeg",
  welcomeText: "Welcome To LosAlamos",
  title: "Serving Science & Technology",
  buttonText: "Our Service",
};

const awardData = {
  title: "Best Laboratory Award Winner Year 2021-2024",
  description:
    "The standard chunk of Lorem Ipsum used since the 1500s is reproduced.",
};

const aboutData = {
  image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
  subtitle: "About Us",
  title: "We Employ The Latest Research Technology & Company",
  description:
    "Our scientists and engineers focus their extreme curiosity on national and global security & health related challenges. Learn more about the Laboratory's R&D and science segment.",
  features: [
    {
      number: "01",
      title: "Central Forensic Science",
      description:
        "Forensic science is a discipline that applies scientific analysis to the justice system, help prove the events of crime.",
    },
    {
      number: "02",
      title: "Clinical & Medical Laboratory",
      description:
        "Conducts lab tests ordered by doctors. Working with laboratory machines as we examine human tissue samples & diagnose.",
    },
    {
      number: "03",
      title: "Analytical & Quality Laboratory",
      description:
        "The various techniques that we are used to identifying the chemical makeup and characteristics of a particular samples.",
    },
  ],
};

const statsData = {
  subtitle: "Priority Delivered",
  title: "We Have Great Facts",
  description:
    "On the other hand we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the pleasure of the desire that they cannot foresee.",
  stats: [
    { value: "1000", label: "Happy Clients" },
    { value: "302", label: "Total Members" },
    { value: "50+", label: "Years of Experience" },
    { value: "640", label: "Work Suppliers" },
  ],
};

const servicesData = {
  subtitle: "What We Do Now",
  title: "Explore Our Main Services",
  services: [
    {
      image:
        "https://images.pexels.com/photos/9628833/pexels-photo-9628833.jpeg",
      title: "Pathology Testing",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    },
    {
      image:
        "https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg",
      title: "Chemical Research",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    },
    {
      image:
        "https://images.pexels.com/photos/8539453/pexels-photo-8539453.jpeg",
      title: "Advanced Microscopy",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    },
  ],
};

const technologyData = {
  image: "https://images.pexels.com/photos/3908182/pexels-photo-3908182.jpeg",
  subtitle: "A GREAT TECHNOLOGY",
  title: "We Are The Trusted Experts Latest Laboratory Technology",
  description:
    "Pharmaceutical healthcare field attracts to save lives & helping people, being a doctor is not your only choice. We help also you can help patients without being a doctor, here we serving awesome opportunity.",
  features: [
    { icon: Microscope, label: "Cardioscience EIA" },
    { icon: Flask, label: "Sample Preparation" },
    { icon: Beaker, label: "Environmental Testing" },
    { icon: Dna, label: "Anatomical Pathology" },
    { icon: Microscope, label: "Advanced Microscopy" },
  ],
  contactText: "Don't hesitate, contact us for better help and services.",
  buttonText: "Explore all Technology",
};

const expertiseData = {
  subtitle: "Experience",
  title: "Lab Trusted Experts",
  description:
    "We know how to bring the security you need. With an experience in a wide range of fields and devices.",
  skills: [
    { name: "Sample Preparation", value: 68 },
    { name: "Environmental Testing", value: 80 },
    { name: "Advanced Microscopy", value: 61 },
    { name: "Medical Research", value: 70 },
  ],
};

const testimonialsData = {
  subtitle: "Testimonial",
  title: "What Our Patient Say",
  testimonials: [
    {
      image: "https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut",
      name: "JOSAN DEO",
      company: "Plastic Touch",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Tp9QV0YOLXrb3m0G6FyUlGcx5sBr8UNN7Ez6nj6u7qOi-LXNL2P0Gx9ynX80l-gXYFc&usqp=CAU",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut",
      name: "JOSAN MEILA",
      company: "Media Touch",
    },
  ],
};

const partnersData = {
  partners: [
    { icon: Flask, name: "COMPANY LAB" },
    { icon: Atom, name: "PHARMACY" },
    { icon: Beaker, name: "BINARY LAB" },
    { icon: Flask, name: "SCIENCELAB" },
    { icon: Atom, name: "GEAR LAB" },
  ],
};

// Reusable Components
type HeroSectionProps = {
  data: {
    backgroundImage: string;
    welcomeText: string;
    title: string;
    buttonText: string;
  };
};

const HeroSection = ({ data }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    gsap.fromTo(
      heroElement?.querySelector(".hero-content"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      heroElement?.querySelector(".hero-button"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <section className="relative" ref={heroRef}>
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="relative h-[500px] overflow-hidden">
        <Image
          src={data.backgroundImage}
          alt="Laboratory interior"
          width={1200}
          height={500}
          className="object-cover w-full h-full !transform-none"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-16">
          <div className="text-white max-w-3xl hero-content">
            <p className="text-sm mb-2">{data.welcomeText}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {data.title}
            </h1>
            <Button className="bg-emerald-700 hover:bg-emerald-800 mt-4 hero-button">
              {data.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

type AwardSectionProps = {
  data: {
    title: string;
    description: string;
  };
};

const AwardSection = ({ data }: AwardSectionProps) => {
  const awardRef = useRef(null);

  useEffect(() => {
    const awardElement = awardRef.current;

    gsap.fromTo(
      awardElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section className="bg-emerald-700 text-white py-6 px-4" ref={awardRef}>
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{data.title}</h2>
        <p className="text-sm opacity-80">{data.description}</p>
      </div>
    </section>
  );
};

type AboutSectionProps = {
  data: {
    image: string;
    subtitle: string;
    title: string;
    description: string;
    features: {
      number: string;
      title: string;
      description: string;
    }[];
  };
};

const AboutSection = ({ data }: AboutSectionProps) => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const aboutElement = aboutRef.current;
    if (!aboutElement) return;
    gsap.fromTo(
      aboutElement?.querySelector(".about-image"),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutElement,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      aboutElement?.querySelector(".about-content"),
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutElement,
          start: "top 80%",
        },
      }
    );

    const features = aboutElement?.querySelectorAll(".feature-item");
    gsap.fromTo(
      features,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: aboutElement?.querySelector(".features"),
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section className="py-16 px-4" ref={aboutRef}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="about-image">
            <Image
              src={data.image}
              alt="Laboratory researchers"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="about-content">
            <p className="text-sm text-emerald-700 mb-2">{data.subtitle}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
              {data.title}
            </h2>
            <p className="text-gray-600 mb-6">{data.description}</p>

            <div className="space-y-6 features">
              {data.features.map((feature, index) => (
                <div key={index} className="flex gap-4 feature-item">
                  <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-emerald-700 shrink-0">
                    {feature.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type StatsSectionProps = {
  data: {
    subtitle: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
};

const StatsSection = ({ data }: StatsSectionProps) => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const statsElement = statsRef.current;
    if (!statsElement) return;
    gsap.fromTo(
      statsElement?.querySelector(".stats-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: statsElement,
          start: "top 80%",
        },
      }
    );

    const statItems = statsElement?.querySelectorAll(".stat-item");
    gsap.fromTo(
      statItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsElement?.querySelector(".stats-grid"),
          start: "top 85%",
        },
      }
    );

    // Animate stat counters
    statItems.forEach((item) => {
      const countElement = item.querySelector(".count-element");
      if (!countElement) return;

      const rawValue = countElement.getAttribute("data-value") ?? "";
      const endValue = parseInt(rawValue.replace(/\D/g, "")) || 0;

      gsap.fromTo(
        countElement,
        { innerText: "0" },
        {
          innerText: endValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
          onUpdate: function () {
            const valueDisplay = Math.ceil(this.targets()[0].innerText);
            const displayValue = rawValue.includes("+")
              ? valueDisplay + "+"
              : valueDisplay.toString();
            (countElement as HTMLElement).innerText = displayValue;
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-white" ref={statsRef}>
      <div className="container mx-auto">
        <div className="text-center mb-12 stats-header">
          <p className="text-emerald-700 mb-2">{data.subtitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            {data.title}
          </h2>
          <Separator className="max-w-xs mx-auto" />
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-sm">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center stats-grid">
          {data.stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 count-element"
                data-value={stat.value}
              >
                0
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type ServicesSectionProps = {
  data: {
    subtitle: string;
    title: string;
    services: {
      image: string;
      title: string;
      description: string;
    }[];
  };
};

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const servicesElement = servicesRef.current;
    if (!servicesElement) return;

    gsap.fromTo(
      servicesElement?.querySelector(".services-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: servicesElement,
          start: "top 80%",
        },
      }
    );

    const cards = servicesElement?.querySelectorAll(".service-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesElement?.querySelector(".services-grid"),
          start: "top 80%",
        },
      }
    );

    // Add hover animation for each card
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-blue-50" ref={servicesRef}>
      <div className="container mx-auto">
        <div className="text-center mb-12 services-header">
          <p className="text-gray-600 mb-2">{data.subtitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            {data.title}
          </h2>
          <Separator className="max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 services-grid">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm service-card"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover service-image"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {service.description}
                </p>
                <div className="text-center">
                  <Button
                    variant="ghost"
                    className="text-emerald-700 hover:text-emerald-800 service-button"
                  >
                    READ MORE <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type TechnologySectionProps = {
  data: {
    image: string;
    subtitle: string;
    title: string;
    description: string;
    features: { icon: React.ElementType; label: string }[];
    contactText: string;
    buttonText: string;
  };
};

const TechnologySection = ({ data }: TechnologySectionProps) => {
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const techElement = techRef.current;
    if (!techElement) return;
    gsap.fromTo(
      techElement?.querySelector(".tech-image"),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: techElement,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      techElement?.querySelector(".tech-content"),
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: techElement,
          start: "top 70%",
        },
      }
    );

    const features = techElement?.querySelectorAll(".tech-feature");
    gsap.fromTo(
      features,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: techElement?.querySelector(".tech-features"),
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      techElement?.querySelector(".tech-button"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.8,
        scrollTrigger: {
          trigger: techElement?.querySelector(".tech-features"),
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="py-16 px-4" ref={techRef}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="tech-image">
            <Image
              src={data.image}
              alt="Microscope"
              width={600}
              height={400}
              className="rounded-lg"
              style={{
                maxWidth: "100%",
                height: "500px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="tech-content">
            <p className="text-sm text-gray-600 mb-2">{data.subtitle}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6">
              {data.title}
            </h2>
            <p className="text-gray-600 mb-6">{data.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 tech-features">
              {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 tech-feature"
                >
                  <div className="text-emerald-700">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-emerald-700 text-sm mb-4">{data.contactText}</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 tech-button">
              {data.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

type ExpertiseSectionProps = {
  data: {
    subtitle: string;
    title: string;
    description: string;
    skills: { name: string; value: number }[];
  };
};

const ExpertiseSection = ({ data }: ExpertiseSectionProps) => {
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const expertiseElement = expertiseRef.current;
    if (!expertiseElement) return;
    gsap.fromTo(
      expertiseElement.querySelector(".expertise-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: expertiseElement,
          start: "top 80%",
        },
      }
    );

    const progressBars = expertiseElement.querySelectorAll(".progress-item");
    progressBars.forEach((bar, index) => {
      const progressValue = parseInt(bar.getAttribute("data-value") ?? "0");

      const progressElement = bar.querySelector(".expertise-progress");
      if (!progressElement) return;

      gsap.fromTo(
        progressElement,
        { width: "0%" },
        {
          width: `${progressValue}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: expertiseElement,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      className="py-16 px-4 bg-emerald-800 text-white"
      ref={expertiseRef}
    >
      <div className="container mx-auto">
        <div className="mb-8 expertise-header">
          <p className="text-emerald-200 mb-2">{data.subtitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{data.title}</h2>
          <Separator className="bg-emerald-600 max-w-xs" />
          <p className="mt-4 text-emerald-100 max-w-2xl">{data.description}</p>
        </div>

        <div className="space-y-6">
          {data.skills.map((skill, index) => (
            <div key={index} className="progress-item" data-value={skill.value}>
              <div className="flex justify-between mb-2">
                <span>{skill.name}</span>
                <span>{skill.value}%</span>
              </div>
              <div className="h-2 bg-emerald-900 rounded-full">
                <div
                  className="expertise-progress h-full bg-emerald-400 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type TestimonialsSectionProps = {
  data: {
    subtitle: string;
    title: string;
    testimonials: {
      image: string;
      quote: string;
      name: string;
      company: string;
    }[];
  };
};

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const testimonialsElement = testimonialsRef.current;
    if (!testimonialsElement) return;

    gsap.fromTo(
      testimonialsElement.querySelector(".testimonials-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: testimonialsElement,
          start: "top 80%",
        },
      }
    );

    const testimonialCards =
      testimonialsElement.querySelectorAll(".testimonial-card");
    gsap.fromTo(
      testimonialCards,
      { opacity: 0, y: 50, rotationY: 15 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: testimonialsElement.querySelector(".testimonials-grid"),
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="py-16 px-4" ref={testimonialsRef}>
      <div className="container mx-auto">
        <div className="text-center mb-12 testimonials-header">
          <p className="text-gray-600 mb-2">{data.subtitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            {data.title}
          </h2>
          <Separator className="max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto testimonials-grid">
          {data.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm testimonial-card"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={testimonial.image}
                  alt="Testimonial"
                  width={80}
                  height={80}
                  className="rounded-full mb-4 testimonial-image"
                />
                <p className="text-gray-600 mb-4 text-sm testimonial-quote">
                  {testimonial.quote}
                </p>
                <div className="text-2xl font-serif mb-2">&apos;</div>
                <h3 className="text-emerald-700 font-bold">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type PartnersSectionProps = {
  data: {
    partners: { icon: React.ElementType; name: string }[];
  };
};

const PartnersSection = ({ data }: PartnersSectionProps) => {
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const partnersElement = partnersRef.current;
    if (!partnersElement) return;
    const partnerItems = partnersElement.querySelectorAll(".partner-item");
    gsap.fromTo(
      partnerItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: partnersElement,
          start: "top 85%",
        },
      }
    );

    // Add pulsing animation to partner icons
    partnerItems.forEach((partner) => {
      const icon = partner.querySelector(".partner-icon");
      gsap.to(icon, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section className="py-16 px-4 bg-blue-50" ref={partnersRef}>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {data.partners.map((partner, index) => (
            <div key={index} className="text-gray-400 partner-item">
              <partner.icon className="h-12 w-12 mx-auto mb-2 partner-icon" />
              <p className="text-xs text-center">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Component
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastShown = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error && !toastShown.current) {
      toastShown.current = true;
      toast.error(decodeURIComponent(error));
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a smooth page reveal animation on initial load
    const tl = gsap.timeline();
    tl.fromTo(
      "main",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Add scroll-triggered animations for sections
    gsap.utils.toArray<HTMLElement>("section").forEach((section, i) => {
      const image = section.querySelector("img");
      if (image) {
        gsap.to(image, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Add floating animation to buttons
    gsap.utils.toArray<HTMLButtonElement>("button").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
        });
      });
    });


    return () => {
      // Clean up ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <HeroSection data={heroData} />
        <AwardSection data={awardData} />
        <AboutSection data={aboutData} />
        <StatsSection data={statsData} />
        <ServicesSection data={servicesData} />
        <TechnologySection data={technologyData} />
        <ExpertiseSection data={expertiseData} />
        <TestimonialsSection data={testimonialsData} />
        <PartnersSection data={partnersData} />
      </main>
    </div>
  );
}
