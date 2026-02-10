import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Laboratory Director",
      bio: "Dr. Johnson has over 15 years of experience in laboratory management and scientific research. She holds a Ph.D. in Biochemistry and has published numerous research papers in prestigious scientific journals.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Scientific Officer",
      bio: "Dr. Chen is an expert in analytical chemistry with a focus on developing innovative testing methodologies. He has a Ph.D. in Chemistry and has led numerous research projects in both academic and industrial settings.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Forensic Science",
      bio: "Dr. Rodriguez specializes in forensic science and has worked on numerous high-profile cases. She holds a Ph.D. in Forensic Science and is certified by the American Board of Criminalistics.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. James Wilson",
      role: "Head of Geological Services",
      bio: "Dr. Wilson is an expert in geological analysis with over 10 years of experience in the field. He holds a Ph.D. in Geology and has conducted extensive research on mineral composition and geological formations.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Lisa Patel",
      role: "Head of Immunology",
      bio: "Dr. Patel specializes in immunology and has made significant contributions to the field through her research. She holds a Ph.D. in Immunology and has published numerous papers on immune system responses.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Dr. Robert Kim",
      role: "Head of Neuroscience",
      bio: "Dr. Kim is a leading expert in neuroscience with a focus on neurochemical analysis. He holds a Ph.D. in Neuroscience and has conducted groundbreaking research on brain function and neurological disorders.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Jennifer Martinez",
      role: "Laboratory Manager",
      bio: "Jennifer has extensive experience in laboratory operations and management. She ensures that all laboratory processes run smoothly and efficiently, maintaining the highest standards of quality and safety.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "David Thompson",
      role: "Quality Assurance Manager",
      bio: "David is responsible for maintaining the quality of all laboratory services. He implements and oversees quality control procedures to ensure accurate and reliable results for all tests and analyses.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#206c58] text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Meet the experts behind LosAlamos Laboratory's excellence in
            laboratory services
          </p>
        </div>
      </section>

      {/* Team Overview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our team of highly qualified scientists, researchers, and
              technicians brings together decades of experience and expertise in
              various scientific disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-[#206c58] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-[#206c58]"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-[#206c58]"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-500 hover:text-[#206c58]"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Laboratory Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Join Our Team</h2>
              <p className="text-gray-600">
                We are always looking for talented and passionate individuals to
                join our team. If you are interested in working with us, please
                check our current openings or send us your resume.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2 mt-2"></div>
                  <div>
                    <h3 className="font-bold">Collaborative Environment</h3>
                    <p className="text-gray-600">
                      Work with a team of experts in a collaborative and
                      supportive environment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2 mt-2"></div>
                  <div>
                    <h3 className="font-bold">Professional Development</h3>
                    <p className="text-gray-600">
                      Opportunities for continuous learning and professional
                      growth.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#206c58] rounded-full mr-2 mt-2"></div>
                  <div>
                    <h3 className="font-bold">Cutting-Edge Research</h3>
                    <p className="text-gray-600">
                      Work on innovative projects using state-of-the-art
                      equipment and technologies.
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="bg-[#206c58] hover:bg-[#185446]">
                View Current Openings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#206c58] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions for Our Team?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Contact us today to speak with our experts about your laboratory
            service needs.
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
              className="border-white text-white bg-transparent hover:bg-white/10"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
