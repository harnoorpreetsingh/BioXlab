// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";

// interface Patient {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name?: string;
//   gender: string;
//   date_of_birth: string;
//   phone: string;
//   address: string;
// }

// interface ViewPatientDetailsProps {
//   patient: Patient | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function ViewPatientDetails({
//   patient,
//   open,
//   onOpenChange,
// }: ViewPatientDetailsProps) {
//   if (!patient) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Patient Details</DialogTitle>
//         </DialogHeader>

//         <Card>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4 pb-4 border-b">
//                 <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
//                   <User className="h-6 w-6 text-teal-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-medium">
//                     {patient.first_name} {patient.last_name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground capitalize">
//                     {patient.gender}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <Calendar className="h-5 w-5 text-teal-600" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">
//                       Date of Birth
//                     </p>
//                     <p>{patient.date_of_birth}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Mail className="h-5 w-5 text-teal-600" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Email</p>
//                     <p>{patient.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <Phone className="h-5 w-5 text-teal-600" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Phone</p>
//                     <p>{patient.phone}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <MapPin className="h-5 w-5 text-teal-600" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Address</p>
//                     <p>{patient.address}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <DialogFooter>
//           <Button onClick={() => onOpenChange(false)}>Close</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
