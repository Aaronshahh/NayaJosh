"use client";

import { useEffect, useRef, useState, FormEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollReveal, useSectionLayout, NAV_HEIGHT } from "./hooks";
import { FloralDivider, CornerSprig } from "./Florals";
import { Collapse, Parallax, SceneFrame } from "./ui/motion-primitives";
import { useAccess } from "./AccessProvider";
import { EVENT_DETAILS, type EventKey } from "@/lib/events";

const EVENT_ICONS: Record<EventKey, ReactNode> = {
  sangeet: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.805.547 3.508 1.494 4.89M9 19s4.803.95 5.367 2.238m0-2.238A11.51 11.51 0 009 19m9.367-2.238A62.768 62.768 0 019 19m0 0l-2.514-.927A60.09 60.09 0 004.59 21.13" />
    </svg>
  ),
  wedding: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

type InvitePartyOption = {
  id: string;
  displayName: string;
  invitedNames: string[];
  maxAdditionalGuests: number;
};

type PartySearchProps = {
  eventKey: EventKey;
  token: string;
  selectedParty?: InvitePartyOption;
  onSelect: (party?: InvitePartyOption) => void;
};

function PartySearch({ eventKey, token, selectedParty, onSelect }: PartySearchProps) {
  const [query, setQuery] = useState(selectedParty?.displayName ?? "");
  const [results, setResults] = useState<InvitePartyOption[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const listId = `invite-party-results-${eventKey}`;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      requestRef.current?.abort();
    };
  }, []);

  const search = (value: string) => {
    setQuery(value);
    onSelect(undefined);
    setResults([]);
    setSearched(false);
    setSearchError("");

    if (timerRef.current) clearTimeout(timerRef.current);
    requestRef.current?.abort();

    const normalized = value.trim();
    if (normalized.length < 2) {
      setSearching(false);
      return;
    }

    setSearching(true);
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      requestRef.current = controller;

      try {
        const params = new URLSearchParams({ eventKey, q: normalized });
        const response = await fetch(`/api/invite-parties?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const data = (await response.json()) as {
          parties?: InvitePartyOption[];
          error?: string;
        };

        if (!response.ok) {
          setSearchError(data.error || "Could not search the invitation list");
          setResults([]);
        } else {
          setResults(data.parties ?? []);
        }
        setSearched(true);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSearchError("Could not search the invitation list");
          setSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 250);
  };

  const selectParty = (party: InvitePartyOption) => {
    setQuery(party.displayName);
    setResults([]);
    setSearched(false);
    setSearchError("");
    onSelect(party);
  };

  const showResults = !selectedParty && query.trim().length >= 2 && (searching || searched || Boolean(searchError));

  return (
    <div className="relative">
      <label htmlFor={`name-${eventKey}`} className="label-field">
        Find your invitation
      </label>
      <input
        type="search"
        id={`name-${eventKey}`}
        value={query}
        onChange={(event) => search(event.target.value)}
        className="input-field"
        placeholder="Start typing your name"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showResults}
        aria-controls={listId}
        aria-describedby={`invite-search-help-${eventKey}`}
        required
      />
      <p id={`invite-search-help-${eventKey}`} className="mt-2 text-xs leading-relaxed text-text-muted">
        Enter a name exactly as it appears on your invitation, then select your party.
      </p>

      {showResults && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-[3px] border border-rose/60 bg-bg-dark-alt shadow-[0_18px_45px_rgba(58,46,52,0.35)] ring-1 ring-bg-dark/20"
        >
          {searching ? (
            <p className="px-4 py-3 text-sm text-blush-light/80">Searching the invitation list…</p>
          ) : searchError ? (
            <p className="px-4 py-3 text-sm text-gold-light" role="alert">{searchError}</p>
          ) : results.length ? (
            results.map((party) => (
              <button
                key={party.id}
                type="button"
                role="option"
                aria-selected={false}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectParty(party)}
                className="block w-full border-b border-blush/15 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-rose-deep/45 focus:bg-rose-deep/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-light"
              >
                <span className="block font-medium text-text-light">{party.displayName}</span>
                <span className="mt-0.5 block text-xs text-blush-light/75">
                  {party.maxAdditionalGuests
                    ? `${party.maxAdditionalGuests} additional ${
                        party.maxAdditionalGuests === 1 ? "guest" : "guests"
                      } included`
                    : "No additional guests included"}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-blush-light/80">
              No matching invitation found. Check the spelling and try again.
            </p>
          )}
        </div>
      )}

    </div>
  );
}

export function RSVP() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const layout = useSectionLayout();
  const reduceMotion = useReducedMotion();
  const { token, events: allowedEvents } = useAccess();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [selectedParties, setSelectedParties] = useState<Partial<Record<EventKey, InvitePartyOption>>>({});
  const cardRefs = useRef<Partial<Record<EventKey, HTMLElement | null>>>({});

  const visibleEvents = allowedEvents.map((key) => EVENT_DETAILS[key]);

  const openForm = (eventKey: EventKey) => {
    setExpanded((prev) => ({ ...prev, [eventKey]: true }));
    // Let the height animation start, then bring the card's top into view so
    // the opened form is actually on screen.
    window.setTimeout(() => {
      cardRefs.current[eventKey]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 120);
  };

  const closeForm = (eventKey: EventKey) =>
    setExpanded((prev) => ({ ...prev, [eventKey]: false }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, eventKey: EventKey) => {
    e.preventDefault();
    if (!token) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const selectedParty = selectedParties[eventKey];
    if (!selectedParty) {
      setErrors((prev) => ({ ...prev, [eventKey]: "Search for your name and select your invitation party" }));
      return;
    }

    const inviteeResponses = selectedParty.invitedNames.map((name, index) => {
      const value = String(formData.get(`invitee-${eventKey}-${index}`) ?? "");
      return { name, value };
    });
    if (inviteeResponses.some((response) => response.value !== "yes" && response.value !== "no")) {
      setErrors((prev) => ({
        ...prev,
        [eventKey]: "Please accept or decline for each person named on the invitation",
      }));
      return;
    }

    const guestNames = formData
      .getAll("guestNames")
      .map((name) => String(name).trim())
      .filter(Boolean);
    const payload = {
      eventKey,
      invitePartyId: selectedParty.id,
      email: String(formData.get("email") ?? "").trim(),
      inviteeResponses: inviteeResponses.map(({ name, value }) => ({
        name,
        attending: value === "yes",
      })),
      guestNames,
      message: String(formData.get("message") ?? "").trim(),
    };

    setSubmitting(eventKey);
    setErrors((prev) => ({ ...prev, [eventKey]: "" }));
    setWarnings((prev) => ({ ...prev, [eventKey]: "" }));

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; warning?: string; ok?: boolean };

      if (!response.ok) {
        setErrors((prev) => ({ ...prev, [eventKey]: data.error || "Could not submit RSVP" }));
      } else {
        setSubmitted((prev) => ({ ...prev, [eventKey]: true }));
        if (data.warning) {
          setWarnings((prev) => ({ ...prev, [eventKey]: data.warning! }));
        }
        form.reset();
        setSelectedParties((prev) => ({ ...prev, [eventKey]: undefined }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [eventKey]: "Could not submit RSVP" }));
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <section id="rsvp" ref={ref} className="section bg-bg" style={layout.section} aria-labelledby="rsvp-title">
      <CornerSprig scrub className="pointer-events-none absolute -left-6 top-10 h-72 w-52 text-sage/40" />
      <CornerSprig scrub className="pointer-events-none absolute -right-6 bottom-10 h-72 w-52 -scale-x-100 text-rose/30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(227,209,203,0.4),transparent_60%)]" />

      <SceneFrame>
      <div className="section-header">
        <p className={`section-eyebrow text-rose-deep reveal ${isVisible ? "is-visible" : ""}`}>
          Together with their families
        </p>
        <FloralDivider draw="scroll" className="mt-3 h-7 w-52 text-rose/60" />
        <h2
          id="rsvp-title"
          className={`section-title mt-4 text-text reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Kindly RSVP
        </h2>
        <p
          className={`section-subtitle text-text-muted reveal ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Please let us know if you can join us for each celebration. We&rsquo;d love to have you there.
        </p>
      </div>

      <div className="section-inner flex justify-center" style={layout.inner}>
        {visibleEvents.length === 0 ? (
          <p className="text-center text-text-muted">No RSVP events are available for this invitation.</p>
        ) : (
          <div
            className={`grid w-full max-w-5xl justify-center gap-7 md:items-start ${
              visibleEvents.length > 1 ? "md:grid-cols-2 lg:gap-9" : ""
            }`}
          >
            {visibleEvents.map((event, index) => (
              <article
                key={event.key}
                ref={(node) => {
                  cardRefs.current[event.key] = node;
                }}
                className={`card-light w-full max-w-[30rem] overflow-hidden ${index === 0 ? "reveal-left" : "reveal-right"} ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${index * 120}ms`, scrollMarginTop: NAV_HEIGHT + 16 }}
              >
                <div
                  className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    expanded[event.key] ? "h-44" : "h-80 md:h-[28rem]"
                  }`}
                >
                  {/* drift sized to the collapsed (h-44) state so edges never show */}
                  <Parallax drift={12} scale={1.14} className="absolute inset-0" innerClassName="h-full w-full">
                    <img
                      src={event.image}
                      alt=""
                      className={`h-full w-full object-cover transition-opacity duration-500 ${
                        expanded[event.key] ? "opacity-60" : "opacity-100"
                      }`}
                    />
                  </Parallax>
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      expanded[event.key] ? "bg-bg/40" : "bg-transparent"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/90 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 text-rose-deep">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-rose-deep shadow-sm">
                      {EVENT_ICONS[event.key]}
                    </span>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-text md:text-3xl">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="p-7 md:p-9">
                  <p className="leading-relaxed text-text-muted">{event.description}</p>
                  <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm text-text-muted">
                      {event.date} · {event.time} · {event.location}
                    </p>
                    {expanded[event.key] && (
                      <button
                        type="button"
                        onClick={() => closeForm(event.key)}
                        aria-expanded={true}
                        aria-controls={`rsvp-form-${event.key}`}
                        className="ml-auto text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-deep transition-colors duration-200 hover:text-rose"
                      >
                        Close
                      </button>
                    )}
                  </div>

                  <Collapse open={!expanded[event.key]}>
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => openForm(event.key)}
                        className="btn-primary w-full"
                        aria-expanded={false}
                        aria-controls={`rsvp-form-${event.key}`}
                      >
                        RSVP
                      </button>
                    </div>
                  </Collapse>

                  <Collapse open={Boolean(expanded[event.key])} id={`rsvp-form-${event.key}`}>
                    <div className="pt-7">
                      {submitted[event.key] ? (
                        <div className="rounded-[3px] border border-rose/30 bg-rose/10 p-4 animate-scale-in" role="status">
                          <p className="text-center font-medium text-rose-deep">
                            Thank you! Your RSVP for {event.name} is in.
                          </p>
                          {warnings[event.key] && (
                            <p className="mt-2 text-center text-sm text-text-muted">{warnings[event.key]}</p>
                          )}
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleSubmit(e, event.key)} className="space-y-5" noValidate>
                          <div className="space-y-4">
                            {token && (
                              <PartySearch
                                eventKey={event.key}
                                token={token}
                                selectedParty={selectedParties[event.key]}
                                onSelect={(party) =>
                                  setSelectedParties((prev) => ({ ...prev, [event.key]: party }))
                                }
                              />
                            )}
                            <div>
                              <label htmlFor={`email-${event.key}`} className="label-field">
                                Email
                              </label>
                              <input
                                type="email"
                                id={`email-${event.key}`}
                                name="email"
                                className="input-field"
                                placeholder="your@email.com"
                                required
                                autoComplete="email"
                              />
                            </div>
                          </div>

                          <fieldset className="space-y-3">
                            <legend className="label-field">Who will be attending?</legend>
                            {!selectedParties[event.key] ? (
                              <p className="text-sm leading-relaxed text-text-muted">
                                Select your invitation party to respond for each person.
                              </p>
                            ) : (
                              <div className="divide-y divide-rose/15 rounded-[3px] border border-rose/20 bg-blush/20">
                                {selectedParties[event.key]!.invitedNames.map((name, index) => (
                                  <div
                                    key={name}
                                    className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                  >
                                    <p className="font-medium text-text">{name}</p>
                                    <div className="flex flex-wrap gap-4">
                                      <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                          type="radio"
                                          name={`invitee-${event.key}-${index}`}
                                          value="yes"
                                          className="h-4 w-4 accent-rose"
                                          required
                                        />
                                        <span className="text-sm text-text">Joyfully accept</span>
                                      </label>
                                      <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                          type="radio"
                                          name={`invitee-${event.key}-${index}`}
                                          value="no"
                                          className="h-4 w-4 accent-rose"
                                        />
                                        <span className="text-sm text-text">Regretfully decline</span>
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </fieldset>

                          <fieldset>
                            <legend className="label-field">Additional guest names</legend>
                            {!selectedParties[event.key] ? (
                              <p className="text-sm leading-relaxed text-text-muted">
                                Select your invitation party to see how many guests are included.
                              </p>
                            ) : selectedParties[event.key]!.maxAdditionalGuests === 0 ? (
                              <p className="text-sm leading-relaxed text-text-muted">
                                No additional guest names are needed for this invitation.
                              </p>
                            ) : (
                              <>
                                <p className="mb-3 text-sm leading-relaxed text-text-muted">
                                  Add up to {selectedParties[event.key]!.maxAdditionalGuests} additional{" "}
                                  {selectedParties[event.key]!.maxAdditionalGuests === 1 ? "guest" : "guests"}.
                                  Leave unused spaces blank.
                                </p>
                                <div className="grid gap-3">
                                  {Array.from(
                                    { length: selectedParties[event.key]!.maxAdditionalGuests },
                                    (_, index) => (
                                      <div key={index} className="flex items-center gap-3">
                                        <span
                                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/25 bg-blush/35 text-sm font-medium text-rose-deep"
                                          aria-hidden="true"
                                        >
                                          {index + 1}
                                        </span>
                                        <label htmlFor={`guest-${event.key}-${index}`} className="sr-only">
                                          Additional guest {index + 1} name
                                        </label>
                                        <input
                                          type="text"
                                          id={`guest-${event.key}-${index}`}
                                          name="guestNames"
                                          className="input-field"
                                          placeholder={`Guest ${index + 1} name`}
                                          autoComplete="off"
                                          maxLength={100}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              </>
                            )}
                          </fieldset>

                          <div>
                            <label htmlFor={`message-${event.key}`} className="label-field">
                              Message (optional)
                            </label>
                            <textarea
                              id={`message-${event.key}`}
                              name="message"
                              rows={2}
                              className="input-field min-h-[64px] resize-y"
                              placeholder="Dietary notes, song requests, or a note for us..."
                            />
                          </div>

                          {errors[event.key] && (
                            <p className="text-sm font-medium text-rose-deep" role="alert">
                              {errors[event.key]}
                            </p>
                          )}

                          <button type="submit" className="btn-primary w-full" disabled={submitting === event.key}>
                            {submitting === event.key ? "Submitting…" : "Submit RSVP"}
                          </button>
                        </form>
                      )}
                    </div>
                  </Collapse>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      </SceneFrame>
    </section>
  );
}
