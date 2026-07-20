# Nature Nook Ecommerce Platform

Nature Nook is a premium B2B and B2C ecommerce platform specializing in 150+ standardized Ayurvedic powders, cosmetic herbs, and nutraceutical extracts. The platform is designed for lightning-fast performance, elegant aesthetics, and robust wholesale scalability.

## Tech Stack
* **Framework:** Next.js 16.2 (App Router, Turbopack)
* **UI & Styling:** React 19, TailwindCSS v4, shadcn/ui, Lucide React
* **Database & ORM:** SQLite (via `better-sqlite3`), Prisma ORM
* **Authentication:** Auth.js (NextAuth v5 beta) with Role-Based Access Control (RBAC)
* **Image Hosting:** Cloudinary
* **Search Engine:** `fuse.js` for algorithmic fuzzy searching
* **Email Delivery:** Resend API

## Core Features & Architecture

### 1. Hybrid Data & Content Management
* **Database Ingestion:** Products are ingested into SQLite via a custom parser (`import-csv-updated.ts`) reading from a master CSV file.
* **Cloudinary Integration:** All product images are securely hosted on Cloudinary, reducing the repository footprint and enabling optimized, CDN-backed image delivery via the Next.js `<Image>` component.
* **Fuzzy Search:** The catalogue utilizes `fuse.js` to search across Product Names, Scientific Names, Categories, and full Descriptions, providing a typo-tolerant, algorithmic search experience.

### 2. B2B Wholesale Architecture (Vendor Portal)
* **Role-Based Tenancy:** Users are assigned roles (`CUSTOMER`, `VENDOR`, `ADMIN`).
* **Dynamic Pricing:** The platform natively handles both MSRP (Retail) and Wholesale pricing tiers.
* **Vendor Portal (Coming Soon):** Dedicated routes (`/vendor`) act as an interception layer for wholesale buyers to apply for B2B accounts, which will eventually support bulk grid-ordering and purchase orders.

### 3. Contact & Enquiry System
* The `/find-us` page features a robust enquiry form.
* **Database Logging:** Enquiries are logged directly into the SQLite database (`EnquiryLog` model) saving metadata (Name, Email, Company, Phone, Type) for analytics while excluding the message body for privacy/storage efficiency.
* **Email Dispatch:** The full message body is routed through a Next.js Server Action and securely emailed to `sales@naturenook.co.in` via the **Resend API**. (Gracefully degrades to local logging if the API key is missing).

## Local Development

### Prerequisites
* Node.js v20+
* npm or pnpm

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your_super_secret_auth_key"
   RESEND_API_KEY="re_123456789..." # Required for email dispatch
   EMAIL_TO="sales@naturenook.co.in"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
* `src/app/`: Next.js App Router pages (Catalogue, Product Details, Auth, Checkout, etc.)
* `src/components/`: Reusable UI components (Banners, Carts, Forms)
* `src/lib/`: Core utilities (Prisma client, CSV Parsers)
* `prisma/`: Database schema and SQLite database file.
