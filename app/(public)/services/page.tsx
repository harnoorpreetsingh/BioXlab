import prisma from "@/lib/prisma";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
    title: "Our Services | BioXLab",
    description: "Explore our comprehensive range of diagnostic and pathology services.",
};

export default async function ServicesPage() {
    // Fetch all categories and their tests
    const categoriesDb = await prisma.testCategory.findMany({
        include: {
            tests: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    reportTime: true,
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });

    // Serialize Decimal objects returned from Prisma if they exist for price
    const categories = categoriesDb.map(cat => ({
        ...cat,
        tests: cat.tests.map(test => ({
            ...test,
            price: test.price ? test.price.toString() : null,
        }))
    }));

    return (
        <main className="min-h-screen bg-slate-950">
            <ServicesHero />
            <ServicesList categories={categories} />
            <div className="relative">
                <Testimonials />
                {/* Subtle decorative split line to blend components */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
            </div>
        </main>
    );
}
