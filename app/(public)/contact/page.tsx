import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-emerald-500/30 pt-24 pb-20">

      {/* Background Ambience - Matches Home Screen */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-morph mix-blend-screen" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Info */}
            <ContactInfo />

            {/* Right Column: Form */}
            <div className="lg:mt-12">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
