import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in .env file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function run() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in env variables.')
    process.exit(1)
  }

  console.log(`Checking if user ${email} already exists...`)
  
  // Try to find the user
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) {
    console.error('Error listing users:', listError)
    process.exit(1)
  }

  let user = users.find(u => u.email === email)
  let userId = user?.id

  if (!user) {
    console.log(`Creating user ${email}...`)
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: 'Admin' }
    })

    if (createError) {
      console.error('Error creating user:', createError)
      process.exit(1)
    }

    user = newUser.user
    userId = user.id
    console.log(`User created successfully with ID: ${userId}`)
  } else {
    console.log(`User already exists with ID: ${userId}. Updating password...`)
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password: password
    })
    if (updateError) {
      console.error('Error updating password:', updateError)
      process.exit(1)
    }
    console.log('Password updated successfully.')
  }

  // Update profile role to 'admin'
  console.log(`Updating profile for ${userId} to role 'admin'...`)
  
  // Check if profile exists
  const { data: profile, error: profileGetError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileGetError && profileGetError.code !== 'PGRST116') { // PGRST116 is single row not found
    console.error('Error checking profile:', profileGetError)
    process.exit(1)
  }

  if (!profile) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        full_name: 'Admin',
        role: 'admin'
      })
    if (insertError) {
      console.error('Error inserting profile:', insertError)
      process.exit(1)
    }
  } else {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        role: 'admin',
        full_name: 'Admin'
      })
      .eq('id', userId)
    if (updateError) {
      console.error('Error updating profile:', updateError)
      process.exit(1)
    }
  }

  console.log(`SUCCESS: Admin account ${email} is fully configured!`)
}

run()
