import type { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Mail, MapPin, Phone, UserCheck } from "lucide-react";

type PatientInfoCardProps = {
  patient: User;
};

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 pb-6">
        <CardTitle className="text-xl text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </div>
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">Full Name</h3>
              <p className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">Email</h3>
              <p className="text-base flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-emerald-500/70" />
                {patient.email}
              </p>
            </div>
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">Phone</h3>
              <p className="text-base flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-emerald-500/70" />
                {patient.phone}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">Gender</h3>
              <p className="text-base capitalize text-white/90">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {patient.gender}
                </span>
              </p>
            </div>
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">
                Date of Birth
              </h3>
              <p className="text-base flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                <CalendarDays className="h-4 w-4 text-emerald-500/70" />
                {new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="group">
              <h3 className="text-xs uppercase tracking-wider font-medium text-white/50 mb-1">Address</h3>
              <p className="text-base flex items-start gap-2 text-white/90 group-hover:text-white transition-colors">
                <MapPin className="h-4 w-4 text-emerald-500/70 mt-1 flex-shrink-0" />
                <span>{patient.address}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
