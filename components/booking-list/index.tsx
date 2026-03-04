"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Calendar, IndianRupee, Eye } from "lucide-react";

import type { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../status-badge";
import { useCurrentUser } from "@/providers/AuthProvider";

type BookingListProps = {
  bookings: Booking[] | null;
  patientId?: string;
};

export function BookingList({
  bookings,
  patientId,
}: BookingListProps) {

  const { appUser } = useCurrentUser();
  const isAdmin = appUser?.role === "admin";

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      ".booking-row",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
    );

    return () => {
      timeline.kill();
    };
  }, [bookings]);


  const baseUrl = isAdmin
    ? `/dashboard?tab=adminViewBooking&patientId=${patientId}&bookingId`
    : `/dashboard?tab=viewBooking&bookingId`;

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 pb-6">
        <CardTitle className="text-xl text-white flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Calendar className="h-5 w-5 text-emerald-500" />
          </div>
          Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-b border-white/10">
                <TableHead className="!min-w-[150px] text-white/90 uppercase tracking-wider text-xs pl-6">Booking ID</TableHead>
                <TableHead className="!min-w-[115px] text-white/90 uppercase tracking-wider text-xs">Date</TableHead>
                <TableHead className="!min-w-[250px] text-white/90 uppercase tracking-wider text-xs">Lab</TableHead>
                <TableHead className="text-white/90 uppercase tracking-wider text-xs">Status</TableHead>
                <TableHead className="text-white/90 uppercase tracking-wider text-xs">Total</TableHead>
                <TableHead className="text-right text-white/90 uppercase tracking-wider text-xs pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-white/50"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings?.map((booking, index) => (
                  <TableRow key={booking.id} className="booking-row border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <TableCell className="font-medium text-white/90 pl-6">{booking.id}</TableCell>
                    <TableCell className="text-white/70">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-white/70">
                      {booking.lab_branches?.name || booking.lab}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell className="font-medium text-emerald-400">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {booking.totalPrice ? Number(booking.totalPrice).toFixed(2) : '0.00'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Link href={`${baseUrl}=${booking.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
