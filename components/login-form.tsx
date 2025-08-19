"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#f8b681] text-[#181411] text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
    >
      <span className="truncate">{pending ? "Signing in..." : "Login"}</span>
    </button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard")
    }
  }, [state, router])

  return (
    <>
      <h2 className="text-[#181411] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Welcome back
      </h2>

      <form action={formAction}>
        {state?.error && (
          <div className="mx-4 mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {state.error}
          </div>
        )}

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">Email or Username</p>
            <input
              name="email"
              type="email"
              placeholder="Enter your email or username"
              required
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8a7360] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">Password</p>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8a7360] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        <p className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">
          <Link href="#" className="hover:text-[#181411]">
            Forgot Password?
          </Link>
        </p>

        <div className="flex px-4 py-3">
          <SubmitButton />
        </div>

        <p className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
          <Link href="/auth/sign-up" className="hover:text-[#181411]">
            Don't have an account? Sign up
          </Link>
        </p>
      </form>
    </>
  )
}
