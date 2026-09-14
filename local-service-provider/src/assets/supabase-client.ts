import {createClient} from '@supabase/supabase-js';

const supabaseUrl = "https://mwalbvphsbxuohcdlzag.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YWxidnBoc2J4dW9oY2RsemFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyNzA0MjQsImV4cCI6MjEwNDg0NjQyNH0.JjpPGZNWLRg2WU6E4gKpyDybCHbMACdOx5tXppWIETE";

export const supabase = createClient(supabaseUrl,supabaseKey);