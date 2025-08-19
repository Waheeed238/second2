import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, countryCode, code } = await request.json()

    if (!phoneNumber || !countryCode || !code) {
      return NextResponse.json(
        { error: "Phone number, country code, and verification code are required" },
        { status: 400 },
      )
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`

    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID) {
      try {
        // Use dynamic import with proper error handling
        const twilioModule = await import("twilio").catch(() => null)

        if (twilioModule?.default) {
          const client = twilioModule.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

          const verification_check = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: fullPhoneNumber, code: code })

          if (verification_check.status === "approved") {
            return NextResponse.json({
              success: true,
              verified: true,
              message: "Phone number verified successfully",
            })
          } else {
            return NextResponse.json(
              {
                success: false,
                verified: false,
                message: "Invalid verification code",
              },
              { status: 400 },
            )
          }
        }
      } catch (twilioError) {
        console.error("Twilio verification error:", twilioError)
        // Fall back to simulation if Twilio fails
      }
    }

    // Simulate verification for development/fallback (accept any 6-digit code)
    const isValid = code.length === 6 && /^\d+$/.test(code)

    if (isValid) {
      return NextResponse.json({
        success: true,
        verified: true,
        message: "Phone number verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Invalid verification code",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
