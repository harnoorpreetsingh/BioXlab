import prisma from "@/lib/prisma";
import AboutHero from "@/components/about/AboutHero";
import StoryTimeline from "@/components/about/StoryTimeline";
import MissionValues from "@/components/about/MissionValues";
import TeamGrid from "@/components/about/TeamGrid";
import TechShowcase from "@/components/about/TechShowcase";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import AboutCTA from "@/components/about/AboutCTA";
import Stats, { StatItemType } from "@/components/home/Stats";
import Certifications from "@/components/about/Certifications";

export const metadata = {
    title: "About Us | BioXLab",
    description: "Learn more about our mission, vision, and the technology powering BioXLab.",
};

export default async function AboutPage() {
    // Fetch live metrics from the database
    const [testCount, labCount, userCount, bookingCount] = await Promise.all([
        prisma.test.count(),
        prisma.labBranch.count(),
        prisma.user.count(),
        prisma.booking.count(),
    ]);

    const dynamicStats: StatItemType[] = [
        { value: testCount, label: "Available Tests", suffix: "+" },
        { value: labCount, label: "Lab Branches", suffix: "" },
        { value: userCount, label: "Registered Users", suffix: "+" },
        { value: bookingCount, label: "Successful Bookings", suffix: "+" },
    ];

    return (
        <main className="min-h-screen bg-slate-950">
            <AboutHero />
            <Certifications />
            <StoryTimeline />
            <MissionValues />
            <Stats stats={dynamicStats} />
            <TeamGrid />
            <TechShowcase />
            <WhyChooseUs />
            <Testimonials />
            <AboutCTA />
        </main>
    );
}
