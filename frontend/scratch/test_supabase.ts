
import 'dotenv/config'
import { supabase } from '../src/lib/supabase'

async function testSupabase() {
  console.log('Testing Supabase connection...')
  try {
    const { data, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('Error fetching articles:', error.message)
      if (error.message.includes('relation "public.articles" does not exist')) {
        console.log('TIP: The "articles" table is missing. You need to create it in your Supabase dashboard.')
      } else if (error.code === '42501') {
        console.log('TIP: Permission denied. Check your Row Level Security (RLS) policies.')
      }
    } else {
      console.log(`Connection successful! Total articles in DB: ${count}`)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testSupabase()
