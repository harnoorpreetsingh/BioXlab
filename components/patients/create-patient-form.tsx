// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Plus } from "lucide-react"

// const patientFormSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   first_name: z.string().min(2, { message: "First name must be at least 2 characters" }),
//   last_name: z.string().optional(),
//   gender: z.enum(["male", "female", "other"], {
//     required_error: "Please select a gender",
//   }),
//   phone: z.string().min(10, { message: "Please enter a valid phone number" }),
//   age: z.string().min(1, { message: "Age is required" }),
// })

// type PatientFormValues = z.infer<typeof patientFormSchema>

// interface CreatePatientFormProps {
//   onSuccess?: () => void
// }

// export function CreatePatientForm({ onSuccess }: CreatePatientFormProps) {
//   const [open, setOpen] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<PatientFormValues>({
//     resolver: zodResolver(patientFormSchema),
//     defaultValues: {
//       email: "",
//       first_name: "",
//       last_name: "",
//       gender: "male",
//       phone: "",
//       age: "",
//     },
//   })

//   async function onSubmit(data: PatientFormValues) {
//     setIsSubmitting(true)
//     try {
//       console.log("Creating patient:", data)
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       form.reset()
//       setOpen(false)
//       onSuccess?.()
//     } catch (error) {
//       console.error("Error creating patient:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-teal-600 hover:bg-teal-700">
//           <Plus className="mr-2 h-4 w-4" /> Add Patient
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Add New Patient</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="first_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="John" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="last_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="patient@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone</FormLabel>
//                   <FormControl>
//                     <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="age"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Age</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter age" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="gender"
//               render={({ field }) => (
//                 <FormItem className="space-y-3">
//                   <FormLabel>Gender</FormLabel>
//                   <FormControl>
//                     <RadioGroup value={field.value} onValueChange={field.onChange} className="flex space-x-4">
//                       <FormItem className="flex items-center space-x-2 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="male" />
//                         </FormControl>
//                         <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-2 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="female" />
//                         </FormControl>
//                         <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
//                       </FormItem>
//                       <FormItem className="flex items-center space-x-2 space-y-0">
//                         <FormControl>
//                           <RadioGroupItem value="other" />
//                         </FormControl>
//                         <FormLabel className="font-normal cursor-pointer">Other</FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <DialogFooter className="mt-6">
//               <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
//                 {isSubmitting ? "Saving..." : "Save Patient"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }
