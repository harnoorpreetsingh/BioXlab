// Define all the types we'll use across the application

export type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
};

export interface IExtendedUser extends User {
  role?: string;
  authId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Lab = {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  phone: string;
  email: string;
  opening_hours?: string;
  manager_name?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
};

export type Booking = {
  id: string;
  payment_status: "paid" | "pending" | "failed" | null;
  user_id: string;
  status: "completed" | "pending" | "cancelled" | "in-progress" | null;
  date: string;
  lab: string;
  lab_branches?: Lab;
  totalPrice: number | null;
  tests?: Test[];
};

export type Test = {
  id: string;
  name: string;
  description?: string;
  cost?: string | number;
  price?: string | number;
  category?: string;
  categoryId?: string;
  preparation?: string;
  duration?: string;
  report_time?: string;
  ideal_range?: string;
  image?: string;
  popular?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TestResult = {
  id: string;
  booking_id: string;
  test_id: Test;
  test?: string;
  result_value: string | null;
  remarks: string | null;
  doc_link: string | null;
  performed_at: string | null;
  status: "pending" | "completed" | "in-progress";
};

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  date_of_birth: Date;
  phone: string;
  address: string;
}

export type TestCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  tests?: Test[];
};

export type CartItem = {
  test: Test;
  quantity: number;
};

export type BookingFormData = {
  date: Date;
  lab: string;
  collection_location: "lab" | "home";
  patient_details?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
  };
};
