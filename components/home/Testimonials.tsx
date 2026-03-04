"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Patient",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "The staff at BioXlab is incredibly professional. I received my results faster than expected, and the online portal is so easy to use. Highly recommended!",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Healthcare Provider",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "As a doctor, I rely on accurate and timely results. BioXlab has been my trusted partner for years. Their attention to detail is unmatched in the industry.",
            rating: 5,
        },
        {
            name: "Emily Davis",
            role: "Patient",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "I was nervous about my tests, but the phlebotomist was so gentle and kind. The facility is spotless and modern. A truly positive experience.",
            rating: 5,
        },
        {
            name: "David Wilson",
            role: "Clinic Manager",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            text: "Efficiency and reliability are key for our clinic, and BioXlab delivers both consistently. Their customer support team is also fantastic.",
            rating: 5,
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-emerald-400 font-semibold mb-2 tracking-wide">TESTIMONIALS</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Our Patients Say</h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-slate-900/50 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-emerald-500/30 h-full flex flex-col backdrop-blur-sm transition-all duration-300">
                                    <div className="flex text-amber-400 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <div className="mb-6 relative">
                                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-slate-700 -z-10 opacity-50" />
                                        <p className="text-slate-300 italic leading-relaxed relative z-10">"{testimonial.text}"</p>
                                    </div>
                                    <div className="mt-auto flex items-center gap-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                                        />
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                                            <p className="text-slate-500 text-xs">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
