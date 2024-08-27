import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qjlygykfprqqmrdjrkvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbHlneWtmcHJxcW1yZGpya3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjEyNjksImV4cCI6MjAzODQzNzI2OX0.5QY2wQoD3j_qfL_hzX-G6xNU4R0ORQrodkRj8Up9jHI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;