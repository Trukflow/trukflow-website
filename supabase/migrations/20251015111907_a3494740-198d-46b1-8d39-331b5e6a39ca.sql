-- Create companies table for storing company details
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create policies for company access
CREATE POLICY "Companies can view their own details"
ON public.companies
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Companies can update their own details"
ON public.companies
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Companies can insert their own details"
ON public.companies
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_companies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_companies_timestamp
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_companies_updated_at();

-- Create function to handle new company user registration
CREATE OR REPLACE FUNCTION public.handle_new_company_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.companies (user_id, company_name, contact_email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'company_name', 'Unnamed Company'),
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger to auto-create company profile on signup
CREATE TRIGGER on_company_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_company_user();