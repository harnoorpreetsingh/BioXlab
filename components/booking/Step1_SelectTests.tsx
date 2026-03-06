"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FlaskConical, Clock, Info, Check, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchTests, fetchTestCategories } from "@/utils/data/tests";
import { TestWithCategory } from "@/components/tests/tests-list";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Step1Props {
    selectedTests: TestWithCategory[];
    onTestsChange: (tests: TestWithCategory[]) => void;
    onNext: () => void;
}

const Step1_SelectTests = ({ selectedTests, onTestsChange, onNext }: Step1Props) => {
    const [tests, setTests] = useState<TestWithCategory[]>([]);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [testsData, categoriesData] = await Promise.all([
                    fetchTests(),
                    fetchTestCategories(),
                ]);
                setTests(testsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to load tests", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredTests = tests.filter((test) => {
        const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (test.description && test.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory ? test.test_category?.id === selectedCategory : true;

        return matchesSearch && matchesCategory;
    });

    const toggleTest = (test: TestWithCategory) => {
        const isSelected = selectedTests.some((t) => t.id === test.id);
        if (isSelected) {
            onTestsChange(selectedTests.filter((t) => t.id !== test.id));
        } else {
            onTestsChange([...selectedTests, test]);
        }
    };

    const totalCost = selectedTests.reduce((sum, test) => sum + (Number(test.cost) || 0), 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-400">Loading available tests...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header & Search */}
            <div className="mb-8 space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Select Your Tests</h2>
                    <p className="text-slate-400">Choose from our wide range of diagnostic tests</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30 bg-slate-950/95 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-xl">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by test name or keyword..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-4">
                        <Button
                            variant={selectedCategory === null ? "default" : "outline"}
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "whitespace-nowrap px-4 py-1 h-8 text-xs rounded-full transition-all",
                                selectedCategory === null
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                                    : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:border-emerald-500/50"
                            )}
                        >
                            All Checks
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category.id)}
                                className={cn(
                                    "whitespace-nowrap px-4 py-1 h-8 text-xs rounded-full transition-all",
                                    selectedCategory === category.id
                                        ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:border-emerald-500/50"
                                )}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                <AnimatePresence>
                    {filteredTests.map((test) => {
                        const isSelected = selectedTests.some((t) => t.id === test.id);
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={test.id}
                                className={cn(
                                    "group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                                    isSelected
                                        ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                        : "bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50"
                                )}
                                onClick={() => toggleTest(test)}
                            >
                                {/* Selected Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        <FlaskConical className={cn(
                                            "w-6 h-6",
                                            isSelected ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"
                                        )} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-slate-400 mb-1">Price</div>
                                        <div className="text-xl font-bold text-white">₹{test.cost || 0}</div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                    {test.name}
                                </h3>

                                <p className="text-sm text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                                    {test.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center text-xs text-slate-500 gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{test.duration || "24 hrs"}</span>
                                    </div>
                                    <div className={cn(
                                        "text-sm font-medium transition-colors",
                                        isSelected ? "text-emerald-500" : "text-slate-500 group-hover:text-emerald-500"
                                    )}>
                                        {isSelected ? "Selected" : "Add to Booking"}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filteredTests.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-500">
                        <FlaskConical className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>No tests found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Floating Summary Footer */}
            <AnimatePresence>
                {selectedTests.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 z-50 shadow-2xl"
                    >
                        <div className="container mx-auto max-w-6xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                    <span className="text-slate-400 text-sm">Selected Tests:</span>
                                    <div className="text-white font-medium">{selectedTests.length} Items</div>
                                </div>
                                <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
                                <div>
                                    <span className="text-slate-400 text-sm">Total Estimated Cost:</span>
                                    <div className="text-2xl font-bold text-emerald-400">₹{totalCost}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="hidden md:flex bg-transparent border-slate-700 text-slate-300 px-8 py-6 rounded-xl hover:text-white hover:bg-slate-800"
                                    onClick={() => onTestsChange([])}
                                >
                                    Clear Selection
                                </Button>
                                <Button
                                    onClick={onNext}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/80 hover:scale-105 transition-all"
                                >
                                    Continue to Details
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Step1_SelectTests;
