"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Download,
  FileText,
  Upload,
  Eye,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { saveAs } from "file-saver";

import type { Test, TestResult } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { updateDocLink, updateResult } from "@/utils/data/bookings";
import { uploadFile } from "@/utils/data/file-upload";

type TestResultCardProps = {
  test: Test;
  result?: TestResult;
  isAdmin?: boolean;
  onResultUpdate: () => void;
};

const resultFormSchema = z.object({
  result_value: z.string().min(1, "Result value is required"),
  remarks: z.string().optional(),
});

const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: "Please select a file" }),
});

export function TestResultCard({
  test,
  result,
  isAdmin = false,
  onResultUpdate,
}: TestResultCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [docPreviewOpen, setDocPreviewOpen] = useState(false);
  const [docUrl, setDocUrl] = useState("");

  useEffect(() => {
    if (result?.doc_link) {
      // TODO: Implement file storage and retrieval
      setDocUrl(result.doc_link);
    }
  }, [result]);

  const resultForm = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      result_value: result?.result_value || "",
      remarks: result?.remarks || "",
    },
  });

  const fileForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
  });

  const handleResultSubmit = async (data: z.infer<typeof resultFormSchema>) => {
    if (!isAdmin) return;

    setIsSubmitting(true);

    await updateResult(test.id, {
      ...data,
      status: "completed",
      performed_at: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsEditing(false);
    onResultUpdate();
    toast.success("Test result has been updated successfully.");
  };

  const handleFileSubmit = async (data: z.infer<typeof fileUploadSchema>) => {
    if (!isAdmin) return;

    setIsSubmitting(true);

    try {
      // TODO: Implement actual file upload
      const fileUrl = await uploadFile(data.file);

      if (!fileUrl) {
        throw new Error("File upload not yet implemented");
      }

      await updateDocLink(test.id, {
        doc_link: fileUrl,
        status: "completed",
        performed_at: new Date().toISOString(),
      });

      onResultUpdate();
      setIsEditing(false);
      toast.success("Test report has been uploaded successfully.");
      setSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      fileForm.setValue("file", file);
    }
  };

  const handleDownload = async () => {
    if (!result?.doc_link) return;

    try {
      // TODO: Implement file download from storage
      // For now, just open the URL if it's a full URL
      if (result.doc_link.startsWith('http')) {
        window.open(result.doc_link, '_blank');
        toast.success("Opening report in new tab.");
      } else {
        toast.error("File download not yet implemented.");
      }
    } catch (error) {
      toast.error("Failed to download file.");
    }
  };

  const hasResults = result?.result_value || result?.doc_link;

  return (
    <>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-teal-600/5 to-transparent border-b pb-4 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="text-base text-gray-800">
              {test?.name}
            </CardTitle>

            {isAdmin && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing((prev) => !prev)}
                className="absolute top-4 right-4 sm:static text-teal-600 border-teal-600 hover:bg-teal-50"
              >
                {hasResults ? (
                  <>
                    {!isEditing ? (
                      <>
                        <Pencil className="h-4 w-4 mr-2" /> Edit Result
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Add Result
                  </>
                )}
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{test?.description}</p>
        </CardHeader>

        <CardContent className="pt-4">
          {isAdmin && isEditing ? (
            <Tabs defaultValue="form">
              <TabsList className="mb-4">
                <TabsTrigger value="form">Enter Results</TabsTrigger>
                <TabsTrigger value="upload">Upload Report</TabsTrigger>
              </TabsList>

              <TabsContent value="form">
                <Form {...resultForm}>
                  <form
                    onSubmit={resultForm.handleSubmit(handleResultSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={resultForm.control}
                      name="result_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Result Value</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter test result value"
                              className="resize-none min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={resultForm.control}
                      name="remarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Remarks</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter any remarks or notes"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Results"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="upload">
                <Form {...fileForm}>
                  <form
                    onSubmit={fileForm.handleSubmit(handleFileSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={fileForm.control}
                      name="file"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            {result?.doc_link
                              ? "Replace File"
                              : "Upload Report"}
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileChange}
                              />
                              {selectedFile ? (
                                <div className="flex flex-col items-center gap-2">
                                  <FileText className="h-8 w-8 text-teal-600" />
                                  <p className="text-sm font-medium">
                                    {selectedFile.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(
                                      2
                                    )}{" "}
                                    MB
                                  </p>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedFile(null)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  {result?.doc_link && (
                                    <div className="mb-2 text-sm text-center">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDocPreviewOpen(true)}
                                        className="mb-2"
                                      >
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Uploaded File
                                      </Button>
                                    </div>
                                  )}
                                  <div className="flex flex-col items-center gap-2">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Drag and drop or click to upload
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Supports PDF, DOC, JPG, PNG (max 10MB)
                                    </p>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        document
                                          .getElementById("file-upload")
                                          ?.click()
                                      }
                                    >
                                      Select File
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={isSubmitting || !selectedFile}
                    >
                      {isSubmitting ? "Uploading..." : "Upload Report"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          ) : hasResults ? (
            <div className="space-y-4">
              {result?.result_value && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Result</h3>
                  <p className="mt-1 text-sm whitespace-pre-line">
                    {result.result_value}
                  </p>
                </div>
              )}

              {result?.remarks && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Remarks</h3>
                  <p className="mt-1 text-sm text-gray-700">{result.remarks}</p>
                </div>
              )}

              {result?.performed_at && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Performed At
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">
                    {new Date(result.performed_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>Results pending</p>
            </div>
          )}
        </CardContent>

        {result?.doc_link && !isEditing && (
          <CardFooter className="border-t pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-teal-600 border-teal-600 hover:bg-teal-50"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setDocPreviewOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Report
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Modal for document preview */}
      <Dialog open={docPreviewOpen} onOpenChange={setDocPreviewOpen}>
        <DialogContent className="max-w-3xl flex flex-col !p-[0px] max-sm:!max-w-[90%] rounded-lg">
          <DialogHeader className="flex justify-between items-center mt-2">
            {/* <span >Document Preview</span> */}
            <DialogTitle className="text-base font-semibold">
              Document Preview
            </DialogTitle>
          </DialogHeader>
          {result?.doc_link && (
            <iframe
              src={docUrl}
              className="w-full border rounded-lg h-[80vh]"
              // title="Document Preview"
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
