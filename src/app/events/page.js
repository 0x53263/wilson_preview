"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import MailtoNotifyForm from "@/components/SignUp";

// Modified Card component specifically for events
const EventCard = ({
  imageUrl,
  title,
  description,
  dateTime,
  location,
  hostedBy,
  onCardClick,
  aspectRatio = "aspect-video",
}) => {
  return (
    <div
      className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full cursor-pointer hover:shadow-md transition-all"
      onClick={onCardClick}
    >
      <div className={`relative ${aspectRatio} bg-gray-200`}>
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-arteng-dark">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p>

        <div className="mb-4 text-sm space-y-1 flex-grow">
          {dateTime && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{dateTime}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{location}</span>
            </div>
          )}
          {hostedBy && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Hosted by {hostedBy}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex justify-center w-full">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card's onClick from triggering
              onCardClick();
            }}
            className="inline-block bg-arteng-dark text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors w-32 text-center"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date
  const formatEventDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString("en-GB", options);
    } catch (error) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  // Helper function to determine if event is "this week"
  const isThisWeek = (dateString) => {
    try {
      const eventDate = new Date(dateString);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      return eventDate >= now && eventDate <= weekFromNow;
    } catch (error) {
      return false;
    }
  };

  // Transform API event to match component expectations
  const transformEvent = (apiEvent) => ({
    id: apiEvent.id,
    title: apiEvent.title,
    subtitle: apiEvent.subtitle,
    description: apiEvent.description,
    imageUrl: apiEvent.thumbImage || apiEvent.bannerImage, // Use thumb image first, fallback to banner
    bannerImage: apiEvent.bannerImage, // Keep banner for modal
    thumbImage: apiEvent.thumbImage,
    dateTime: formatEventDate(apiEvent.date),
    rawDate: apiEvent.date,
    location: apiEvent.location,
    hostedBy: apiEvent.sponsor || "ArtEng Community", // Use sponsor as host, fallback to default
    capacity: apiEvent.capacity,
    price: apiEvent.price,
    sponsorLogo: apiEvent.sponsorLogo,
    publishDate: apiEvent.publishDate,
    longDescription: apiEvent.description, // Using description as long description since API doesn't provide separate field
  });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://arteng-be.onrender.com/api/v1/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        if (data.success && data.data) {
          const transformedEvents = data.data.map(transformEvent);
          setEvents(transformedEvents);
        } else {
          setEvents([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Separate events into featured (this week) and other events
  const featuredEvents = events.filter((event) => isThisWeek(event.rawDate));
  const otherEvents = events.filter((event) => !isThisWeek(event.rawDate));

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-arteng-dark text-white py-12 pt-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl font-bold mb-4">Event Schedule</h1>
            <p className="text-xl">
              Browse our upcoming events and reserve your spot today.
            </p>
          </div>
        </section>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arteng-dark mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-arteng-dark text-white py-12 pt-24">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-5xl font-bold mb-4">Event Schedule</h1>
            <p className="text-xl">
              Browse our upcoming events and reserve your spot today.
            </p>
          </div>
        </section>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-arteng-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-5xl font-bold mb-4">Event Schedule</h1>
          <p className="text-xl">
            Browse our upcoming events and reserve your spot today.
          </p>
        </div>
      </section>

      <div className="relative">
        {/* Featured Events (This Week) */}
        {featuredEvents.length > 0 && (
          <section className="py-16 px-4 md:px-8 bg-gray-50">
            <div className="container mx-auto">
              <div>
                <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">
                  Featured Events
                </h2>
                <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">
                  Upcoming at ArtEng
                </p>
              </div>

              {/* Custom carousel implementation to avoid reloading issues */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {featuredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    imageUrl={event.imageUrl}
                    title={event.title}
                    description={event.description}
                    dateTime={event.dateTime}
                    location={event.location}
                    hostedBy={event.hostedBy}
                    onCardClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Events / Other Events */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto">
            <div>
              <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">
                Event Schedule
              </h2>
              <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">
                {otherEvents.length > 0
                  ? "All Events"
                  : featuredEvents.length > 0
                  ? "All Events"
                  : "Events"}
              </p>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  No events available at the moment.
                </p>
                <p className="text-gray-500">
                  Check back later for upcoming events!
                </p>
              </div>
            ) : otherEvents.length === 0 && featuredEvents.length > 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  All upcoming events are featured this week!
                </p>
                <p className="text-gray-500">
                  Check the "Featured Events" section above.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {otherEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      imageUrl={event.imageUrl}
                      title={event.title}
                      description={event.description}
                      dateTime={event.dateTime}
                      location={event.location}
                      hostedBy={event.hostedBy}
                      onCardClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>

                {otherEvents.length > 6 && (
                  <div className="flex justify-center w-full mt-8">
                    <Link
                      href="/events"
                      className="inline-block bg-arteng-dark text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors w-32 text-center"
                    >
                      View All
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Enhanced Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Main Banner Image */}
              <div className="h-64 relative">
                <Image
                  src={selectedEvent.bannerImage || selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover object-center"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-arteng-dark">
                      {selectedEvent.title}
                    </h2>
                    {selectedEvent.subtitle && (
                      <h3 className="text-lg text-gray-600 mb-3">
                        {selectedEvent.subtitle}
                      </h3>
                    )}

                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{selectedEvent.dateTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{selectedEvent.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Hosted by {selectedEvent.hostedBy}</span>
                      </div>

                      {selectedEvent.capacity && (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>Capacity: {selectedEvent.capacity}</span>
                        </div>
                      )}

                      {selectedEvent.price !== undefined && (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span>
                            {selectedEvent.price === 0
                              ? "Free"
                              : `£${(selectedEvent.price / 100).toFixed(2)}`}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-6">
                      {selectedEvent.longDescription}
                    </p>
                  </div>

                  {/* Side Panel with Additional Images */}
                  <div className="lg:w-80 space-y-4">
                    {/* Sponsor Logo */}
                    {selectedEvent.sponsorLogo && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Event Sponsor
                        </h4>
                        <div className="relative h-20 bg-white rounded-md p-2 flex items-center justify-center">
                          <Image
                            src={selectedEvent.sponsorLogo}
                            alt="Sponsor logo"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2 text-center">
                          Sponsored by {selectedEvent.hostedBy}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href={`/events/signup?eventId=${selectedEvent.id}`}
                    className="bg-arteng-dark text-white py-2 px-6 rounded hover:bg-opacity-90 transition-colors text-center"
                  >
                    Register Now
                  </Link>

                  <button
                    onClick={closeModal}
                    className="border border-gray-300 py-2 px-6 rounded hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
