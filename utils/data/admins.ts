import { toast } from "react-toastify";

export interface AdminFormValues {
  email: string;
  first_name: string;
  last_name?: string;
  gender: "male" | "female" | "other";
  dob: string;
  mobile: string;
  address: string;
  password?: string;
}

export async function fetchAdmins() {
  try {
    const response = await fetch("/api/users?role=admin");
    
    if (!response.ok) {
      throw new Error("Failed to fetch admins");
    }

    const data = await response.json();
    // Transform to match expected format
    return data.map((user: any) => ({
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      gender: user.gender.toLowerCase(),
      dob: new Date(user.dateOfBirth).toISOString().split('T')[0],
      mobile: user.phone,
      address: user.address,
    }));
  } catch (err) {
    console.error("Error fetching admins:", err);
    toast.error("Failed to fetch admins. Please try again.");
    return [];
  }
}

export async function createAdmin(adminData: AdminFormValues) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: adminData.email,
        password: adminData.password || "admin123", // Default password
        firstName: adminData.first_name,
        lastName: adminData.last_name,
        dateOfBirth: adminData.dob,
        gender: adminData.gender,
        address: adminData.address,
        phone: adminData.mobile,
        role: "admin",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create admin");
    }

    const data = await response.json();
    toast.success("Admin created successfully!");
    return data;
  } catch (err: any) {
    console.error("Error creating admin:", err);
    toast.error(err.message || "Failed to create admin. Please try again.");
    throw err;
  }
}

export async function updateAdmin(id: string, adminData: AdminFormValues) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        firstName: adminData.first_name,
        lastName: adminData.last_name,
        dateOfBirth: adminData.dob,
        gender: adminData.gender,
        address: adminData.address,
        phone: adminData.mobile,
        ...(adminData.password && { password: adminData.password }),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin");
    }

    const data = await response.json();
    toast.success("Admin updated successfully!");
    return data;
  } catch (err) {
    console.error("Error updating admin:", err);
    toast.error("Failed to update admin. Please try again.");
    throw err;
  }
}

export async function deleteAdmin(id: string) {
  try {
    const response = await fetch(`/api/users?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete admin");
    }

    toast.success("Admin deleted successfully!");
  } catch (err) {
    console.error("Error deleting admin:", err);
    toast.error("Failed to delete admin. Please try again.");
    throw err;
  }
}
