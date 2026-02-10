import { toast } from "react-toastify";

// Fetch the most recent booking for a user (by created_at desc)
export async function fetchLatestBookingIdForUser(user_id: string) {
  try {
    const response = await fetch(`/api/bookings?userId=${user_id}&latest=true`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch latest booking");
    }

    const data = await response.json();
    return data ? data.id : null;
  } catch (err) {
    console.error("Error fetching latest booking:", err);
    toast.error("Failed to fetch latest booking. Please try again.");
    return null;
  }
}

export async function createBooking(addBookingsPayload: any) {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addBookingsPayload),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error inserting data into bookings:", err);
    toast.error("Failed to create booking. Please try again.");
  }
}

export async function insertTestsBooking(addBookingsPayload: any) {
  try {
    const response = await fetch("/api/tests-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addBookingsPayload),
    });

    if (!response.ok) {
      throw new Error("Failed to create test booking");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error inserting data into bookings:", err);
    toast.error("Failed to create booking. Please try again.");
  }
}

export async function fetchUserBookings(bookingId: string) {
  try {
    const response = await fetch(`/api/bookings?id=${bookingId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch booking");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching bookings:", err);
    toast.error("Failed to fetch bookings. Please try again.");
  }
}

export async function fetchBookingTests(bookingId: string) {
  try {
    const response = await fetch(`/api/tests-bookings?bookingId=${bookingId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch booking tests");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching booking tests:", err);
    toast.error("Failed to fetch booking tests. Please try again.");
  }
}

export async function updateResult(testId: string, data: any) {
  try {
    const response = await fetch("/api/tests-bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: testId, ...data }),
    });

    if (!response.ok) {
      throw new Error("Failed to update test result");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (err) {
    console.error("Error updating test result:", err);
    toast.error("Failed to update test result. Please try again.");
  }
}

export async function updateDocLink(testId: string, data: any) {
  try {
    const response = await fetch("/api/tests-bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: testId, ...data }),
    });

    if (!response.ok) {
      throw new Error("Failed to update document link");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (err) {
    console.error("Error updating document link:", err);
    toast.error("Failed to update document link. Please try again.");
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const response = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    toast.error("Failed to update booking status. Please try again.");
  }
}
