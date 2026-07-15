import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuery = query.toLowerCase();
  
  let results = [];
  if (lowerQuery.includes('b.com') || lowerQuery.includes('commerce') || lowerQuery.includes('finance') || lowerQuery.includes('accounting')) {
    results = [
      { title: 'Top 5 Emerging Finance Roles in 2024', link: 'https://www.linkedin.com/jobs/finance-jobs/', snippet: 'Discover the fastest growing roles in corporate finance, including ESG Analysts and FinTech Product Managers...' },
      { title: 'Is CA still relevant in the AI era?', link: 'https://www.icai.org/', snippet: 'A deep dive into how Chartered Accountants are using AI to automate auditing and focus on strategic advisory...' },
      { title: 'IBPS PO 2024: New Exam Pattern Changes', link: 'https://www.ibps.in/', snippet: 'The banking recruitment board has announced slight changes to the reasoning section for the upcoming PO exams...' },
    ];
  } else if (lowerQuery.includes('bba') || lowerQuery.includes('management') || lowerQuery.includes('marketing') || lowerQuery.includes('hr')) {
    results = [
      { title: 'The Rise of Growth Marketing in 2024', link: 'https://www.linkedin.com/jobs/marketing-jobs/', snippet: 'Why traditional marketing is giving way to data-driven growth marketing and how BBA grads can pivot...' },
      { title: 'Top 10 MBA Programs for Consulting', link: 'https://www.gmac.com/', snippet: 'A comprehensive ranking of the best business schools for those aiming for top-tier consulting roles...' },
      { title: 'Product Management vs Project Management', link: 'https://www.productschool.com/', snippet: 'Understanding the key differences and which career path aligns better with your skills and goals...' },
    ];
  } else if (lowerQuery.includes('mba') || lowerQuery.includes('master') || lowerQuery.includes('business administration')) {
    results = [
      { title: 'The Rise of AI in Strategy Consulting 2024', link: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', snippet: 'How top-tier MBA graduates are leveraging generative AI to accelerate market research and due diligence...' },
      { title: 'Corporate Finance: The Shift from Tech to Energy', link: 'https://www.bloomberg.com/markets', snippet: 'Investment banking and corporate finance roles for MBA grads are seeing a massive shift towards green energy sectors...' },
      { title: 'Entrepreneurship Through Acquisition (ETA)', link: 'https://hbr.org/2024/02/should-you-buy-a-business-or-start-one', snippet: 'Why more MBA students are choosing to buy existing small businesses instead of launching volatile startups...' },
    ];
  } else {
    results = [
      { title: 'The Future of Work: 2024 Career Trends', link: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023/', snippet: 'Explore the macro trends shaping the global job market, from remote work policies to AI integration...' },
      { title: 'Top Soft Skills Employers Look For', link: 'https://www.linkedin.com/business/learning/blog/top-skills-and-courses/the-skills-companies-need-most', snippet: 'Technical skills get you the interview, but soft skills like communication and adaptability get you the job...' },
      { title: 'How to Build a Portfolio that Stands Out', link: 'https://www.coursera.org/articles/how-to-build-a-portfolio', snippet: 'Actionable tips on creating a professional portfolio that showcases your real-world capabilities...' },
    ];
  }

  return NextResponse.json({ results });
}
