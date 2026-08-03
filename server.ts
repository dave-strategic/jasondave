import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  // Triggering a fresh build artifact for deployment.
  const app = express();
  const PORT = 3000;

  // Support parsing JSON and URL-encoded request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Contact form inquiry destination handler
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, relationshipType, message, inquiryType } = req.body;

      if (!name || !email || !message) {
        res.status(400).json({ error: "Name, email, and message are required." });
        return;
      }

      console.log(`[Contact Inquiry Received]
=========================================
Type: ${inquiryType || 'General Contact'}
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Relationship Type: ${relationshipType || 'N/A'}
Message: ${message}
=========================================`);

      const apiKey = process.env.RESEND_API_KEY;

      if (apiKey) {
        const rawFromEmail = process.env.RESEND_FROM_EMAIL;
        let fromEmail = rawFromEmail ? rawFromEmail.trim().replace(/^['"]|['"]$/g, '') : '';
        if (!fromEmail) {
          fromEmail = "onboarding@resend.dev";
        }
        const fromString = `Naviter Wealth Form <${fromEmail}>`;

        const toEmailsRaw = process.env.CONTACT_DESTINATION_EMAILS;
        let toEmails: string[] = [];
        if (toEmailsRaw) {
          toEmails = toEmailsRaw
            .split(",")
            .map(e => e.trim().replace(/^['"]|['"]$/g, ''))
            .filter(e => e.length > 0);
        }
        if (toEmails.length === 0) {
          toEmails = ["team@naviterwealth.com", "bblackmon@naviterwealth.com"];
        }

        // Send actual email using Resend API (does not require external package loading)
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: fromString,
            to: toEmails,
            subject: `${inquiryType ? inquiryType + ' - ' : 'New ' }Contact Inquiry from ${name}`,
            html: `
              <h2>New ${inquiryType || 'Contact'} Inquiry from Naviter Wealth Portal</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone Number:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Relationship Type:</strong> ${relationshipType || 'Not specified'}</p>
              <p><strong>Inquiry Message:</strong></p>
              <p style="white-space: pre-wrap; font-family: sans-serif; background-color: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 4px; color: #1e293b;">${message}</p>
            `,
          }),
        });

        let errorMsg = "Failed to deliver contact inquiry via email service.";
        const resData = await response.json().catch(() => null);
        if (!response.ok) {
          console.error("Resend API returned an error:", resData);
          if (resData && typeof resData === 'object') {
            errorMsg = resData.message || resData.error?.message || JSON.stringify(resData);
          }
          res.status(400).json({ error: `Resend Email Delivery Failure: ${errorMsg}` });
          return;
        }

        console.log(`Email successfully dispatched via Resend to ${toEmails.join(", ")}`);
        res.json({ success: true, emailSent: true });
      } else {
        // Safe development simulation mode when API key is missing
        console.warn("WARNING: 'RESEND_API_KEY' is not configured in environment variables. Form submission logged above.");
        res.json({ 
          success: true, 
          simulated: true, 
          message: "Form accepted in local development layout. Please configure RESEND_API_KEY to send real emails." 
        });
      }
    } catch (error) {
      console.error("Error in /api/contact endpoint:", error);
      res.status(500).json({ error: "Encountered an internal server error while processing contact submission." });
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
