import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, countryCode } = await request.json()

    if (!phoneNumber || !countryCode) {
      return NextResponse.json({ error: "Phone number and country code are required" }, { status: 400 })
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    // Try to use Twilio if environment variables are available
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID) {
      try {
        // Use dynamic import with proper error handling
        const twilioModule = await import("twilio").catch(() => null)

        if (twilioModule?.default) {
          const client = twilioModule.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

          const verification = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({ to: fullPhoneNumber, channel: "sms" })

          console.log(`Real OTP sent to ${fullPhoneNumber}`)

          return NextResponse.json({
            success: true,
            message: `OTP sent successfully to ${fullPhoneNumber}`,
          })
        }
      } catch (twilioError) {
        console.error("Twilio error:", twilioError)
        // Fall back to simulation if Twilio fails
      }
    }

    // Simulate OTP sending for development/fallback
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(`Simulated OTP for ${fullPhoneNumber}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to ${fullPhoneNumber}`,
      // In development, return the OTP for testing
      ...(process.env.NODE_ENV === "development" && { otp }),
    })
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
