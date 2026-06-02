-- Create the courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON courses
    FOR SELECT USING (true);

-- Insert seed data
INSERT INTO courses (title, progress, icon_name)
VALUES
    ('Advanced React Patterns', 75, 'Code2'),
    ('Hardware-Accelerated CSS', 90, 'Cpu'),
    ('Database Design & Optimization', 45, 'Database'),
    ('Creative Motion Design', 60, 'Sparkles')
ON CONFLICT DO NOTHING;
