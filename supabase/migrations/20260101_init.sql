-- AirAware AI: Supabase PostgreSQL Schema & Row Level Security (RLS) Policies
-- Migration: 20260101_init.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles & Household Settings
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.household_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    household_size INT DEFAULT 2,
    has_children BOOLEAN DEFAULT false,
    has_elderly BOOLEAN DEFAULT false,
    has_asthma_respiratory BOOLEAN DEFAULT false,
    has_heart_conditions BOOLEAN DEFAULT false,
    commute_mode TEXT DEFAULT 'transit', -- transit, car, bike, walk, remote
    daily_outdoor_hours NUMERIC(4, 1) DEFAULT 1.5,
    has_air_purifier BOOLEAN DEFAULT false,
    has_n95_masks BOOLEAN DEFAULT true,
    has_hepa_ac_filters BOOLEAN DEFAULT false,
    budget_tier TEXT DEFAULT 'low_cost', -- free, low_cost, moderate, premium
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_household UNIQUE (user_id)
);

-- 2. Saved Locations
CREATE TABLE IF NOT EXISTS public.saved_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI Chat Conversations & Messages
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Smog & Air Advisor Chat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Dynamic Daily Plans
CREATE TABLE IF NOT EXISTS public.daily_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    location_name TEXT NOT NULL,
    aqi_summary JSONB NOT NULL,
    actions JSONB NOT NULL, -- Array of actions: {id, time, recommendation, reason, alternative, priority, category, completed}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Impact Logs & Completed Actions
CREATE TABLE IF NOT EXISTS public.completed_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- 'transport', 'indoor', 'routine', 'waste', 'heating'
    action_title TEXT NOT NULL,
    co2_saved_kg NUMERIC(6, 2) DEFAULT 0.0,
    exposure_avoided_pct NUMERIC(5, 1) DEFAULT 0.0,
    is_user_reported BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Community Initiatives & Collective Progress
CREATE TABLE IF NOT EXISTS public.community_initiatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    participants_count INT DEFAULT 1,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_daily_plans_user_date ON public.daily_plans(user_id, date);
CREATE INDEX IF NOT EXISTS idx_completed_actions_user ON public.completed_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_locations_user ON public.saved_locations(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.household_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_initiatives ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only read/write their own records
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own household" ON public.household_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own household" ON public.household_settings FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own locations" ON public.saved_locations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own conversations" ON public.conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own messages" ON public.chat_messages FOR ALL USING (
    EXISTS (SELECT 1 FROM public.conversations WHERE id = chat_messages.conversation_id AND user_id = auth.uid())
);

CREATE POLICY "Users can manage own daily plans" ON public.daily_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own completed actions" ON public.completed_actions FOR ALL USING (auth.uid() = user_id);

-- Community initiatives are publicly viewable by authenticated users
CREATE POLICY "Anyone can view community initiatives" ON public.community_initiatives FOR SELECT TO authenticated USING (true);
