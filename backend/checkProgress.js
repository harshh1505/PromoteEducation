import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const { count, error } = await supabase
    .from("colleges")
    .select('*', { count: 'exact', head: true })
    .not('entrance_exam', 'is', null)

  if (error) {
    console.error(error)
  } else {
    console.log(`Updated count: ${count}`)
  }
}

run()
