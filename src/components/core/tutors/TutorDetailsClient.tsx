"use client";

import Image from "next/image";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  MessageCircle,
  BadgeCheck,
  LibraryBig,
} from "lucide-react";
import { Tutor } from "@/types/tutor.types";
import { useState } from "react";
import BookingModal from "../booking/BookingModal";
import { User } from "@/types/user.type";
import { USER_ROLES } from "@/constants/user/UserRoles";
import { useRouter } from "next/navigation";


type TutorDetailsClientProps = {
  tutor: Tutor;
  user: User;
};


export default function TutorDetailsClient({
  tutor,
  user,
}: TutorDetailsClientProps) {

  const [bookingOpen, setBookingOpen] = useState(false);

  const completedSessions =
    tutor.bookingsAsTutor?.filter(
      b => b.status === "COMPLETED"
    ).length || 0;

  const activeAvailability =
    tutor.availability?.filter(a => a.isActive).length || 0;

  const recentBookings =
    tutor.bookingsAsTutor
      ?.filter(
        b => b.status === "COMPLETED"
      )
      .slice(0, 5);

  const router = useRouter();

  return (
    <section className="py-16 mt-16">
      <div className="max-w-[1440px] mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            {/* HERO */}
            <div className="border p-8 flex md:flex-row flex-col rounded-3xl overflow-hidden bg-card">
              <div className="relative w-full h-80">
                <Image
                  src={tutor.user?.image || "/default-avatar.png"}
                  alt={tutor.user?.name}
                  fill
                  className="rounded-2xl object-cover object-top"
                />
              </div>

              <div className="flex flex-col pt-8 pl-6 w-full">

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-flex items-center gap-1.5">
                    {tutor?.isFeatured ? (
                      <Award className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                    {tutor?.isFeatured ? "Featured Tutor" : "Tutor"}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium inline-flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4" />
                    Verified
                  </span>
                </div>

                <h1 className="sm:text-4xl text-2xl font-bold mb-2">
                  {tutor.user?.name}
                </h1>

                <p className="text-primary font-semibold mt-2">
                  {tutor.education}
                </p>

                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">
                      {tutor.avgRating || 0} ({tutor.totalReviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>
                      {tutor.totalReviews} Students
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>
                      {tutor.experience || "Beginner"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">
                  {tutor.avgRating.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>
              </div>

              <div className="border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">
                  {tutor.totalReviews}
                </p>
                <p className="text-sm text-muted-foreground">
                  Reviews
                </p>
              </div>

              <div className="border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">
                  {completedSessions}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sessions
                </p>
              </div>

              <div className="border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">
                  {activeAvailability}
                </p>
                <p className="text-sm text-muted-foreground">
                  Time Slots
                </p>
              </div>
            </div>

            {/* ABOUT */}
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4">
                About Tutor
              </h2>

              <p className="text-muted-foreground leading-8">
                {tutor.bio}
                {". "}
                Dedicated to creating engaging learning experiences and helping students achieve their academic goals through personalized guidance, structured lessons, and continuous support.
              </p>
            </div>

            {/* SKILLS */}
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Expertise
              </h2>

              <div className="flex flex-wrap gap-3">
                {tutor.categories?.map(category => (
                  <div
                    key={category.id}
                    className="
        flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-primary/10
        text-primary
        font-medium
      "
                  >
                    <LibraryBig className="h-5 w-5" />
                    {category.name}
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Experience & Qualifications
              </h2>

              <div className="space-y-5">

                <div className="flex gap-4">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold">
                      Education
                    </h3>
                    <p className="text-muted-foreground">
                      Bachelor Degree in {tutor.education}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Award className="w-6 h-6 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">
                      Certifications
                    </h3>
                    <p className="text-muted-foreground">
                      Industry recognized certificates
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold">
                      Teaching Experience
                    </h3>
                    <p className="text-muted-foreground">
                      {tutor.experience || "Professional Tutor"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Weekly Availability
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {tutor.availability.map(slot => (
                  <div
                    key={slot.id}
                    className="border rounded-xl p-4"
                  >
                    <p className="font-semibold">
                      {slot.dayOfWeek}
                    </p>

                    <p className="text-muted-foreground">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="border rounded-3xl p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Student Reviews
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tutor.totalReviews} reviews • {tutor.avgRating.toFixed(1)} average rating
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">
                    {tutor.avgRating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin">
                {tutor.tutorReviews.map((review) => (
                  <div
                    key={review.id}
                    className="
    min-w-85
    max-w-85
    rounded-2xl
    border
    bg-card
    p-5
    snap-start
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-lg
    flex
    flex-col
"
                  >
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="overflow-hidden rounded-full border">
                          <Image
                            src={review.student.user.image || "/placeholder.png"}
                            alt={review.student.user.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-cover object-top"
                          />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {review.student.user.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Verified Learner
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground/30"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-sm leading-7 text-muted-foreground">
                      {review.comment}
                    </p>

                    {/* Footer - Always at Bottom */}
                    <div className="mt-auto pt-6">
                      <div className="border-t pt-4 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <span className="text-xs font-medium text-primary">
                          Verified Review
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*  COMPLETED SESSION*/}
            <div className="border rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Recent Sessions
              </h2>

              <div className="space-y-3">
                {recentBookings.map(session => (
                  <div
                    key={session.id}
                    className="flex justify-between border rounded-xl p-4"
                  >
                    <span>
                      Session Completed
                    </span>

                    <span className="text-muted-foreground">
                      {new Date(session.date)
                        .toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="sticky top-24 border rounded-3xl p-6 bg-card">
              <div className="text-center mb-6">
                <h3 className="text-4xl font-bold text-primary">
                  ৳{tutor.hourlyRate || 20}
                </h3>

                <p className="text-muted-foreground">
                  Per Hour
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-semibold">
                    {tutor.experience}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-semibold">
                    {tutor.avgRating || 0}/5
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600 font-semibold">
                    {tutor?.availability.length > 0 ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingOpen(true)
                }}
                className="w-full cursor-pointer h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Book Session
              </button>

              <button
                onClick={() => {
                  if (user?.role && user?.role !== USER_ROLES.ADMIN) {
                    router.push(`/dashboard/${user?.role.toLowerCase()}/messages`);
                  }
                }}
                disabled={!user || !user?.role || user?.role === USER_ROLES.ADMIN}
                className="w-full cursor-pointer h-12 rounded-xl border mt-3 font-medium">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Send Message
              </button>

              <button className="w-full cursor-pointer h-12 rounded-xl border mt-3 font-medium">
                <Calendar className="w-4 h-4 inline mr-2" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>

      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tutor={tutor}
      />
    </section>
  );
}