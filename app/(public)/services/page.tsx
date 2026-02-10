import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Beaker,
  Brain,
  FlaskRoundIcon as Flask,
  Microscope,
  TestTube,
  Dna,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#206c58] text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Comprehensive laboratory services tailored to meet your scientific
            and research needs
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Laboratory Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              LosAlamos Laboratory offers a wide range of specialized laboratory
              services to support research, healthcare, and industry needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Scientific Services */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <Microscope className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Scientific Services</h3>
              <p className="text-gray-600 mb-6">
                Our scientific laboratory services provide comprehensive testing
                and analysis using state-of-the-art equipment and methodologies.
                We offer a wide range of scientific testing services to support
                research, development, and quality control.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Material analysis and characterization
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Environmental testing and monitoring
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Research and development support
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Chemistry Services */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <Flask className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chemistry Services</h3>
              <p className="text-gray-600 mb-6">
                Our chemistry laboratory provides advanced analytical services
                for a wide range of applications. We utilize cutting-edge
                techniques and equipment to deliver accurate and reliable
                results for chemical analysis and testing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Analytical chemistry and testing
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Organic and inorganic compound analysis
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Quality control and assurance testing
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Geological Services */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <Beaker className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Geological Services</h3>
              <p className="text-gray-600 mb-6">
                Our geological laboratory services provide comprehensive
                analysis and testing for geological samples and materials. We
                offer a wide range of geological testing services to support
                exploration, mining, and environmental studies.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Mineral and rock analysis
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Soil and sediment testing
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Geochemical analysis and mapping
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Forensic Science */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <TestTube className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Forensic Science</h3>
              <p className="text-gray-600 mb-6">
                Our forensic science laboratory provides comprehensive analysis
                and testing for forensic investigations. We utilize advanced
                techniques and equipment to deliver accurate and reliable
                results for forensic analysis and testing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  DNA analysis and profiling
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Trace evidence analysis
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Toxicology and drug testing
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Immunology */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <Dna className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Immunology</h3>
              <p className="text-gray-600 mb-6">
                Our immunology laboratory provides comprehensive analysis and
                testing for immunological research and clinical applications. We
                offer a wide range of immunological testing services to support
                research, diagnostics, and therapeutic development.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Antibody testing and characterization
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Immunoassay development and validation
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Cellular immunology and flow cytometry
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Neuroscience */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#206c58]">
              <div className="w-16 h-16 bg-[#206c58]/10 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-[#206c58]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Neuroscience</h3>
              <p className="text-gray-600 mb-6">
                Our neuroscience laboratory provides advanced analytical
                services for neuroscience research and clinical applications. We
                utilize cutting-edge techniques and equipment to support
                neuroscience research and development.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Neurochemical analysis
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Neurophysiology testing
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2"></div>
                  Neuropharmacology research support
                </li>
              </ul>
              <Link
                href="#"
                className="text-[#206c58] font-medium flex items-center hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Laboratory Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a rigorous process to ensure accurate and reliable
              results for all our laboratory services.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#206c58] text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 mt-2">Sample Collection</h3>
              <p className="text-gray-600">
                Proper collection and handling of samples according to
                established protocols to ensure integrity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#206c58] text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 mt-2">
                Sample Preparation
              </h3>
              <p className="text-gray-600">
                Careful preparation of samples for analysis using standardized
                procedures and techniques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#206c58] text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 mt-2">
                Analysis & Testing
              </h3>
              <p className="text-gray-600">
                Thorough analysis and testing using advanced equipment and
                validated methodologies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#206c58] text-white flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 mt-2">
                Results & Reporting
              </h3>
              <p className="text-gray-600">
                Comprehensive reporting of results with detailed analysis and
                interpretation as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#206c58] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Laboratory Services?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Contact us today to discuss your laboratory service needs and how we
            can help you.
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
              <Link href="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
