"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Package, MapPin, LogOut, ChevronRight, ShieldCheck, Clock } from "lucide-react";
import { signOut } from "next-auth/react";

const statusColor: Record<string, string> = {
  Delivered: "bg-primary/10 text-primary",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  PENDING: "bg-amber-100 text-amber-700"
};

export default function AccountDashboard({ user }: { user: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "details">("overview");
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    companyName: user.companyName || "",
  });

  // Address edit state
  const [addressEditId, setAddressEditId] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    type: "SHIPPING",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India"
  });

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const name = user.firstName ? `${user.firstName} ${user.lastName}` : user.email;
  const company = user.companyName || "N/A";
  const type = user.role === "VENDOR" ? "B2B Wholesale" : "Direct Consumer";
  const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const totalOrders = user.orders.length;
  const pendingOrders = user.orders.filter((o: any) => o.status === "PENDING" || o.status === "Processing").length;

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      
      if (res.ok) {
        setIsEditingProfile(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    const method = addressEditId ? "PUT" : "POST";
    const body = addressEditId ? { id: addressEditId, ...addressData } : addressData;
    
    try {
      const res = await fetch("/api/user/addresses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setAddressEditId(null);
        setIsAddingAddress(false);
        router.refresh();
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const startEditAddress = (address: any) => {
    setAddressData({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country
    });
    setAddressEditId(address.id);
    setIsAddingAddress(false);
  };

  const startAddAddress = () => {
    setAddressData({
      type: "SHIPPING",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India"
    });
    setAddressEditId(null);
    setIsAddingAddress(true);
  };

  return (
    <div className="min-h-[calc(100vh-130px)] bg-secondary/10">
      <div className="container mx-auto px-4 py-10 md:py-14">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">My Account</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Hello, {name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {type} · Member since {memberSince}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
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
                { label: "Total Orders", value: totalOrders.toString(), icon: Package },
                { label: "Pending Orders", value: pendingOrders.toString(), icon: Clock },
                { label: "Account Type", value: user.role, icon: UserIcon },
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
                {user.orders.slice(0, 3).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3.5 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">Order #{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground truncate">{order.items?.length || 0} items</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold rounded-full px-2.5 py-1 ${statusColor[order.status] || "bg-muted text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
                {user.orders.length === 0 && (
                  <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                    You haven't placed any orders yet.
                  </div>
                )}
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
                  { label: "Wholesale Inquiry", href: "/vendor", icon: UserIcon },
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

        {/* ── MY ORDERS ── */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Order History</h2>
            </div>
            
            <div className="space-y-5">
              {user.orders
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((order: any) => (
                <div key={order.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-secondary/30 px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-0.5">Order Placed</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Total Amount</p>
                        <p className="font-semibold text-primary">₹{order.totalAmount?.toLocaleString() || "0"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">Order #</p>
                        <p className="font-semibold text-foreground uppercase">{order.id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1.5">
                      <span className={`text-xs font-bold rounded-full px-3 py-1 uppercase tracking-wider ${statusColor[order.status] || "bg-muted text-muted-foreground"}`}>
                        {order.status}
                      </span>
                      {order.transactionId && (
                        <p className="text-[10px] text-muted-foreground font-mono">TXN: {order.transactionId}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Body (Items) */}
                  <div className="px-6 py-5">
                    <h4 className="text-sm font-semibold mb-4 text-foreground">Items in your order:</h4>
                    <div className="space-y-3">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-muted-foreground/70" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground line-clamp-1">{item.productName}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-bold">₹{(item.priceAtTime * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Shipped to: <span className="font-semibold text-foreground">{order.guestName || name}</span>
                    </p>
                    <Link href="/track" className="text-sm text-primary font-bold hover:underline underline-offset-4">
                      Track Order &rarr;
                    </Link>
                  </div>
                </div>
              ))}
              
              {user.orders.length === 0 && (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">When you place an order, it will appear here.</p>
                  <Link href="/catalogue">
                    <Button className="rounded-full px-6">Start Shopping</Button>
                  </Link>
                </div>
              )}
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
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="text-xs text-primary font-semibold hover:underline underline-offset-4"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="p-5">
                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">First Name</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">Last Name</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Company Name</label>
                      <input
                        type="text"
                        value={profileData.companyName}
                        onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" disabled={profileLoading} className="h-9 text-xs w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {profileLoading ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button type="button" onClick={() => setIsEditingProfile(false)} variant="outline" className="h-9 text-xs w-full">
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {[
                      { label: "Full Name", value: name },
                      { label: "Email", value: user.email },
                      { label: "Phone", value: user.phone || "Not provided" },
                      { label: "Company", value: company },
                      { label: "Account Type", value: type },
                    ].map(({ label, value }) => (
                      <div key={label} className="grid grid-cols-2 gap-2">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className="text-sm font-medium text-foreground break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Saved address */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Saved Addresses</h2>
              </div>
              <div className="p-5">
                {isAddingAddress || addressEditId ? (
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Address Type</label>
                      <select
                        value={addressData.type}
                        onChange={(e) => setAddressData({...addressData, type: e.target.value})}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="SHIPPING">Shipping</option>
                        <option value="BILLING">Billing</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Street Address</label>
                      <input
                        type="text"
                        required
                        value={addressData.street}
                        onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">City</label>
                        <input
                          type="text"
                          required
                          value={addressData.city}
                          onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">State</label>
                        <input
                          type="text"
                          required
                          value={addressData.state}
                          onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={addressData.postalCode}
                          onChange={(e) => setAddressData({...addressData, postalCode: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">Country</label>
                        <input
                          type="text"
                          required
                          value={addressData.country}
                          onChange={(e) => setAddressData({...addressData, country: e.target.value})}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" disabled={profileLoading} className="h-9 text-xs w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {profileLoading ? "Saving..." : "Save Address"}
                      </Button>
                      <Button type="button" onClick={() => { setIsAddingAddress(false); setAddressEditId(null); }} variant="outline" className="h-9 text-xs w-full">
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    {user.addresses && user.addresses.length > 0 ? (
                      user.addresses.map((address: any) => (
                        <div key={address.id} className="flex items-start justify-between p-4 rounded-lg border border-border bg-background mb-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <div className="text-sm text-muted-foreground leading-relaxed">
                              <p className="font-medium text-foreground mb-1">{address.type === "BILLING" ? "Billing Address" : "Shipping Address"}</p>
                              <p>{address.street}</p>
                              <p>{address.city}, {address.state} {address.postalCode}</p>
                              <p>{address.country}</p>
                            </div>
                          </div>
                          <button onClick={() => startEditAddress(address)} className="text-xs text-primary font-semibold hover:underline underline-offset-4">
                            Edit
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-4">No saved addresses</div>
                    )}
                    <button onClick={startAddAddress} className="mt-3 text-xs text-primary font-semibold hover:underline underline-offset-4 flex items-center gap-1">
                      + Add new address
                    </button>
                  </>
                )}
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
            onClick={handleSignOut}
            className="w-full rounded-full border-border text-muted-foreground gap-2"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

      </div>
    </div>
  );
}
