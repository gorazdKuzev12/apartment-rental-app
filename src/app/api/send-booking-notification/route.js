import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

// Load environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;

sendgrid.setApiKey(sendgridApiKey);

export async function POST(request) {
  const formData = await request.json();

  const message = {
    to: "kralcekuzev@yahoo.com", // Your email address
    from: "gorazd.kuzev10@gmail.com", // Use the email address or domain you verified with SendGrid
    templateId: "d-37b0d54ae0ef46d19752d7abfd743c88", // Replace with your actual template ID
    dynamic_template_data: {
      name: formData.name,
      email: formData.email,
      checkIn: new Date(formData.checkIn).toLocaleDateString(),
      checkOut: new Date(formData.checkOut).toLocaleDateString(),
      question: formData.question,
    },
  };

  // Log the message object to verify its contents
  console.log("Sending email with payload:", message);

  try {
    await sendgrid.send(message);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response ? error.response.body : error
    );
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
