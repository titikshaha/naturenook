"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function submitEnquiry(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const companyName = (formData.get("companyName") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const type = formData.get("type") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !type || !message) {
      return { success: false, error: "Missing required fields." };
    }

    // 1. Log the Enquiry to SQLite (Metadata only, intentionally excluding message body)
    await prisma.enquiryLog.create({
      data: {
        name,
        email,
        companyName,
        phone,
        type,
      },
    });

    // 2. Send the Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const toEmail = process.env.EMAIL_TO || "sales@naturenook.co.in";
      const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev"; // Default Resend test domain

      await resend.emails.send({
        from: `Nature Nook Enquiries <${fromEmail}>`,
        to: [toEmail],
        subject: `New Enquiry (${type}) from ${name}`,
        text: `
You have received a new enquiry from the website.

Name: ${name}
Email: ${email}
Company: ${companyName || "N/A"}
Phone: ${phone || "N/A"}
Type: ${type}

Message:
${message}
        `,
      });
      console.log("Email sent successfully via Resend.");
    } else {
      console.warn("RESEND_API_KEY is missing. Enquiry logged to database, but email was skipped.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error processing enquiry:", error);
    return { success: false, error: "An internal server error occurred." };
  }
}
