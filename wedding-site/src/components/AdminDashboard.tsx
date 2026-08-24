"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccess } from "./AccessProvider";
import type { RsvpRow } from "@/lib/supabase";

function csvEscape(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function AdminDashboard() {
  const { token, lock } = useAccess();
  const [guests, setGuests] = useState<RsvpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState<"all" | "sangeet" | "wedding">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "yes" | "no">("all");

  const loadGuests = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/guests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as { guests?: RsvpRow[]; error?: string };
      if (!response.ok) {
        setError(data.error || "Could not load guests");
        setGuests([]);
      } else {
        setGuests(data.guests ?? []);
      }
    } catch {
      setError("Could not load guests");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadGuests();
  }, [loadGuests]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guests.filter((guest) => {
      if (eventFilter !== "all" && guest.event_key !== eventFilter) return false;
      if (statusFilter === "yes" && !guest.attending) return false;
      if (statusFilter === "no" && guest.attending) return false;
      if (!q) return true;
      return (
        guest.full_name.toLowerCase().includes(q) ||
        guest.email.toLowerCase().includes(q) ||
        guest.event_name.toLowerCase().includes(q) ||
        (guest.message ?? "").toLowerCase().includes(q)
      );
    });
  }, [guests, query, eventFilter, statusFilter]);

  const stats = useMemo(() => {
    const attending = guests.filter((g) => g.attending);
    const declining = guests.filter((g) => !g.attending);
    const headcount = attending.reduce((sum, g) => sum + (g.guest_count || 0), 0);
    return {
      total: guests.length,
      attending: attending.length,
      declining: declining.length,
      headcount,
    };
  }, [guests]);

  const exportCsv = () => {
    const header = [
      "Created At",
      "Name",
      "Email",
      "Event",
      "Attending",
      "Guests",
      "Date",
      "Time",
      "Location",
      "Message",
    ];
    const lines = [
      header.join(","),
      ...filtered.map((g) =>
        [
          g.created_at,
          g.full_name,
          g.email,
          g.event_name,
          g.attending ? "Yes" : "No",
          String(g.guest_count),
          g.event_date ?? "",
          g.event_time ?? "",
          g.event_location ?? "",
          g.message ?? "",
        ]
          .map(csvEscape)
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-rsvps.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-bg px-4 py-8 text-text md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow text-rose-deep">Couple dashboard</p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">Guest RSVPs</h1>
            <p className="mt-2 text-sm text-text-muted md:text-base">
              Spreadsheet view of everyone who has responded.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => void loadGuests()} className="btn-secondary">
              Refresh
            </button>
            <button type="button" onClick={exportCsv} className="btn-primary" disabled={!filtered.length}>
              Export CSV
            </button>
            <button type="button" onClick={lock} className="btn-secondary">
              Lock site
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total RSVPs", value: stats.total },
            { label: "Attending", value: stats.attending },
            { label: "Declining", value: stats.declining },
            { label: "Guest headcount", value: stats.headcount },
          ].map((stat) => (
            <div key={stat.label} className="card-light px-5 py-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-deep">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-medium">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, message…"
            className="input-field md:max-w-sm"
          />
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value as typeof eventFilter)}
            className="input-field appearance-none md:max-w-[14rem]"
          >
            <option value="all">All events</option>
            <option value="sangeet">Mehendi / Sangeet</option>
            <option value="wedding">Wedding Ceremony</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="input-field appearance-none md:max-w-[12rem]"
          >
            <option value="all">All responses</option>
            <option value="yes">Attending</option>
            <option value="no">Declining</option>
          </select>
        </div>

        {error && (
          <p className="mb-4 rounded-[3px] border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose-deep" role="alert">
            {error}
          </p>
        )}

        <div className="overflow-x-auto rounded-[3px] border border-rose/20 bg-blush/20">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-blush/50 text-[0.7rem] uppercase tracking-[0.12em] text-rose-deep">
              <tr>
                {[
                  "Submitted",
                  "Name",
                  "Email",
                  "Event",
                  "Status",
                  "Guests",
                  "When",
                  "Where",
                  "Message",
                ].map((heading) => (
                  <th key={heading} className="whitespace-nowrap px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-text-muted">
                    Loading guests…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-text-muted">
                    No RSVPs match these filters yet.
                  </td>
                </tr>
              ) : (
                filtered.map((guest) => (
                  <tr key={guest.id} className="border-t border-rose/15 align-top odd:bg-white/30">
                    <td className="whitespace-nowrap px-4 py-3 text-text-muted">
                      {new Date(guest.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{guest.full_name}</td>
                    <td className="px-4 py-3">{guest.email}</td>
                    <td className="px-4 py-3">{guest.event_name}</td>
                    <td className="px-4 py-3">
                      <span className={guest.attending ? "text-sage" : "text-rose-deep"}>
                        {guest.attending ? "Attending" : "Declining"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{guest.guest_count}</td>
                    <td className="px-4 py-3 text-text-muted">
                      {[guest.event_date, guest.event_time].filter(Boolean).join(" · ")}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{guest.event_location}</td>
                    <td className="max-w-xs px-4 py-3 text-text-muted">{guest.message || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
