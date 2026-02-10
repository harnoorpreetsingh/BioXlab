import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckCircle,
  Clock,
  FlaskRoundIcon as Flask,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#206c58] text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About LosAlamos Laboratory
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Providing comprehensive laboratory management services with
            precision and excellence
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                What About Us
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#206c58]">
                Offering a Wide Range of Diagnostics Services.
              </h3>
              <div className="w-16 h-1 bg-[#206c58]"></div>
              <p className="text-gray-700">
                Paramedical healthcare field attracts to save lives & helping
                people, being a doctor is not your only choice. We show else you
                can help patients without being a doctor, here we serving
                awesome opportunity.
              </p>
              <p className="text-gray-700">
                Equipped & trained to work in the hospitals, the diagnostic labs
                & healthcares. NABL is an autonomous society providing
                recognition of the Technical.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Flask className="h-10 w-10 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#206c58]">
                      Medical Laboratory Technician
                    </h4>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4">
                    <Award className="h-10 w-10 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#206c58]">
                      NABL Certificate Management
                    </h4>
                  </div>
                </div>
              </div>

              <Button className="bg-[#206c58] hover:bg-[#185446] mt-4">
                More About Us
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/8851778/pexels-photo-8851778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Laboratory Technician"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are committed to providing the highest quality laboratory
              services with integrity and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-[#206c58]">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-4">
                To provide accurate, reliable, and timely laboratory services
                that contribute to the advancement of science, healthcare, and
                public safety. We strive to maintain the highest standards of
                quality and integrity in all our operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Deliver accurate and reliable test results
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Maintain the highest standards of quality
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Provide exceptional customer service
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-[#206c58]">
                Our Vision
              </h3>
              <p className="text-gray-700 mb-4">
                To be the leading laboratory service provider known for
                excellence, innovation, and integrity. We aim to continuously
                improve our services and expand our capabilities to meet the
                evolving needs of our clients and the communities we serve.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Lead the industry in laboratory excellence
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Innovate and adopt cutting-edge technologies
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#206c58] mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Expand our services to meet evolving needs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide our work and define our culture at
              LosAlamos Laboratory.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#206c58] transition-colors">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all aspects of our work, from
                testing procedures to customer service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#206c58] transition-colors">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest ethical standards and are committed to
                honesty and transparency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#206c58] transition-colors">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-4">
                <Flask className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and methodologies to improve our
                services and capabilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#206c58] transition-colors">
              <div className="w-12 h-12 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#206c58]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We deliver consistent, dependable results and services that our
                clients can trust.
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#206c58] hover:bg-gray-100"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
