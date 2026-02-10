import { LabBranchFormValues } from "@/components/lab-branches/create-lab-branch-form";
import { toast } from "react-toastify";

export async function insertLabBranch(data: LabBranchFormValues) {
  try {
    const response = await fetch("/api/lab-branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create lab branch");
    }

    const insertedData = await response.json();
    toast.success("Lab branch created successfully!");
    return insertedData;
  } catch (err) {
    console.error("Error inserting data into lab-branches:", err);
    toast.error("Failed to create lab branch. Please try again.");
  }
}

export const fetchLabBranches = async () => {
  try {
    const response = await fetch("/api/lab-branches");
    
    if (!response.ok) {
      throw new Error("Failed to fetch lab branches");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return [];
  }
};

export const updateLabBranch = async (
  id: string,
  data: LabBranchFormValues
) => {
  try {
    const response = await fetch("/api/lab-branches", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      throw new Error("Failed to update lab branch");
    }

    const updatedData = await response.json();
    toast.success("Lab branch updated successfully!");
    return updatedData;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};

export const deleteLabBranch = async (id: string) => {
  try {
    const response = await fetch(`/api/lab-branches?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete lab branch");
    }

    const data = await response.json();
    toast.success("Lab branch deleted successfully!");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};
