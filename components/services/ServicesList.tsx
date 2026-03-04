"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Activity, IndianRupee, Clock } from "lucide-react";

type Test = {
    id: string;
    name: string;
    description: string | null;
    price: string | null;
    reportTime: string | null;
};

type Category = {
    id: string;
    name: string;
    description: string | null;
    tests: Test[];
};

export default function ServicesList({ categories }: { categories: Category[] }) {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
    const [searchQuery, setSearchQuery] = useState("");

    const selectedCategory = categories.find((c) => c.id === activeCategory);

    const filteredTests = selectedCategory?.tests.filter((test) =>
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.description && test.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

    return (
        <section className="py-20 bg-slate-950 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar - Categories */}
                    <div className="lg:w-1/4 shrink-0">
                        <div className="sticky top-28 bg-slate-900/50 border border-slate-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-400" />
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${activeCategory === category.id
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                                            }`}
                                    >
                                        <span className="font-medium">{category.name}</span>
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeCategory === category.id ? "rotate-90 text-emerald-400" : "text-slate-600 group-hover:text-slate-400"
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Tests */}
                    <div className="lg:w-3/4 flex-1">
                        {/* Search Bar */}
                        <div className="mb-10 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder={`Search tests in ${selectedCategory?.name || "this category"}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-lg backdrop-blur-sm"
                            />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500 -z-10" />
                        </div>

                        {/* Category Header */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-4">{selectedCategory?.name}</h2>
                                <p className="text-slate-400 leading-relaxed max-w-3xl">
                                    {selectedCategory?.description || "Explore our comprehensive range of tests in this category, designed to provide accurate and timely insights into your health."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Test Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-6 min-h-[400px] content-start">
                            <AnimatePresence mode="popLayout">
                                {filteredTests.length > 0 ? (
                                    filteredTests.map((test, index) => (
                                        <motion.div
                                            key={test.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                                        >
                                            {/* Hover Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10">
                                                <h4 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                                                    {test.name}
                                                </h4>
                                                <p className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                                                    {test.description || "Detailed analysis to assist in accurate diagnosis and monitoring."}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                                                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                                                        <div className="flex items-center gap-1.5">
                                                            <IndianRupee className="w-4 h-4 text-emerald-500" />
                                                            <span className="font-medium text-emerald-400">{test.price ? `₹${test.price}` : "Varies"}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4 text-slate-500" />
                                                            <span>{test.reportTime || "24-48 hrs"}</span>
                                                        </div>
                                                    </div>

                                                    <button className="text-emerald-400 hover:text-emerald-300 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                        Book Now <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-20 text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-4">
                                            <Search className="w-6 h-6 text-slate-500" />
                                        </div>
                                        <h3 className="text-xl font-medium text-slate-300 mb-2">No tests found</h3>
                                        <p className="text-slate-500">We couldn't find any tests matching your search in this category.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
