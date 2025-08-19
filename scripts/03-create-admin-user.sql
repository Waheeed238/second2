-- Create an admin user (replace with your email)
-- First, sign up normally through the app, then run this script
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'admin@example.com'; -- Replace with your email

-- Alternatively, you can create a specific admin user
-- Make sure to replace the email with your actual email address
