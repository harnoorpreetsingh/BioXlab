import type { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Mail, MapPin, Phone, UserCheck } from "lucide-react";

type PatientInfoCardProps = {
  patient: User;
};

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-teal-600/10 to-teal-600/5 border-b pb-6">
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-teal-600" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1 text-base font-medium">
                {patient.firstName} {patient.lastName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-base flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                {patient.email}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="mt-1 text-base flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                {patient.phone}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gender</h3>
              <p className="mt-1 text-base capitalize">{patient.gender}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Date of Birth
              </h3>
              <p className="mt-1 text-base flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                {new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1 text-base flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <span>{patient.address}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
