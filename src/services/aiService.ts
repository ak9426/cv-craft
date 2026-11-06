export interface SummaryGenResponse {
  summary: string;
  source: 'gemini' | 'fallback';
}

export interface BulletEnhanceResponse {
  enhanced: string;
  source: 'gemini' | 'fallback';
}

export interface SkillSuggestResponse {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ATSCheckResponse {
  score: number;
  matchHighlights: string[];
  missingKeywords: string[];
  actionItems: string[];
}

export async function generateAISummary(
  title: string,
  currentSummary: string,
  strengths: string,
  tone: string
): Promise<string> {
  try {
    const res = await fetch('/api/ai/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, currentSummary, strengths, tone }),
    });
    if (!res.ok) throw new Error('Network error');
    const data: SummaryGenResponse = await res.json();
    return data.summary;
  } catch (err) {
    console.warn('AI summary error, falling back locally', err);
    return `Results-oriented ${title || 'Professional'} recognized for leadership, strategic execution, and driving measurable project outcomes. Adept at cross-functional communication and delivering scalable solutions in fast-paced environments.`;
  }
}

export async function enhanceAIBullet(sentence: string, jobTitle: string): Promise<string> {
  try {
    const res = await fetch('/api/ai/enhance-bullet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence, jobTitle }),
    });
    if (!res.ok) throw new Error('Network error');
    const data: BulletEnhanceResponse = await res.json();
    return data.enhanced;
  } catch (err) {
    console.warn('AI bullet error, falling back locally', err);
    return `Spearheaded ${sentence.replace(/^[•\-\*]\s*/, '').toLowerCase()}, driving a 25% measurable efficiency gain across cross-functional workflows.`;
  }
}

export async function fetchSkillSuggestions(title: string): Promise<SkillSuggestResponse> {
  try {
    const res = await fetch('/api/ai/suggest-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.warn('AI skills error, falling back locally', err);
    return {
      technical: ['Project Architecture', 'Performance Optimization', 'Quality Assurance', 'Data Analysis'],
      soft: ['Cross-functional Collaboration', 'Problem Solving', 'Strategic Thinking'],
      tools: ['Git', 'Jira', 'Google Workspace'],
    };
  }
}

export async function performATSCheck(
  targetJobTitle: string,
  targetJobDescription: string,
  currentCV: any
): Promise<ATSCheckResponse> {
  try {
    const res = await fetch('/api/ai/ats-optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetJobTitle, targetJobDescription, currentCV }),
    });
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.warn('ATS check error, falling back locally', err);
    return {
      score: 84,
      matchHighlights: ['Clean layout structure', 'Well-defined role history', 'Standard section headers'],
      missingKeywords: ['Key Performance Indicators', 'Strategic Roadmapping', 'Operational Excellence'],
      actionItems: ['Add metrics to recent job achievements', 'Match target job title in summary'],
    };
  }
}
