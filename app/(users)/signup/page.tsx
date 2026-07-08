"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { z } from "zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const signupSchema = z
  .object({
    fullname: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    contact: z.string().min(7, "Contact number is too short"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupForm = z.infer<typeof signupSchema>

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value } as SignupForm))
  }

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const result = signupSchema.safeParse(form)

  if (!result.success) {
    const fieldErrors: Partial<Record<keyof SignupForm, string>> = {}
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]
      if (typeof field === "string" && field in form) {
        fieldErrors[field as keyof SignupForm] = issue.message
      }
    })

    setErrors(fieldErrors)
    return
  }

  setErrors({})

  //  API CALL (NEW PART)
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })

  const data = await res.json()

  if (res.ok) {
    alert("Signup successful")
  } else {
    alert(data.message || "Something went wrong")
  }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <FieldSet>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Sign Up</h1>
            <p className="mt-2 text-sm text-slate-500">
              Create your account to get started
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input
                id="fullname"
                type="text"
                placeholder="John Doe"
                value={form.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <FieldError>{errors.fullname}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="contact">Contact Number</FieldLabel>
              <Input
                id="contact"
                type="tel"
                placeholder="9818172238"
                value={form.contact}
                onChange={handleChange}
              />
              <FieldDescription>
                We will use this only for account-related updates.
              </FieldDescription>
              {errors.contact && <FieldError>{errors.contact}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
            </Field>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Button className="w-full sm:w-auto" type="submit">
                Create Account
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" type="button">
                Cancel
              </Button>
            </div>

            <p className="pt-3 text-center text-sm text-slate-600">
              Already a member?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
