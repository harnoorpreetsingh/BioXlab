import { toast } from "react-toastify";

export async function fetchUsers() {
  try {
    const response = await fetch("/api/users");
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching users:", err);
    toast.error("Failed to fetch users. Please try again.");
    return [];
  }
}

export async function fetchUserById(id: string) {
  try {
    const response = await fetch(`/api/users?id=${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching user:", err);
    toast.error("Failed to fetch user. Please try again.");
    return null;
  }
}

export async function fetchAllBookings(userId: string) {
  try {
    const response = await fetch(`/api/bookings?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    toast.error("Failed to fetch bookings. Please try again.");
    return [];
  }
}

export async function updateUser(id: string, userData: any) {
  try {
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...userData }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    toast.success("User updated successfully!");
    return data;
  } catch (err) {
    console.error("Error updating user:", err);
    toast.error("Failed to update user. Please try again.");
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await fetch(`/api/users?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    toast.success("User deleted successfully!");
  } catch (err) {
    console.error("Error deleting user:", err);
    toast.error("Failed to delete user. Please try again.");
  }
}

export async function deleteUserFromAuth(id: string) {
  // This is no longer needed with NextAuth - just delete from database
  await deleteUser(id);
}

export async function updateCurrentUserProfile(id: string, userData: any) {
  return await updateUser(id, userData);
}
