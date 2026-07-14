"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Eye,
  EyeOff,
  User,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

// ─── Mock data (replace with real API calls) ──────────────────────────────────

const mockUser = {
  name: "Riya Sharma",
  email: "riya@example.com",
  phone: "+91 98765 43210",
  company: "Herbal Formulations Pvt. Ltd.",
  type: "B2B Wholesale",
  memberSince: "January 2024",
};

const mockOrders = [
  { id: "NN-1042", date: "10 Jul 2026", items: "Ashwagandha Extract × 5 kg", status: "Delivered" },
  { id: "NN-1031", date: "28 Jun 2026", items: "Tulsi + Neem Extract × 2 kg", status: "Processing" },
  { id: "NN-1018", date: "05 Jun 2026", items: "Gymnema Extract × 3 kg", status: "Delivered" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-primary/10 text-primary",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
};

// ─── Sign-In Form ─────────────────────────────────────────────────────────────

function SignInForm({ onSignIn }: { onSignIn: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"signin" | "register">("signin");

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 py-12 bg-secondary/20">
      <div className="w-full max-w-md">

        {/* Logo mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">Nature Nook</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1.5">
            {tab === "signin"
              ? "Sign in to manage your orders and enquiries."
              : "Join Nature Nook to access wholesale pricing and track orders."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl border border-border bg-background p-1 mb-6">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
              tab === "signin"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
              tab === "register"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-5">

          {tab === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="first-name">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Riya"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Sharma"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          {tab === "register" && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="company">
                Company / Business Name
              </label>
              <input
                id="company"
                type="text"
                placeholder="Herbal Formulations Pvt. Ltd."
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              {tab === "signin" && (
                <Link href="#" className="text-xs text-primary hover:underline underline-offset-4">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {tab === "register" && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          )}

          {/* Submit */}
          <Button
            onClick={onSignIn}
            className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-sm hover:shadow-md transition-all mt-1"
          >
            {tab === "signin" ? "Sign In" : "Create Account"}
          </Button>

          {tab === "signin" && (
            <p className="text-center text-xs text-muted-foreground pt-1">
              Don&apos;t have an account?{" "}
              <button onClick={() => setTab("register")} className="text-primary font-semibold hover:underline underline-offset-4">
                Register here
              </button>
            </p>
          )}
        </div>

        {/* Trust note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Your data is safe and never shared.
        </div>
      </div>
    </div>
  );
}

// ─── Account Dashboard ────────────────────────────────────────────────────────

function AccountDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "details">("overview");

  return (
    <div className="min-h-[calc(100vh-130px)] bg-secondary/10">
      <div className="container mx-auto px-4 py-10 md:py-14">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">My Account</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Hello, {mockUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {mockUser.type} · Member since {mockUser.memberSince}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onSignOut}
            className="hidden md:inline-flex rounded-full border-border text-muted-foreground hover:text-foreground gap-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 bg-background border border-border rounded-xl p-1 w-fit mb-8">
          {(["overview", "orders", "details"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all ${
                activeTab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "overview" ? "Overview" : t === "orders" ? "Orders" : "My Details"}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Quick stats */}
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Orders", value: "3", icon: Package },
                { label: "Pending Orders", value: "1", icon: Clock },
                { label: "Account Type", value: "B2B", icon: User },
                { label: "Verified", value: "Yes", icon: ShieldCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-card rounded-xl border border-border p-4 md:p-5 flex flex-col gap-2"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="md:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Recent Orders</h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-primary font-semibold hover:underline underline-offset-4"
                >
                  View all
                </button>
              </div>
              <div className="divide-y divide-border">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3.5 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground truncate">{order.items}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold rounded-full px-2.5 py-1 ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Quick Links</h2>
              </div>
              <div className="divide-y divide-border">
                {[
                  { label: "Browse Catalogue", href: "/catalogue", icon: Package },
                  { label: "Wholesale Inquiry", href: "/vendor", icon: User },
                  { label: "Track an Order", href: "/track", icon: MapPin },
                ].map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === "orders" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Order History</h2>
            </div>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left font-semibold text-muted-foreground px-5 py-3">Order ID</th>
                    <th className="text-left font-semibold text-muted-foreground px-5 py-3">Items</th>
                    <th className="text-left font-semibold text-muted-foreground px-5 py-3">Date</th>
                    <th className="text-left font-semibold text-muted-foreground px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4 font-semibold text-foreground">{order.id}</td>
                      <td className="px-5 py-4 text-muted-foreground">{order.items}</td>
                      <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${statusColor[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link href="/track" className="text-xs text-primary font-semibold hover:underline underline-offset-4">
                          Track
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {mockOrders.map((order) => (
                <div key={order.id} className="px-5 py-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground text-sm">{order.id}</span>
                    <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                    <Link href="/track" className="text-xs text-primary font-semibold hover:underline underline-offset-4">
                      Track order →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MY DETAILS ── */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Personal info */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Personal Information</h2>
                <button className="text-xs text-primary font-semibold hover:underline underline-offset-4">Edit</button>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Full Name", value: mockUser.name },
                  { label: "Email", value: mockUser.email },
                  { label: "Phone", value: mockUser.phone },
                  { label: "Company", value: mockUser.company },
                  { label: "Account Type", value: mockUser.type },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-medium text-foreground break-words">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved address */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Saved Address</h2>
                <button className="text-xs text-primary font-semibold hover:underline underline-offset-4">Edit</button>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">Office / Billing Address</p>
                    <p>123, Industrial Area, Phase II</p>
                    <p>Mumbai, Maharashtra 400 001</p>
                    <p>India</p>
                  </div>
                </div>
                <button className="mt-3 text-xs text-primary font-semibold hover:underline underline-offset-4 flex items-center gap-1">
                  + Add new address
                </button>
              </div>
            </div>

            {/* Change password */}
            <div className="bg-card rounded-xl border border-border overflow-hidden md:col-span-2">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Change Password</h2>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Current Password", "New Password", "Confirm New Password"].map((lbl) => (
                  <div key={lbl} className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{lbl}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-9 text-sm font-semibold">
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile sign out */}
        <div className="mt-8 md:hidden">
          <Button
            variant="outline"
            onClick={onSignOut}
            className="w-full rounded-full border-border text-muted-foreground gap-2"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return isSignedIn ? (
    <AccountDashboard onSignOut={() => setIsSignedIn(false)} />
  ) : (
    <SignInForm onSignIn={() => setIsSignedIn(true)} />
  );
}
