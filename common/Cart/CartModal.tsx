"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { format } from "date-fns";
import { CalendarIcon, ShoppingCart, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types";
import { toast } from "react-toastify";
import { useCart } from "@/providers/CartProvider";
import { fetchLabBranches } from "@/utils/data/lab-branches";
import { useCurrentUser } from "@/providers/AuthProvider";
import {
  createBooking,
  fetchLatestBookingIdForUser,
  insertTestsBooking,
} from "@/utils/data/bookings";
import { useRouter } from "next/navigation";

type CartModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const { appUser } = useCurrentUser();
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"cart" | "booking">("cart");
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: new Date(),
    lab: "",
    collection_location: "lab",
  });
  const [labs, setLabs] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchLabs = async () => {
      fetchLabBranches().then((labs) => {
        if (labs) {
          setLabs(labs);
        } else {
          toast.error("Failed to fetch labs. Please try again later.");
        }
      });
    };

    fetchLabs();
  }, []);

  const handleNextStep = () => {
    if (items.length === 0) {
      toast.error("Please add some tests to your cart before proceeding.");
      return;
    }

    if (!appUser?.id) {
      toast.error("User not found. Please sign in again.");
      router.push("/sign-in?redirect=/tests?login=true");
      onOpenChange(false);
      return;
    }

    // Animate transition to booking form
    const timeline = gsap.timeline();
    timeline.to(".cart-items", {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => setStep("booking"),
    });
  };

  const handlePreviousStep = () => {
    // Animate transition back to cart
    const timeline = gsap.timeline();
    timeline.to(".booking-form", {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => setStep("cart"),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validate form
    if (!bookingData.date) {
      setIsSubmitting(false);
      toast.error("Please select a date for your booking.");
      return;
    }

    if (!bookingData.lab) {
      setIsSubmitting(false);
      toast.error("Please select a lab for your booking.");
      return;
    }

    // Prepare booking payload
    const addBookingsPayload = {
      userId: appUser?.id,
      ...bookingData,
      status: "pending",
      totalPrice: getTotalPrice(),
    };

    try {
      if (!appUser?.id) {
        toast.error("User not found. Please sign in again.");
        router.push("/sign-in?redirect=/tests?login=true");
        onOpenChange(false);
        setIsSubmitting(false);
        return;
      }

      const booking = await createBooking(addBookingsPayload);

      // Get the booking ID from the created booking
      if (!booking || !booking.id) {
        toast.error("Failed to get booking ID after creation.");
        setIsSubmitting(false);
        return;
      }

      const bookingId = booking.id;

      // Insert each test in the cart into tests_bookings
      for (const item of items) {
        const testBookingPayload = {
          booking_id: bookingId,
          test_id: item.test.id,
        };
        await insertTestsBooking(testBookingPayload);
      }

      // Clear cart and close modal
      setIsSubmitting(false);
      clearCart();
      setStep("cart");
      onOpenChange(false);
      toast.success("Your booking has been submitted successfully.");
    } catch (error) {
      console.error("Error creating booking or test bookings:", error);
      toast.error("Failed to create booking. Please try again.");
      setIsSubmitting(false);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animate the content when it appears
  const animateContent = () => {
    if (step === "cart") {
      gsap.fromTo(
        ".cart-items",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
      );
      gsap.fromTo(
        ".cart-summary",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.2 }
      );
    } else {
      gsap.fromTo(
        ".booking-form",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3 }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          animateContent();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === "cart" ? (
              <>
                <ShoppingCart className="h-5 w-5 text-teal-600" />
                Your Cart
              </>
            ) : (
              <>Booking Details</>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === "cart"
              ? "Review the tests you've selected before proceeding to booking."
              : "Please provide the details for your booking."}
          </DialogDescription>
        </DialogHeader>

        {step === "cart" ? (
          <>
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Add some tests to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 cart-items">
                    {items.map((item) => (
                      <div
                        key={item.test.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{item.test.name}</h4>
                          <p className="text-sm text-gray-500">
                            ${item.test.cost}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              // Remove all quantities of this item
                              for (let i = 0; i < item.quantity; i++) {
                                removeItem(item.test.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="cart-summary">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleNextStep}
                disabled={items.length === 0}
              >
                Next
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 booking-form">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !bookingData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.date ? (
                        format(bookingData.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.date}
                      onSelect={(date) =>
                        date && setBookingData({ ...bookingData, date })
                      }
                      disabled={(date) =>
                        date < new Date() ||
                        date >
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 3)
                          )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lab">Select Lab</Label>
                <Select
                  value={bookingData.lab}
                  onValueChange={(value) =>
                    setBookingData({ ...bookingData, lab: value })
                  }
                >
                  <SelectTrigger id="lab">
                    <SelectValue placeholder="Select a lab" />
                  </SelectTrigger>
                  <SelectContent>
                    {labs.map((lab) => (
                      <SelectItem key={lab.id} value={lab.id}>
                        {lab.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {/* 
                    In a real app, you would fetch this from Supabase:
                    
                    const { data, error } = await supabase
                      .from('lab_branches')
                      .select('id, name')
                    
                    if (data) {
                      // Map data to SelectItems
                    }
                  */}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Sample Collection Location</Label>
                <RadioGroup
                  value={bookingData.collection_location}
                  onValueChange={(value) =>
                    setBookingData({
                      ...bookingData,
                      collection_location: value as "lab" | "home",
                    })
                  }
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lab" id="lab-location" />
                    <Label htmlFor="lab-location" className="cursor-pointer">
                      At Lab
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home-location" />
                    <Label htmlFor="home-location" className="cursor-pointer">
                      Home Collection
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Total Amount</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  This amount will be collected at the time of service.
                </p>
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                className="mt-2 sm:mt-0"
              >
                <X className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
               {isSubmitting ? "Booking..." : "Complete Booking"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
