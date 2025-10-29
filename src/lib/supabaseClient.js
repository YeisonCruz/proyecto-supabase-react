import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://icnvrzgtdkkqcvbojebh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljbnZyemd0ZGtrcWN2Ym9qZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NTk3MTcsImV4cCI6MjA3NjIzNTcxN30.f004MVl-DMK8VCKbnxcCteibFBOuLGqJRQmvc1HsDf8'

export const supabase = createClient(supabaseUrl, supabaseKey)
