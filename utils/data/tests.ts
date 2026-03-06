import { toast } from "react-toastify";
import { TestFormValues } from "@/components/tests/create-test-form";

// This function inserts a new test
export const insertTest = async (data: TestFormValues) => {
  try {
    const response = await fetch("/api/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create test");
    }

    toast.success("Test created successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to fetch all tests
export const fetchTests = async () => {
  try {
    const response = await fetch("/api/tests");

    if (!response.ok) {
      throw new Error("Failed to fetch tests");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return [];
  }
};

//Function to delete a test
export const deleteTest = async (id: string) => {
  try {
    const response = await fetch(`/api/tests?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete test");
    }

    toast.success("Test deleted successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to update a test
export const updateTest = async (id: string, data: TestFormValues) => {
  try {
    const response = await fetch("/api/tests", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      throw new Error("Failed to update test");
    }

    toast.success("Test updated successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to insert a new test category
export const insertTestCategory = async (name: string, description: string) => {
  try {
    const response = await fetch("/api/test-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to create test category");
    }

    toast.success("Test category created successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to fetch all test categories
export const fetchTestCategories = async () => {
  try {
    const response = await fetch("/api/test-categories");

    if (!response.ok) {
      throw new Error("Failed to fetch test categories");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return [];
  }
};

// Function to edit a test category
export const updateTestCategory = async (
  id: string,
  name: string,
  description?: string
) => {
  try {
    const response = await fetch("/api/test-categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to update test category");
    }

    toast.success("Test category updated successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};

// Function to delete a test category
export const deleteTestCategory = async (id: string) => {
  try {
    const response = await fetch(`/api/test-categories?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete test category");
    }

    toast.success("Test category deleted successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred : ${err}`);
  }
};


// Function to fetch popular tests
export const fetchPopularTests = async () => {
  try {
    const response = await fetch("/api/tests?popular=true");

    if (!response.ok) {
      throw new Error("Failed to fetch popular tests");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return [];
  }
};

// Function to fetch test by ID
export const fetchTestById = async (id: string) => {
  try {
    const response = await fetch(`/api/tests?id=${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch test");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    toast.error(`An error occurred: ${err}`);
    return null;
  }
};
