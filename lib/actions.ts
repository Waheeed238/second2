"use server"

import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

const getSupabaseAdmin = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase configuration missing")
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// Sign in action
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    redirect("/")
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign up action
export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.toString().length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email: email.toString(),
      password: password.toString(),
      email_confirm: true,
    })

    if (signUpError) {
      return { error: signUpError.message }
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (signInError) {
      return { error: signInError.message }
    }

    redirect("/")
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Sign out action
export async function signOut() {
  try {
    const supabase = getSupabaseAdmin()
    await supabase.auth.signOut()
    redirect("/auth/login")
  } catch (error) {
    console.error("Sign out error:", error)
    redirect("/auth/login")
  }
}

export async function makeUserAdmin(email: string) {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("profiles").update({ is_admin: true }).eq("email", email)

    if (error) {
      console.error("Error making user admin:", error)
      return { error: error.message }
    }

    return { success: "User is now an admin" }
  } catch (error) {
    console.error("Error making user admin:", error)
    return { error: "An unexpected error occurred" }
  }
}
