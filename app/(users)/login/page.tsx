"use client"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <FieldSet>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Login</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to continue
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" placeholder="••••••••" />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </Field>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Button className="w-full sm:w-auto" type="submit">
                Login
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" type="button">
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}