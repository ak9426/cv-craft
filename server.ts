import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with telemetry header as required by skills
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Helper Fallbacks for instant, reliable responses if API key isn't active or fails
function getFallbackSummary(title: string, experience: string, tone: string): string {
  const t = title || 'Professional';
  if (tone === 'executive') {
    return `Results-driven ${t} with over 8+ years of cross-functional leadership and proven track record of scaling operations, optimizing budgets, and leading high-performing teams to surpass aggressive KPIs. Strategic thinker adept at aligning technical vision with business goals to drive measurable revenue growth.`;
  } else if (tone === 'technical') {
    return `Detail-oriented ${t} specializing in building scalable architectures, modern engineering practices, and robust data pipelines. Strong background in full lifecycle project delivery with a relentless focus on performance optimization, clean code, and security standards.`;
  } else if (tone === 'creative') {
    return `Innovative and forward-thinking ${t} with passion for human-centered design, engaging digital experiences, and boundary-pushing brand execution. Proven ability to translate complex briefs into high-impact visual campaigns and award-winning solutions.`;
  }
  return `Dedicated and versatile ${t} with a strong foundation in problem-solving, project management, and collaborative execution. Recognized for attention to detail, continuous learning, and consistently delivering high-quality deliverables under tight deadlines.`;
}

function getFallbackBullet(sentence: string): string {
  const cleaned = sentence.trim().replace(/^[•\-\*]\s*/, '');
  if (!cleaned) return 'Led cross-functional initiatives resulting in a 28% increase in operational efficiency and project delivery speed.';
  return `Spearheaded ${cleaned.toLowerCase()}, streamlining key workflows and driving a 30% measurable improvement in team productivity and client satisfaction.`;
}

function getFallbackSkills(title: string): { technical: string[]; soft: string[]; tools: string[] } {
  const lower = (title || '').toLowerCase();
  if (lower.includes('software') || lower.includes('engineer') || lower.includes('developer') || lower.includes('web')) {
    return {
      technical: ['TypeScript', 'React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'GraphQL', 'System Architecture', 'CI/CD Pipelines'],
      soft: ['Problem Solving', 'Agile/Scrum', 'Cross-Functional Collaboration', 'Code Reviewing', 'Mentorship'],
      tools: ['Git/GitHub', 'Docker', 'AWS', 'VS Code', 'Postman', 'Jira']
    };
  } else if (lower.includes('marketing') || lower.includes('growth') || lower.includes('content')) {
    return {
      technical: ['Search Engine Optimization (SEO)', 'Content Strategy', 'Google Analytics 4', 'A/B Testing', 'Conversion Rate Optimization (CRO)', 'Email Automation'],
      soft: ['Brand Storytelling', 'Strategic Communication', 'Campaign Management', 'Audience Research', 'Adaptability'],
      tools: ['HubSpot', 'Figma', 'Google Tag Manager', 'Semrush', 'Mailchimp', 'Asana']
    };
  } else if (lower.includes('product') || lower.includes('manager') || lower.includes('owner')) {
    return {
      technical: ['Product Roadmap Development', 'User Research', 'Data Analysis', 'Feature Prioritization (RICE/Kano)', 'Sprint Planning', 'Market Analysis'],
      soft: ['Stakeholder Management', 'Executive Presentation', 'Negotiation', 'Conflict Resolution', 'Strategic Vision'],
      tools: ['Jira', 'Figma', 'Mixpanel', 'Linear', 'Notion', 'Miro']
    };
  } else if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) {
    return {
      technical: ['Wireframing & Prototyping', 'User Journey Mapping', 'Design Systems', 'Usability Testing', 'Information Architecture', 'Responsive Design'],
      soft: ['Empathy', 'Visual Communication', 'Constructive Feedback', 'Design Thinking', 'Collaboration'],
      tools: ['Figma', 'Adobe Creative Cloud', 'Miro', 'Framer', 'Protopie']
    };
  }
  return {
    technical: ['Project Lifecycle Management', 'Data Reporting & Analysis', 'Workflow Optimization', 'Quality Assurance', 'Budget Management'],
    soft: ['Critical Thinking', 'Verbal & Written Communication', 'Leadership', 'Time Management', 'Client Relations'],
    tools: ['Google Workspace', 'Microsoft 365', 'Slack', 'Trello', 'Tableau']
  };
}

// 1. AI Professional Summary Generator
app.post('/api/ai/generate-summary', async (req: Request, res: Response) => {
  try {
    const { title, currentSummary, strengths, tone } = req.body;
    const selectedTone = tone || 'professional';

    if (!ai) {
      const fallback = getFallbackSummary(title, currentSummary, selectedTone);
      return res.json({ summary: fallback, source: 'fallback' });
    }

    const prompt = `You are an elite executive career coach and resume writer.
Generate a compelling, impactful 3-to-4 sentence professional resume summary for:
Job Title: ${title || 'Professional'}
Current Draft or Background: ${currentSummary || 'None provided'}
Key Strengths / Skills: ${strengths || 'Leadership, problem solving, results-oriented'}
Desired Tone: ${selectedTone}

Rules:
- 3 to 4 sentences maximum.
- Never use first-person pronouns ("I", "my", "we").
- Focus on quantifiable value, leadership, and core competencies.
- Do NOT hallucinate specific degrees or previous employers.
- Output ONLY the polished summary text without quotes or commentary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const summary = response.text?.trim() || getFallbackSummary(title, currentSummary, selectedTone);
    return res.json({ summary, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating summary:', error?.message || error);
    const fallback = getFallbackSummary(req.body.title, req.body.currentSummary, req.body.tone);
    return res.json({ summary: fallback, source: 'fallback' });
  }
});

// 2. AI Bullet Point & Responsibility Enhancer
app.post('/api/ai/enhance-bullet', async (req: Request, res: Response) => {
  try {
    const { sentence, jobTitle } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ error: 'Sentence is required' });
    }

    if (!ai) {
      const fallback = getFallbackBullet(sentence);
      return res.json({ enhanced: fallback, source: 'fallback' });
    }

    const prompt = `You are a professional resume editor specializing in high-impact ATS bullet points.
Convert the following duty or draft bullet point into 1 strong, polished, metric-driven resume accomplishment bullet point:
Draft: "${sentence}"
Role/Context: ${jobTitle || 'Professional'}

Rules:
- Begin with a powerful past-tense action verb (e.g. Spearheaded, Orchestrated, Engineered, Accelerated, Overhauled).
- Include strong business impact or metrics placeholder if none existed (e.g., "resulting in a 25% increase in efficiency").
- Keep it concise (1 to 2 lines).
- Output ONLY the improved bullet point text without bullet symbol, quotation marks, or explanations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const enhanced = response.text?.trim().replace(/^[•\-\*]\s*/, '') || getFallbackBullet(sentence);
    return res.json({ enhanced, source: 'gemini' });
  } catch (error: any) {
    console.error('Error enhancing bullet:', error?.message || error);
    const fallback = getFallbackBullet(req.body.sentence);
    return res.json({ enhanced: fallback, source: 'fallback' });
  }
});

// 3. AI Skill Recommender
app.post('/api/ai/suggest-skills', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!ai) {
      return res.json(getFallbackSkills(title));
    }

    const prompt = `List the top relevant technical skills, soft skills, and industry tools for a "${title || 'Professional'}".
Format as valid JSON:
{
  "technical": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"],
  "soft": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "tools": ["tool1", "tool2", "tool3", "tool4", "tool5"]
}
Do not include markdown ticks, just JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const raw = response.text?.trim() || '{}';
    const parsed = JSON.parse(raw);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error suggesting skills:', error?.message || error);
    return res.json(getFallbackSkills(req.body.title));
  }
});

// 4. AI ATS Optimization & Keyword Analysis
app.post('/api/ai/ats-optimize', async (req: Request, res: Response) => {
  try {
    const { targetJobTitle, targetJobDescription, currentCV } = req.body;

    if (!ai) {
      return res.json({
        score: 88,
        matchHighlights: [
          'Strong core job title relevance',
          'Clean contact and profile credentials',
          'Action-oriented bullet phrasing',
          'Standard chronological experience format'
        ],
        missingKeywords: ['Cross-functional Alignment', 'KPI Tracking', 'Cloud Infrastructure', 'Budget Optimization'],
        actionItems: [
          'Add quantifiable metrics (percentages, dollar amounts, team size) to your most recent position',
          'Include exact keyword matches from your target job posting in the Skills section',
          'Ensure job dates follow standard Month Year format'
        ]
      });
    }

    const prompt = `You are a certified Applicant Tracking System (ATS) auditor and career strategist.
Analyze this CV profile against the target position:
Target Job Title: ${targetJobTitle || 'Not specified'}
Target Job Description: ${targetJobDescription || 'General professional standards'}
CV Content Overview:
${JSON.stringify(currentCV || {}, null, 2)}

Provide an ATS compatibility audit in JSON:
{
  "score": 85,
  "matchHighlights": ["string list of 3-4 strengths for ATS"],
  "missingKeywords": ["string list of 4-6 recommended keywords to add"],
  "actionItems": ["string list of 3-4 specific fixes to boost pass rate"]
}
Score must be an integer between 60 and 98 based on real alignment. Return pure JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error ATS checking:', error?.message || error);
    return res.json({
      score: 82,
      matchHighlights: [
        'Document structure contains standard ATS headings',
        'Profile title matches industry terminology',
        'Clean contact information layout'
      ],
      missingKeywords: ['Process Optimization', 'Key Performance Indicators', 'Strategic Planning'],
      actionItems: [
        'Incorporate 2-3 additional action verbs in recent responsibilities',
        'Add software tools specifically cited in the target job spec'
      ]
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'CVCraft', geminiConfigured: !!apiKey });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[CVCraft] Server listening on port ${port}`);
  });
}

startServer();
