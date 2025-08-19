"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { signUp } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#f8b681] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
    >
      <span className="truncate">{pending ? "Creating account..." : "Sign Up"}</span>
    </button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">Create an Account</p>
      </div>

      <form action={formAction}>
        {state?.error && (
          <div className="mx-4 mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="mx-4 mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {state.success}
          </div>
        )}

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">Email</p>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
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
              minLength={6}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8a7360] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#181411] text-base font-medium leading-normal pb-2">Confirm Password</p>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              minLength={6}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8a7360] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        <div className="flex px-4 py-3">
          <SubmitButton />
        </div>

        <p className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Already have an account?
        </p>
        <p className="text-[#8a7360] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
          <Link href="/auth/login" className="hover:text-[#181411]">
            Log In
          </Link>
        </p>
      </form>
    </>
  )
}
