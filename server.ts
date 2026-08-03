import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

async function startServer() {
  // Triggering a fresh build artifact for deployment.
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Support parsing JSON and URL-encoded request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Contact form inquiry destination handler
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, discoverSource, otherSource, message } = req.body;

      if (!firstName || !lastName || !email || !phone || !discoverSource) {
        res.status(400).json({ error: "First name, last name, email, phone, and how you heard about us are required." });
        return;
      }

      const fullName = `${firstName} ${lastName}`.trim();
      const discover = (discoverSource === 'Other (please specify)' && otherSource)
        ? `Other: ${otherSource}`
        : discoverSource;
      const safeMessage = (message && String(message).trim()) ? String(message) : 'No message provided.';

      console.log(`[Contact Inquiry Received]
=========================================
Name: ${fullName}
Email: ${email}
Phone: ${phone}
How did you discover Naviter Wealth?: ${discover}
Message: ${safeMessage}
=========================================`);

      // ---- Build the formatted HTML email template ----
      const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' });
      const row = (label: string, value: string) => `
            <tr>
              <td style="padding:12px 16px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#0b2545;width:230px;vertical-align:top;">${label}</td>
              <td style="padding:12px 16px;border:1px solid #e2e8f0;color:#1e293b;">${value}</td>
            </tr>`;
      const html = `
      <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
        <div style="background:#0b2545;padding:24px 28px;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-family:Georgia,serif;">Naviter Wealth</h1>
          <p style="margin:6px 0 0;color:#9ec3e6;font-size:12px;letter-spacing:1.5px;">NEW CONTACT INQUIRY — REQUEST A CONVERSATION</p>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px;padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;color:#475569;">A new inquiry was submitted through the website contact form.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row('First Name', esc(firstName))}
            ${row('Last Name', esc(lastName))}
            ${row('Email', `<a href="mailto:${esc(email)}" style="color:#154372;">${esc(email)}</a>`)}
            ${row('Phone', `<a href="tel:${esc(phone)}" style="color:#154372;">${esc(phone)}</a>`)}
            ${row('How did you discover Naviter Wealth?', esc(discover))}
            ${row('Message', `<span style="white-space:pre-wrap;">${esc(safeMessage)}</span>`)}
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Submitted: ${esc(submittedAt)} (CT)</p>
        </div>
      </div>`;
      const subject = `New Contact Inquiry from ${fullName}`;

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: 'RESEND_API_KEY' is not configured. Submission logged only (no email sent).");
        res.json({ success: true, simulated: true });
        return;
      }

      const clean = (s: string) => s.trim().replace(/^['"]|['"]$/g, '');
      const fromEmail = clean(process.env.RESEND_FROM_EMAIL || '') || "onboarding@resend.dev";
      const fromString = `Naviter Wealth <${fromEmail}>`;
      const parseList = (raw: string | undefined, fallback: string[]) => {
        if (!raw) return fallback;
        const arr = raw.split(",").map(clean).filter(Boolean);
        return arr.length ? arr : fallback;
      };
      //Notification 1: Naviter admin team.  Notification 2: Graham Media Partners.
      const adminTo = parseList(process.env.CONTACT_DESTINATION_EMAILS, [
        "team@naviterwealth.com",
        "bblackmon@naviterwealth.com",
        "jkornet@naviterwealth.com",
        "jbauer@naviterwealth.com",
      ]);
      

      
      const sendEmail = async (to: string[]) => {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
          body: JSON.stringify({ from: fromString, to, reply_to: email, subject, html }),
        });
        const data = await r.json().catch(() => null);
        if (!r.ok) console.error("Resend API error for", to.join(", "), data);
        return { ok: r.ok, data };
      };

      const results = await Promise.all([sendEmail(adminTo), sendEmail(grahamTo)]);
      if (results.every(r => !r.ok)) {
        const first: any = results[0].data;
        const msg = (first && (first.message || first.error?.message)) || "Email delivery failed.";
        res.status(400).json({ error: `Email delivery failure: ${msg}` });
        return;
      }

      console.log(`Contact inquiry emailed. admin=[${adminTo.join(", ")}] graham=[${grahamTo.join(", ")}]`);
      res.json({ success: true, emailSent: true });
    } catch (error) {
      console.error("Error in /api/contact endpoint:", error);
      res.status(500).json({ error: "Encountered an internal server error while processing contact submission." });
    }
  });

  // Affiliate / "Join Naviter" form handler
  app.post("/api/join", async (req, res) => {
    try {
      const { firstName, lastName, companyName, email, phone, message } = req.body;

      if (!firstName || !email || !phone) {
        res.status(400).json({ error: "First name, email, and phone are required." });
        return;
      }

      const fullName = `${firstName || ''} ${lastName || ''}`.trim();
      const safeMessage = (message && String(message).trim()) ? String(message) : 'No message provided.';

      console.log(`[Affiliate Program Inquiry]
=========================================
Name: ${fullName}
Company: ${companyName || 'N/A'}
Email: ${email}
Phone: ${phone}
Message: ${safeMessage}
=========================================`);

      const esc = (s: any) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'short' });
      const row = (label: string, value: string) => `
            <tr>
              <td style="padding:12px 16px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#0b2545;width:200px;vertical-align:top;">${label}</td>
              <td style="padding:12px 16px;border:1px solid #e2e8f0;color:#1e293b;">${value}</td>
            </tr>`;
      const html = `
      <div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
        <div style="background:#0b2545;padding:24px 28px;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-family:Georgia,serif;">Naviter Wealth</h1>
          <p style="margin:6px 0 0;color:#9ec3e6;font-size:12px;letter-spacing:1.5px;">NEW AFFILIATE PROGRAM INQUIRY — JOIN NAVITER</p>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px;padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;color:#475569;">A new affiliate/partner inquiry was submitted through the Join Naviter form.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row('First Name', esc(firstName))}
            ${row('Last Name', esc(lastName || 'Not provided'))}
            ${row('Company Name', esc(companyName || 'Not provided'))}
            ${row('Email', `<a href="mailto:${esc(email)}" style="color:#154372;">${esc(email)}</a>`)}
            ${row('Phone', `<a href="tel:${esc(phone)}" style="color:#154372;">${esc(phone)}</a>`)}
            ${row('Message', `<span style="white-space:pre-wrap;">${esc(safeMessage)}</span>`)}
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Submitted: ${esc(submittedAt)} (CT)</p>
        </div>
      </div>`;
      const subject = `New Affiliate Program Inquiry from ${fullName || email}`;

      // --- Add the lead to Mailchimp (best effort; never blocks the form) ---
      try {
        const mcKey = process.env.MAILCHIMP_API_KEY;
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        if (mcKey && audienceId) {
          const dc = mcKey.split("-")[1]; // data center, e.g. "us21"
          if (!dc) {
            console.warn("Mailchimp: API key is missing its data-center suffix (e.g. -us21).");
          } else {
            const hash = crypto.createHash("md5").update(String(email).toLowerCase()).digest("hex");
            const auth = "Basic " + Buffer.from("anystring:" + mcKey).toString("base64");
            const memberUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hash}`;
            // Upsert the subscriber (adds new or updates existing) with double opt-in OFF
            const mcRes = await fetch(memberUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/json", "Authorization": auth },
              body: JSON.stringify({
                email_address: email,
                status_if_new: "subscribed",
                merge_fields: { FNAME: firstName || "", LNAME: lastName || "" },
              }),
            });
            if (mcRes.ok) {
              // Apply the "Subscribed From Website" tag
              await fetch(memberUrl + "/tags", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": auth },
                body: JSON.stringify({ tags: [{ name: "Subscribed From Website", status: "active" }] }),
              }).catch(() => null);
              console.log(`Mailchimp: subscribed ${email} to audience ${audienceId}`);
            } else {
              const mcErr = await mcRes.json().catch(() => null);
              console.error("Mailchimp subscribe failed:", mcErr);
            }
          }
        }
      } catch (mcErr) {
        console.error("Mailchimp error (non-blocking):", mcErr);
      }

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: 'RESEND_API_KEY' is not configured. Affiliate submission logged only (no email sent).");
        res.json({ success: true, simulated: true });
        return;
      }

      const clean = (s: string) => s.trim().replace(/^['"]|['"]$/g, '');
      const fromEmail = clean(process.env.RESEND_FROM_EMAIL || '') || "onboarding@resend.dev";
      const fromString = `Naviter Wealth <${fromEmail}>`;
      const parseList = (raw: string | undefined, fallback: string[]) => {
        if (!raw) return fallback;
        const arr = raw.split(",").map(clean).filter(Boolean);
        return arr.length ? arr : fallback;
      };
      // Recipients for the Join Naviter / affiliate form (override via JOIN_DESTINATION_EMAILS).
      const joinTo = parseList(process.env.JOIN_DESTINATION_EMAILS, [
        "team@naviterwealth.com",
        "bblackmon@naviterwealth.com",
        "jkornet@naviterwealth.com",
        "jbauer@naviterwealth.com",
        "emilie@grahammediapartners.com",
      ]);

      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({ from: fromString, to: joinTo, reply_to: email, subject, html }),
      });
      const data: any = await r.json().catch(() => null);
      if (!r.ok) {
        console.error("Resend API error (join):", data);
        const msg = (data && (data.message || data.error?.message)) || "Email delivery failed.";
        res.status(400).json({ error: `Email delivery failure: ${msg}` });
        return;
      }

      console.log(`Affiliate inquiry emailed to [${joinTo.join(", ")}]`);
      res.json({ success: true, emailSent: true });
    } catch (error) {
      console.error("Error in /api/join endpoint:", error);
      res.status(500).json({ error: "Encountered an internal server error while processing your request." });
    }
  });

  // Proxy API for articles
  app.get("/api/proxy-slides-pdf", async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ error: "Google Slide Presentation ID is required." });
        return;
      }
      const presentationId = String(id).trim();
      const pdfExportUrl = presentationId.startsWith("2PACX-")
        ? `https://docs.google.com/presentation/d/e/${presentationId}/pub?format=pdf`
        : `https://docs.google.com/presentation/d/${presentationId}/export/pdf`;
      console.log(`[Google Slides PDF Proxy] Fetching ${pdfExportUrl}`);
      
      const response = await fetch(pdfExportUrl);
      if (!response.ok) {
        throw new Error(`Google Slides returned status ${response.status}: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      res.setHeader("Content-Type", "application/pdf");
      res.send(Buffer.from(arrayBuffer));
    } catch (error: any) {
      console.error("Error in /api/proxy-slides-pdf:", error);
      res.status(500).json({ error: error.message || "Failed to fetch PDF proxy from Google Slides" });
    }
  });

  // Proxy API for articles
  app.get("/api/sync-articles", async (req, res) => {
    try {
      // In a real app, this would fetch from WordPress REST API
      // Here, demonstrating proxy capability by mocking or fetching
      const response = await fetch("https://naviterwealth.com/wp-json/wp/v2/posts?per_page=50&_embed");
      const articles = await response.json();
      
      const mappedArticles = articles.map((article: any) => {
          const terms = article._embedded?.['wp:term'] || [];
          const tags = terms.flat().map((term: any) => term.name);
          return {
            id: article.id,
            title: article.title.rendered.replace(/<[^>]*>?/gm, ''),
            type: 'INSIGHT',
            date: new Date(article.date).toLocaleDateString(),
            readTime: '5 min read',
            image: article._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            tags: tags,
          };
      });
      
      res.json(mappedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to sync articles" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
