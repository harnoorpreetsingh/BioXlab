"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#206c58] text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Get in touch with our team for any inquiries about our laboratory
            services
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Location</h3>
              <p className="text-gray-600">
                123 Science Avenue
                <br />
                Research Park
                <br />
                CA 90210, USA
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone Number</h3>
              <p className="text-gray-600">
                Main: +1 (555) 123-4567
                <br />
                Toll-Free: +1 (800) 987-6543
                <br />
                Fax: +1 (555) 765-4321
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Address</h3>
              <p className="text-gray-600">
                General Inquiries: info@losalamoslab.com
                <br />
                Customer Support: support@losalamoslab.com
                <br />
                Careers: careers@losalamoslab.com
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <p className="text-gray-600">
                Have questions about our laboratory services? Fill out the form
                below and one of our team members will get back to you as soon
                as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Service Inquiry"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[120px]"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#206c58] hover:bg-[#185446]"
                >
                  Send Message
                </Button>
              </form>

              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>We typically respond within 24-48 business hours.</span>
              </div>
            </div>

            <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Laboratory Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visit our state-of-the-art laboratory facility located in Research
              Park.
            </p>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Map Location"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h3 className="text-xl font-bold mb-2">LosAlamos Laboratory</h3>
                <p className="text-gray-600 mb-4">
                  123 Science Avenue
                  <br />
                  Research Park
                  <br />
                  CA 90210, USA
                </p>
                <Button className="bg-[#206c58] hover:bg-[#185446]">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to commonly asked questions about our laboratory
              services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                What are your operating hours?
              </h3>
              <p className="text-gray-600">
                Our laboratory is open Monday through Friday from 8:00 AM to
                6:00 PM. We are closed on weekends and major holidays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                How do I submit samples for testing?
              </h3>
              <p className="text-gray-600">
                You can submit samples in person at our facility or arrange for
                pickup by contacting our customer service team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                What is your turnaround time for results?
              </h3>
              <p className="text-gray-600">
                Turnaround times vary depending on the type of test. Standard
                tests typically take 3-5 business days, while specialized tests
                may take longer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Do you offer rush services?
              </h3>
              <p className="text-gray-600">
                Yes, we offer rush services for an additional fee. Please
                contact our customer service team for more information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#206c58] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Contact us today to learn more about our laboratory services and how
            we can help you.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#206c58] hover:bg-gray-100"
          >
            Book an Appointment
          </Button>
        </div>
      </section>
    </div>
  );
}
