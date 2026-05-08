-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    is_creator BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    balance NUMERIC DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. VIDEOS
CREATE TYPE video_category AS ENUM ('serie', 'court-metrage');

CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT, -- Encrypted storage ref
    category video_category NOT NULL,
    price NUMERIC DEFAULT 0 CHECK (price >= 0),
    duration_minutes INTEGER CHECK (duration_minutes >= 0),
    views_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PURCHASES
CREATE TYPE payment_method_type AS ENUM ('mobile_money', 'card', 'wallet');
CREATE TYPE payment_status_type AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    price_paid NUMERIC NOT NULL CHECK (price_paid >= 0),
    payment_method payment_method_type NOT NULL,
    payment_status payment_status_type DEFAULT 'pending',
    transaction_ref TEXT UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. WATCHLIST
CREATE TABLE watchlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, video_id)
);

-- 5. WATCH_HISTORY
CREATE TABLE watch_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    watch_duration_seconds INTEGER DEFAULT 0,
    UNIQUE(user_id, video_id)
);

-- INDEXES for performance
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_published ON videos(is_published) WHERE is_published = true;
CREATE INDEX idx_purchases_user_video ON purchases(user_id, video_id);
CREATE INDEX idx_watch_history_user ON watch_history(user_id);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Videos
CREATE POLICY "Published videos are viewable by everyone" ON videos FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all videos" ON videos FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Purchases
CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);

-- Watchlist
CREATE POLICY "Users can manage own watchlist" ON watchlist FOR ALL USING (auth.uid() = user_id);

-- Watch History
CREATE POLICY "Users can manage own history" ON watch_history FOR ALL USING (auth.uid() = user_id);
