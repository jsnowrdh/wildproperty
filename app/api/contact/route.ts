import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactRequestBody {
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  message?: string;
  listingTitle?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const { buyerName, buyerEmail, buyerPhone, message, listingTitle } = body;

    if (
      !buyerName?.trim() ||
      !buyerEmail?.trim() ||
      !buyerPhone?.trim() ||
      !message?.trim() ||
      !listingTitle?.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(buyerEmail.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "WildProperty <hello@wildproperty.org>",
      to: "jsnowrdh@gmail.com",
      subject: `New Inquiry: ${listingTitle.trim()}`,
      text: [
        "New listing inquiry from WildProperty.org",
        "",
        `Listing: ${listingTitle.trim()}`,
        "",
        `Name: ${buyerName.trim()}`,
        `Email: ${buyerEmail.trim()}`,
        `Phone: ${buyerPhone.trim()}`,
        "",
        "Message:",
        message.trim(),
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
