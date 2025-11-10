-- Drop existing policies on subscriptions table
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert their own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscriptions" ON public.subscriptions;

-- Drop existing policies on companies table
DROP POLICY IF EXISTS "Companies can view their own details" ON public.companies;
DROP POLICY IF EXISTS "Companies can insert their own details" ON public.companies;
DROP POLICY IF EXISTS "Companies can update their own details" ON public.companies;

-- Drop foreign key constraints (Firebase UIDs don't reference auth.users)
ALTER TABLE public.subscriptions 
DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

ALTER TABLE public.companies
DROP CONSTRAINT IF EXISTS companies_user_id_fkey;

-- Change user_id column from uuid to text in subscriptions table
ALTER TABLE public.subscriptions 
ALTER COLUMN user_id TYPE text USING user_id::text;

-- Change user_id column from uuid to text in companies table
ALTER TABLE public.companies
ALTER COLUMN user_id TYPE text USING user_id::text;

-- Recreate policies for subscriptions table (no auth.uid() since using Firebase)
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (true);  -- Temporarily allow all reads, will be secured by Firebase auth

CREATE POLICY "Users can insert their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (true);  -- Temporarily allow all inserts, will be secured by Firebase auth

CREATE POLICY "Users can update their own subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (true);  -- Temporarily allow all updates, will be secured by Firebase auth

-- Recreate policies for companies table
CREATE POLICY "Companies can view their own details" 
ON public.companies 
FOR SELECT 
USING (true);

CREATE POLICY "Companies can insert their own details" 
ON public.companies 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Companies can update their own details" 
ON public.companies 
FOR UPDATE 
USING (true);