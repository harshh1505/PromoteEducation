import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function run() {
  console.log('Querying existing tables in the database...')
  
  // We can query pg_tables to get the list of tables
  const { data, error } = await supabase.rpc('get_tables') // Let's check if we can run custom SQL or check if articles exists
  
  // If no RPC exists, let's try to query several common tables to see which ones fail
  const testTables = ['colleges', 'exams', 'reviews', 'profiles', 'leads', 'articles', 'news_articles', 'blogs']
  
  for (const table of testTables) {
    const { error: err } = await supabase.from(table).select('id').limit(1)
    if (err) {
      console.log(`❌ Table '${table}' failed:`, err.message)
    } else {
      console.log(`✅ Table '${table}' exists and is accessible.`)
    }
  }
}

run()
