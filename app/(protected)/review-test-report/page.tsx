"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TestDetailsView() {
  const [patientData] = useState({
    id: "14",
    name: "Keefe Reid",
    age: "99",
    sex: "Male",
    doctorName: "DR.WINTER MCDOWELL",
    history: "Ratione cillum ad no",
    testNumber: "00000000014",
  });

  const [testDetails] = useState({
    name: "Tara Juarez",
    nature: "Physical examination",
    idealRange: "Sequi irure non sed",
    category: "Hope Griffin",
  });

  const [testResults] = useState({
    value: "83",
    remarks: "Velit sit et ut dol",
    date: "2020-09-16",
    time: "17:57:00",
  });

  return (
    <Card className="border-2 border-gray-300">
      <CardContent className="p-0">
        {/* Test Number Header */}
        <div className="w-full text-right p-4 border-b border-gray-200">
          <span className="text-gray-800 font-medium">
            {patientData.testNumber}
          </span>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border-b border-gray-200">
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">Patient&apos;s Id</h3>
            <p>{patientData.id}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">Patient Name</h3>
            <p>{patientData.name}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">Age</h3>
            <p>{patientData.age}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">Sex</h3>
            <p>{patientData.sex}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">Doctor Name</h3>
            <p>{patientData.doctorName}</p>
          </div>
          <div className="col-span-1">
            <h3 className="font-medium text-gray-800">History</h3>
            <p>{patientData.history}</p>
          </div>
        </div>

        {/* View Test Details Header */}
        <div className="w-full text-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-teal-600">
            View Test Details
          </h2>
        </div>

        {/* Test Details Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="about-test"
          className="w-full"
        >
          {/* About Test Section */}
          <AccordionItem value="about-test" className="border-b-0">
            <AccordionTrigger className="py-4 px-6 bg-white hover:bg-gray-50 border-y border-gray-200 text-teal-600 font-semibold">
              About Test
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">
                    Test Name =&gt;
                  </div>
                  <div>{testDetails.name}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">
                    Test&apos;s Nature =&gt;
                  </div>
                  <div>{testDetails.nature}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">
                    Test Ideal Range =&gt;
                  </div>
                  <div>{testDetails.idealRange}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6">
                  <div className="font-medium text-right pr-4">
                    Test&apos;s Category =&gt;
                  </div>
                  <div>{testDetails.category}</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Test Results Section */}
          <AccordionItem value="test-results" className="border-b-0">
            <AccordionTrigger className="py-4 px-6 bg-white hover:bg-gray-50 border-y border-gray-200 text-teal-600 font-semibold">
              Test&apos;s Results
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">
                    Result Value =&gt;
                  </div>
                  <div>{testResults.value}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">
                    Remarks =&gt;
                  </div>
                  <div>{testResults.remarks}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6 border-b border-gray-200">
                  <div className="font-medium text-right pr-4">Date =&gt;</div>
                  <div>{testResults.date}</div>
                </div>
                <div className="grid grid-cols-2 items-center py-3 px-6">
                  <div className="font-medium text-right pr-4">
                    Time of Test =&gt;
                  </div>
                  <div>{testResults.time}</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 p-6">
          <Button
            variant="outline"
            className="bg-cyan-200 hover:bg-cyan-300 text-gray-800 border-none"
          >
            Back
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
