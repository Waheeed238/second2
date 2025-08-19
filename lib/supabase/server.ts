import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Helper function to create a mock query builder with proper chaining
function createMockQueryBuilder() {
  const mockResult = { data: [], error: null }
  const mockSingleResult = { data: null, error: null }
  
  const chainableMethods = {
    eq: () => Promise.resolve(mockResult),
    single: () => Promise.resolve(mockSingleResult),
    order: () => chainableMethods,
  }
  
  return chainableMethods
}

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.SUPABASE_ANON_KEY === "string" &&
  process.env.SUPABASE_ANON_KEY.length > 0

export function createClient() {
  if (!isSupabaseConfigured) {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
      from: () => ({
        select: () => createMockQueryBuilder(),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    }
  }

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
}

export const supabaseAdmin =
  isSupabaseConfigured && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    : {
        from: () => ({
          select: () => ({
            order: () => ({
              eq: () => Promise.resolve({ data: [], error: null }),
              single: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          insert: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          update: () => ({
            eq: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }

export function getSupabaseClient() {
  return createClient()
}
