-- Add show_text_overlay column to projects table
ALTER TABLE public.projects 
ADD COLUMN show_text_overlay boolean NOT NULL DEFAULT true;