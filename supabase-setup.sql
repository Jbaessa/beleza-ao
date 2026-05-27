-- ============================================================
-- BELEZA.AO — Database Schema
-- Run in Supabase SQL Editor: app.supabase.com → SQL Editor
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For full-text search

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('client', 'partner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'premium', 'elite');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');

-- ============================================================
-- 1. USERS (extends Supabase auth.users)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'client',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. CATEGORIES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  color TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. SALONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.salons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  instagram TEXT,
  address TEXT NOT NULL,
  neighborhood TEXT,
  city TEXT NOT NULL DEFAULT 'Luanda',
  province TEXT NOT NULL DEFAULT 'Luanda',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  cover_image_url TEXT,
  logo_url TEXT,
  rating DECIMAL(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  subscription_plan subscription_plan NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full text search index
CREATE INDEX IF NOT EXISTS salons_search_idx ON public.salons USING GIN (
  to_tsvector('portuguese', name || ' ' || COALESCE(description, '') || ' ' || city)
);

-- ============================================================
-- 4. SALON IMAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.salon_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. SERVICES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id),
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,       -- minutes
  price DECIMAL(10, 2) NOT NULL,
  price_max DECIMAL(10, 2),        -- for price range display
  is_active BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. PROFESSIONALS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  avatar_url TEXT,
  specialties TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 7. WORKING HOURS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.working_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun, 6=Sat
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(salon_id, day_of_week)
);

-- ============================================================
-- 8. BLOCKED SLOTS (holidays, breaks, etc.)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id),
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 9. BOOKINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id),
  salon_id UUID NOT NULL REFERENCES public.salons(id),
  service_id UUID NOT NULL REFERENCES public.services(id),
  professional_id UUID REFERENCES public.professionals(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration INTEGER NOT NULL,       -- minutes (snapshot at booking time)
  price DECIMAL(10, 2) NOT NULL,   -- snapshot at booking time
  status booking_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bookings_salon_date_idx ON public.bookings(salon_id, booking_date);
CREATE INDEX IF NOT EXISTS bookings_client_idx ON public.bookings(client_id);

-- ============================================================
-- 10. REVIEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id),
  salon_id UUID NOT NULL REFERENCES public.salons(id),
  booking_id UUID UNIQUE REFERENCES public.bookings(id),
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  reply TEXT,
  replied_at TIMESTAMPTZ,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_flagged BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 11. FAVORITES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(client_id, salon_id)
);

-- ============================================================
-- 12. NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_idx ON public.notifications(user_id, is_read);

-- ============================================================
-- 13. SUBSCRIPTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 14. FEATURED SALONS (paid spotlight)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.featured_salons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID NOT NULL REFERENCES public.salons(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.working_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_salons ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ POLICIES
-- ============================================================

CREATE POLICY "public_read_categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_salons" ON public.salons FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_salon_images" ON public.salon_images FOR SELECT USING (true);
CREATE POLICY "public_read_services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_professionals" ON public.professionals FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_working_hours" ON public.working_hours FOR SELECT USING (true);
CREATE POLICY "public_read_reviews" ON public.reviews FOR SELECT USING (is_visible = true AND is_flagged = false);
CREATE POLICY "public_read_featured_salons" ON public.featured_salons FOR SELECT USING (ends_at > NOW());

-- ============================================================
-- USER POLICIES
-- ============================================================

CREATE POLICY "users_read_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "bookings_client_read" ON public.bookings FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "bookings_client_insert" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "bookings_client_cancel" ON public.bookings FOR UPDATE USING (auth.uid() = client_id AND status IN ('pending', 'confirmed'));

CREATE POLICY "reviews_client_insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "reviews_client_update" ON public.reviews FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "favorites_own" ON public.favorites FOR ALL USING (auth.uid() = client_id);

CREATE POLICY "notifications_own" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- PARTNER POLICIES
-- ============================================================

CREATE POLICY "salons_partner_manage" ON public.salons FOR ALL
  USING (auth.uid() = owner_id);

CREATE POLICY "services_partner_manage" ON public.services FOR ALL
  USING (EXISTS (SELECT 1 FROM public.salons WHERE id = services.salon_id AND owner_id = auth.uid()));

CREATE POLICY "professionals_partner_manage" ON public.professionals FOR ALL
  USING (EXISTS (SELECT 1 FROM public.salons WHERE id = professionals.salon_id AND owner_id = auth.uid()));

CREATE POLICY "working_hours_partner_manage" ON public.working_hours FOR ALL
  USING (EXISTS (SELECT 1 FROM public.salons WHERE id = working_hours.salon_id AND owner_id = auth.uid()));

CREATE POLICY "blocked_slots_partner_manage" ON public.blocked_slots FOR ALL
  USING (EXISTS (SELECT 1 FROM public.salons WHERE id = blocked_slots.salon_id AND owner_id = auth.uid()));

CREATE POLICY "bookings_salon_read" ON public.bookings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.salons WHERE id = bookings.salon_id AND owner_id = auth.uid()));

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER salons_updated_at BEFORE UPDATE ON public.salons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Recalculate salon rating on review insert/update
CREATE OR REPLACE FUNCTION recalculate_salon_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.salons
  SET
    rating = (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM public.reviews WHERE salon_id = NEW.salon_id AND is_visible = true),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE salon_id = NEW.salon_id AND is_visible = true)
  WHERE id = NEW.salon_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_salon_rating
  AFTER INSERT OR UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION recalculate_salon_rating();

-- ============================================================
-- SEED: Categories
-- ============================================================

INSERT INTO public.categories (name, slug, description, icon, color, order_index) VALUES
  ('Cabelo', 'cabelo', 'Cortes, coloração, alisamento e tratamentos capilares', 'Scissors', '#D4AF37', 1),
  ('Unhas & Manicure', 'unhas', 'Manicure, pedicure, nail art e gel', 'Hand', '#E879A0', 2),
  ('Spa & Relaxamento', 'spa', 'Tratamentos de relaxamento e bem-estar', 'Flower2', '#34D399', 3),
  ('Maquiagem', 'maquiagem', 'Maquiagem profissional para todos os eventos', 'Star', '#A78BFA', 4),
  ('Sobrancelhas', 'sobrancelhas', 'Design, depilação e micropigmentação de sobrancelhas', 'Eye', '#FB923C', 5),
  ('Massagem', 'massagem', 'Massagens terapêuticas e relaxantes', 'Activity', '#60A5FA', 6),
  ('Depilação', 'depilacao', 'Depilação a cera, laser e outros métodos', 'Sun', '#F472B6', 7),
  ('Estética Facial', 'estetica', 'Tratamentos faciais, peelings e estética avançada', 'Sparkles', '#FCD34D', 8),
  ('Cuidados da Pele', 'cuidados-pele', 'Hidratação, limpeza e cuidados da pele', 'Heart', '#F9A8D4', 9),
  ('Outros Serviços', 'outros', 'Outros tratamentos de beleza e bem-estar', 'Zap', '#818CF8', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Run these separately in Supabase Dashboard → Storage

-- INSERT INTO storage.buckets (id, name, public) VALUES ('salon-images', 'salon-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('salon-logos', 'salon-logos', true);
