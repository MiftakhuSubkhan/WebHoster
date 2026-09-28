import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmbidiflxypbsxnbicns.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYmlkaWZseHlwYnN4bmJpY25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NDQyODUsImV4cCI6MjEwNjEyMDI4NX0.zu29RzlcZI7EH3sFsAIJRwS13b6O8NPGw787DZn8zBs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("=== MEMERIKSA STATUS DATABASE SUPABASE ===");

  const { data: portfolios, error: portError } = await supabase.from("portfolios").select("*");
  console.log("Portofolio:", portError ? portError.message : `OK! (${portfolios.length} proyek tersimpan)`);

  const { data: leads, error: leadError } = await supabase.from("leads").select("*");
  console.log("Leads/Pesan:", leadError ? leadError.message : `OK! (${leads.length} pesan)`);

  const { data: templates, error: tplError } = await supabase.from("templates").select("*");
  console.log("Templates:", tplError ? tplError.message : `OK! (${templates.length} template)`);

  const { data: settings, error: setError } = await supabase.from("settings").select("*");
  console.log("Settings:", setError ? setError.message : `OK! (${settings.length} konfigurasi)`);
}

check();
