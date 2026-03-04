// @ts-nocheck
import type { Booking, Lab, User, Test, TestResult, TestCategory } from "../types";

// Mock data for development and testing

export const mockLabs: Lab[] = [
  {
    id: "lab-001",
    name: "BioXLab Medical Laboratory",
    address: "123 Science Way",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "+1 (555) 111-2233",
    email: "info@bioxlab.com",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "lab-002",
    name: "Central Diagnostics",
    address: "456 Health Blvd",
    city: "Santa Fe",
    state: "NM",
    zip: "87501",
    phone: "+1 (555) 444-5566",
    email: "contact@centraldiagnostics.com",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "lab-003",
    name: "HealthFirst Labs",
    address: "789 Medical Center Dr, Albuquerque, NM, 87102",
    phone: "+1 (555) 777-8899",
    email: "info@healthfirstlabs.com",
    image: "/placeholder.svg?height=80&width=80",
  },
];

// export const mockTests: Test[] = [
//   {
//     id: "test-001",
//     name: "Complete Blood Count (CBC)",
//     description:
//       "A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia.",
//     price: 45.99,
//     category: "hematology",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "Same day",
//     popular: true,
//   },
//   {
//     id: "test-002",
//     name: "Lipid Panel",
//     description:
//       "A lipid panel is a blood test that measures lipids—fats and fatty substances used as a source of energy by your body.",
//     price: 65.5,
//     category: "biochemistry",
//     preparation: "Fasting for 9-12 hours before the test.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//     popular: true,
//   },
//   {
//     id: "test-003",
//     name: "Thyroid Function Test",
//     description:
//       "Thyroid function tests are blood tests that check how well your thyroid is working. They measure the level of thyroid hormones in the blood and the level of thyroid-stimulating hormone.",
//     price: 85.75,
//     category: "endocrinology",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//     popular: true,
//   },
//   {
//     id: "test-004",
//     name: "Liver Function Test",
//     description:
//       "Liver function tests are blood tests that measure different enzymes and proteins in the liver. These tests check the overall health of your liver.",
//     price: 55.25,
//     category: "biochemistry",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//   },
//   {
//     id: "test-005",
//     name: "COVID-19 PCR Test",
//     description:
//       "A COVID-19 PCR test is a test used to diagnose people who are currently infected with SARS-CoV-2, which is the virus that causes COVID-19.",
//     price: 120.0,
//     category: "microbiology",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//   },
//   {
//     id: "test-006",
//     name: "Hemoglobin A1C",
//     description:
//       "The hemoglobin A1C test measures the amount of blood sugar (glucose) attached to hemoglobin. It is used to diagnose diabetes and to monitor blood sugar control in people with diabetes.",
//     price: 75.0,
//     category: "endocrinology",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//   },
//   {
//     id: "test-007",
//     name: "Vitamin D Test",
//     description:
//       "A vitamin D test measures the level of vitamin D in your blood. Vitamin D is important for bone health and other functions in your body.",
//     price: 95.0,
//     category: "biochemistry",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "1-2 days",
//   },
//   {
//     id: "test-008",
//     name: "Urinalysis",
//     description:
//       "Urinalysis is a test of your urine. It is used to detect and manage a wide range of disorders, such as urinary tract infections, kidney disease and diabetes.",
//     price: 35.0,
//     category: "microbiology",
//     preparation: "Clean catch sample required.",
//     duration: "5-10 minutes",
//     report_time: "Same day",
//   },
//   {
//     id: "test-009",
//     name: "Blood Glucose Test",
//     description:
//       "A blood glucose test measures the amount of glucose in your blood. Glucose is a type of sugar and is your body's main source of energy.",
//     price: 40.0,
//     category: "biochemistry",
//     preparation: "Fasting for 8 hours before the test for fasting glucose.",
//     duration: "5-10 minutes",
//     report_time: "Same day",
//     popular: true,
//   },
//   {
//     id: "test-010",
//     name: "Electrolyte Panel",
//     description:
//       "An electrolyte panel is a blood test that measures the levels of electrolytes and carbon dioxide in your blood.",
//     price: 50.0,
//     category: "biochemistry",
//     preparation: "No special preparation is needed.",
//     duration: "5-10 minutes",
//     report_time: "Same day",
//   },
// ];

export const mockCategories: TestCategory[] = [
  {
    id: "cat-001",
    name: "Hematology",
    description: "Tests related to blood and blood disorders",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cat-002",
    name: "Biochemistry",
    description:
      "Tests related to the chemical processes and substances in the body",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cat-003",
    name: "Microbiology",
    description:
      "Tests related to microorganisms like bacteria, viruses, and fungi",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cat-004",
    name: "Endocrinology",
    description: "Tests related to hormones and the endocrine system",
    image: "/placeholder.svg?height=200&width=200",
  },
];

// Helper functions

// export const getTestById = (testId: string): Test | undefined => {
//   return mockTests.find((test) => test.id === testId);
// };

// export const getTestsByCategory = (categoryId: string): Test[] => {
//   const category = mockCategories.find((cat) => cat.id === categoryId);
//   if (!category) return [];

//   const categoryName = category.name.toLowerCase();
//   return mockTests.filter(
//     (test) => test.category.toLowerCase() === categoryName
//   );
// };

// export const getPopularTests = (): Test[] => {
//   return mockTests.filter((test) => test.popular);
// };

// export const getAllCategories = (): TestCategory[] => {
//   return mockCategories.map((category) => {
//     const tests = mockTests.filter(
//       (test) => test.category.toLowerCase() === category.name.toLowerCase()
//     );
//     return {
//       ...category,
//       tests,
//     };
//   });
// };

export const getLabById = (labId: string): Lab | undefined => {
  return mockLabs.find((lab) => lab.id === labId);
};

export const getAllLabs = (): Lab[] => {
  return mockLabs;
};

// Uncomment and modify this function when integrating with Supabase
/*
export const fetchLabsFromSupabase = async (): Promise<Lab[]> => {
  try {
    const { data, error } = await supabase
      .from('lab_branches')
      .select('*')
    
    if (error) {
      console.error('Error fetching labs:', error)
      return []
    }
    
    return data as Lab[]
  } catch (error) {
    console.error('Error fetching labs:', error)
    return []
  }
}
*/

export const mockPatients: User[] = [
  {
    id: "user-001",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    gender: "female",
    date_of_birth: "1985-04-12",
    phone: "+1 (555) 111-2233",
    address: "789 Pine St, Los Alamos, NM 87544",
  },
  {
    id: "user-002",
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    gender: "male",
    date_of_birth: "1978-09-23",
    phone: "+1 (555) 444-5566",
    address: "101 Oak Ave, Santa Fe, NM 87501",
  },
  {
    id: "user-003",
    first_name: "Carla",
    last_name: "Martinez",
    email: "carla.martinez@example.com",
    gender: "female",
    date_of_birth: "1990-12-02",
    phone: "+1 (555) 777-8899",
    address: "202 Maple Dr, Albuquerque, NM 87102",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "booking-001",
    payment_status: "paid",
    user_id: "user-001",
    status: "completed",
    date: "2023-11-15",
    lab: "lab-001",
    total_price: 197.24,
  },
  {
    id: "booking-002",
    payment_status: "pending",
    user_id: "user-001",
    status: "in-progress",
    date: "2023-12-05",
    lab: "lab-002",
    total_price: 120.0,
  },
  {
    id: "booking-003",
    payment_status: "paid",
    user_id: "user-002",
    status: "completed",
    date: "2023-10-20",
    lab: "lab-001",
    total_price: 151.25,
  },
  {
    id: "booking-004",
    payment_status: "failed",
    user_id: "user-003",
    status: "cancelled",
    date: "2023-11-30",
    lab: "lab-002",
    total_price: 85.75,
  },
  {
    id: "booking-005",
    payment_status: "paid",
    user_id: "user-003",
    status: "pending",
    date: "2023-12-10",
    lab: "lab-001",
    total_price: 166.74,
  },
];

// export const mockTestResults: TestResult[] = [
//   {
//     id: "result-001",
//     booking_id: "booking-001",
//     test_id: "test-001",
//     result_value:
//       "Normal range. RBC: 4.8 million/μL, WBC: 7,500/μL, Platelets: 250,000/μL",
//     remarks: "All values within normal range",
//     linkToReport: "/reports/cbc-report-001.pdf",
//     performed_at: "2023-11-16T14:30:00",
//     status: "completed",
//   },
//   {
//     id: "result-002",
//     booking_id: "booking-001",
//     test_id: "test-002",
//     result_value:
//       "Total Cholesterol: 185 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL, Triglycerides: 100 mg/dL",
//     remarks: "Cholesterol levels are within acceptable range",
//     linkToReport: "/reports/lipid-report-001.pdf",
//     performed_at: "2023-11-16T15:00:00",
//     status: "completed",
//   },
//   {
//     id: "result-003",
//     booking_id: "booking-002",
//     test_id: "test-005",
//     result_value: null,
//     remarks: null,
//     linkToReport: null,
//     performed_at: null,
//     status: "pending",
//   },
//   {
//     id: "result-004",
//     booking_id: "booking-003",
//     test_id: "test-003",
//     result_value: "TSH: 2.5 mIU/L, T3: 120 ng/dL, T4: 8.5 μg/dL",
//     remarks: "Thyroid function normal",
//     linkToReport: "/reports/thyroid-report-001.pdf",
//     performed_at: "2023-10-21T10:15:00",
//     status: "completed",
//   },
//   {
//     id: "result-005",
//     booking_id: "booking-003",
//     test_id: "test-004",
//     result_value: "ALT: 25 U/L, AST: 28 U/L, ALP: 70 U/L, Bilirubin: 0.8 mg/dL",
//     remarks: "Liver function normal",
//     linkToReport: "/reports/liver-report-001.pdf",
//     performed_at: "2023-10-21T10:45:00",
//     status: "completed",
//   },
//   {
//     id: "result-006",
//     booking_id: "booking-005",
//     test_id: "test-001",
//     result_value: null,
//     remarks: null,
//     linkToReport: null,
//     performed_at: null,
//     status: "in-progress",
//   },
//   {
//     id: "result-007",
//     booking_id: "booking-005",
//     test_id: "test-004",
//     result_value: null,
//     remarks: null,
//     linkToReport: null,
//     performed_at: null,
//     status: "pending",
//   },
// ];

// Helper function to get a patient's bookings
export const getPatientBookings = (patientId: string): Booking[] => {
  return mockBookings.filter((booking) => booking.user_id === patientId);
};

// Helper function to get booking details with lab info
// export const getBookingWithDetails = (
//   bookingId: string
// ): Booking | undefined => {
//   const booking = mockBookings.find((b) => b.id === bookingId);
//   if (!booking) return undefined;

//   const lab = mockLabs.find((l) => l.id === booking.lab);
//   return {
//     ...booking,
//     lab_details: lab,
//   };
// };

// // Helper function to get test results for a booking
// export const getTestResultsForBooking = (bookingId: string): TestResult[] => {
//   return mockTestResults
//     .filter((result) => result.booking_id === bookingId)
//     .map((result) => {
//       const test = mockTests.find((t) => t.id === result.test_id);
//       return {
//         ...result,
//         test,
//       };
//     });
// };

// Helper function to get a patient by ID
export const getPatientById = (patientId: string): User | undefined => {
  return mockPatients.find((patient) => patient.id === patientId);
};

// Helper function to get all tests for a booking
// export const getTestsForBooking = (bookingId: string): Test[] => {
//   const results = getTestResultsForBooking(bookingId);
//   return results.map((result) => result.test!).filter(Boolean);
// };
