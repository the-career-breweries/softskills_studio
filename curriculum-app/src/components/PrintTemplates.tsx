import React from 'react';

interface PrintTemplatesProps {
  templateId: string;
}

export default function PrintTemplates({ templateId }: PrintTemplatesProps) {
  if (!templateId) return null;

  const renderHeader = (title: string) => (
    <div className="print-header">
      <div className="brand-text">WORKSHEET</div>
      <h1>{title}</h1>
      <div className="print-meta">
        <div>Name: __________________________________</div>
        <div>Date: ________________</div>
      </div>
    </div>
  );

  return (
    <div className="print-container">
      {templateId === 'ExecutiveSummary' && (
        <div className="print-worksheet">
          {renderHeader('The Executive Summary')}
          <p className="print-instructions">Synthesize a complex topic into a 1-page, 3-minute brief using the BLUF method.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Scenario Context</h3>
              <p className="form-prompt">You have just stepped out of a highly contentious board meeting regarding a sudden drop in quarterly revenue. Brief your team.</p>
            </div>
            <div className="form-section">
              <h3>1. Bottom-Line Up Front (BLUF)</h3>
              <div className="blank-space large"></div>
            </div>
            <div className="form-section">
              <h3>2. Three Key Metrics</h3>
              <ol className="print-list">
                <li><div className="dotted-line"></div></li>
                <li><div className="dotted-line"></div></li>
                <li><div className="dotted-line"></div></li>
              </ol>
            </div>
            <div className="form-section">
              <h3>3. Two Immediate Action Items</h3>
              <ol className="print-list">
                <li><div className="dotted-line"></div></li>
                <li><div className="dotted-line"></div></li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {templateId === 'HighStakesMeeting' && (
        <div className="print-worksheet">
          {renderHeader('The High-Stakes Meeting')}
          <p className="print-instructions">Demonstrate meeting leadership and conflict resolution.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Scenario Context</h3>
              <p className="form-prompt">Two department heads are fiercely arguing over budget allocations. You are the Chairperson.</p>
            </div>
            <div className="form-section">
              <h3>1. Opening De-escalation Statement</h3>
              <div className="blank-space medium"></div>
            </div>
            <div className="form-section">
              <h3>2. Three Active Listening Phrases</h3>
              <ol className="print-list">
                <li><div className="dotted-line"></div></li>
                <li><div className="dotted-line"></div></li>
                <li><div className="dotted-line"></div></li>
              </ol>
            </div>
            <div className="form-section">
              <h3>3. Final Consensus Statement</h3>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'StarResponse' && (
        <div className="print-worksheet">
          {renderHeader('The Ultimate STAR Response')}
          <p className="print-instructions">Master behavioral interview framing by mapping out the most challenging professional or academic failure you have experienced.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Situation (S)</h3>
              <p className="form-prompt">Set the scene (briefly).</p>
              <div className="blank-space small"></div>
            </div>
            <div className="form-section">
              <h3>Task (T)</h3>
              <p className="form-prompt">What was the impossible goal?</p>
              <div className="blank-space small"></div>
            </div>
            <div className="form-section">
              <h3>Action (A)</h3>
              <p className="form-prompt">What did *you* specifically do?</p>
              <div className="blank-space medium"></div>
            </div>
            <div className="form-section">
              <h3>Result (R)</h3>
              <p className="form-prompt">What was the hard metric of success, and what did you learn?</p>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'JohariWindow' && (
        <div className="print-worksheet">
          {renderHeader('The Johari Window')}
          <p className="print-instructions">Use this grid to map out your self-awareness and blind spots based on feedback from others.</p>
          
          <div className="johari-grid-container">
            <div className="johari-axis-top">
              <div className="axis-label">KNOWN TO SELF</div>
              <div className="axis-label">UNKNOWN TO SELF</div>
            </div>
            <div className="johari-body">
              <div className="johari-axis-left">
                <div className="axis-label rotated">KNOWN TO OTHERS</div>
                <div className="axis-label rotated">UNKNOWN TO OTHERS</div>
              </div>
              <div className="johari-window">
                <div className="johari-quadrant">
                  <h3>OPEN AREA</h3>
                </div>
                <div className="johari-quadrant">
                  <h3>BLIND SPOT</h3>
                </div>
                <div className="johari-quadrant">
                  <h3>HIDDEN AREA</h3>
                </div>
                <div className="johari-quadrant">
                  <h3>UNKNOWN AREA</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'FirstImpression' && (
        <div className="print-worksheet">
          {renderHeader('First Impression Audit')}
          <p className="print-instructions">Exchange this sheet with your partner. Fill out the prompts based on your initial interaction.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th>Feedback Prompts</th>
                <th>Your Honest Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width: '40%'}}><strong>One positive trait you seem to bring to a team is:</strong></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>My first impression of your communication style is:</strong></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>One thing that makes you seem approachable is:</strong></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {templateId === 'SelfProfile' && (
        <div className="print-worksheet">
          {renderHeader('Self-Profile Worksheet')}
          <p className="print-instructions">Be honest with yourself. This worksheet is designed to help you identify your strengths and derailers.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Your Superpowers</h3>
              <p className="form-prompt">List the top 3 habits or traits that consistently help you succeed:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Derailer</h3>
              <p className="form-prompt">Identify one habit or tendency that holds you back or causes you stress:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The Action Plan</h3>
              <p className="form-prompt">How will you actively manage or counteract this derailer this week?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'LearningPlan' && (
        <div className="print-worksheet">
          {renderHeader('Personal Learning Plan')}
          <p className="print-instructions">Design a practical, realistic routine for how you will tackle your coursework this semester.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Deep Work Hours</h3>
              <p className="form-prompt">When are you naturally most focused? Define 2 specific blocks of time dedicated to deep, uninterrupted study:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>2. The Environment</h3>
              <p className="form-prompt">Where do you study best? Be specific (e.g., "The quiet floor of the library", not just "campus"):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Distraction Management</h3>
              <p className="form-prompt">List your top 2 distractions and exactly how you will eliminate them during Deep Work hours:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'SpeakingComfort' && (
        <div className="print-worksheet">
          {renderHeader('Speaking Comfort')}
          <p className="print-instructions">Use these prompts during your Pair Talk. Focus on volume, pacing, and pausing.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Icebreaker Prompt</h3>
              <p className="form-prompt">"If you had to give a 5-minute presentation on any topic without preparation, what would it be?"</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Challenge Prompt</h3>
              <p className="form-prompt">"What is the most difficult aspect of public speaking for you?"</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Partner Feedback</h3>
              <p className="form-prompt">Jot down constructive feedback on your partner's delivery (volume, pace, filler words):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'SoftSkillsChecklist' && (
        <div className="print-worksheet">
          {renderHeader('Soft-Skills Checklist')}
          <p className="print-instructions">Peer Review: Conduct a 3-minute professional introduction and audit your partner's presence.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Evaluation Criteria</th>
                <th>Needs Work</th>
                <th>Excellent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Posture & Body Language</strong><br/>Stands/sits up straight, appears confident, avoids closed-off gestures.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Eye Contact</strong><br/>Maintains appropriate eye contact without staring or looking away constantly.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Tone & Clarity</strong><br/>Speaks clearly, at a good volume, with professional phrasing.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
          
          <div className="self-profile-form" style={{ marginTop: '2rem', gap: '1rem' }}>
            <div className="form-section">
              <h3>Constructive Feedback</h3>
              <p className="form-prompt">Provide one piece of actionable advice to help your partner improve their professional presence:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'ArticulationActivity' && (
        <div className="print-worksheet">
          {renderHeader('Articulation & Clarity')}
          <p className="print-instructions">Use this worksheet to practice stripping away jargon and articulating your ideas clearly.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Jargon Trap</h3>
              <p className="form-prompt">Write down a complex idea or concept using jargon (e.g., "We need to leverage synergies to maximize ROI"):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Simplification</h3>
              <p className="form-prompt">Now, rewrite that same idea as if you were explaining it to a 10-year-old:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The 30-Second Pitch</h3>
              <p className="form-prompt">Draft a 3-sentence summary of a topic you are passionate about, ensuring every word serves a purpose:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'GD1Checklist' && (
        <div className="print-worksheet">
          {renderHeader('Group Discussion Basics')}
          <p className="print-instructions">Use this sheet to track your participation and active listening during your group discussion pod.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Evaluation Criteria</th>
                <th>Needs Work</th>
                <th>Excellent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Entering the Discussion</strong><br/>Uses the "Yes, and..." technique or asks clarifying questions instead of interrupting.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Active Listening</strong><br/>Maintains eye contact and nods to show comprehension when others are speaking.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Participation Rate</strong><br/>Spoke the required amount of times without dominating the conversation.</td>
                <td><div className="blank-space medium"></div></td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
          
          <div className="self-profile-form" style={{ marginTop: '2rem', gap: '1rem' }}>
            <div className="form-section">
              <h3>Personal Reflection</h3>
              <p className="form-prompt">What was the hardest part of entering the conversation today?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'GD2Synthesis' && (
        <div className="print-worksheet">
          {renderHeader('Advanced GD Dynamics')}
          <p className="print-instructions">Track the flow of ideas and practice respectful disagreement in a complex discussion setting.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Synthesizing Ideas</h3>
              <p className="form-prompt">Write down an instance where you successfully connected two different points made by your peers:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>2. Handling Disagreement</h3>
              <p className="form-prompt">Note how you or a peer handled a conflict. Did they attack the idea or the person?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The Consensus</h3>
              <p className="form-prompt">What compromises did the group have to make to arrive at a single, unified consensus?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'MicroPresentation' && (
        <div className="print-worksheet">
          {renderHeader('Micro Presentation Outline')}
          <p className="print-instructions">Structure your 3-minute presentation. Remember the Rule of 3.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Hook (Opening)</h3>
              <p className="form-prompt">How will you grab the audience's attention in the first 15 seconds?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Body (Rule of 3)</h3>
              <p className="form-prompt">Point 1:</p>
              <div className="dotted-line"></div>
              <p className="form-prompt" style={{marginTop: '0.5rem'}}>Point 2:</p>
              <div className="dotted-line"></div>
              <p className="form-prompt" style={{marginTop: '0.5rem'}}>Point 3:</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The Call to Action (Closing)</h3>
              <p className="form-prompt">What is the one final thought you want the audience to remember?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'WritingSkills1' && (
        <div className="print-worksheet">
          {renderHeader('Writing Skills: Paragraphs & Tone')}
          <p className="print-instructions">Draft a short, formal paragraph responding to your instructor's prompt.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Prompt</h3>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Your Draft</h3>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Peer Review</h3>
              <table className="print-table">
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Yes/No</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Is the tone formal?</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>No slang/contractions?</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {templateId === 'WritingSkills2' && (
        <div className="print-worksheet">
          {renderHeader('Writing Skills: Resume & Email')}
          <p className="print-instructions">Draft the core sections of your resume and a professional email applying the BLUF principle.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Resume: Skills & Experience</h3>
              <p className="form-prompt">Use strong action verbs and quantify achievements:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Professional Email Draft</h3>
              <p className="form-prompt">Subject:</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Body:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BodyLanguage' && (
        <div className="print-worksheet">
          {renderHeader('Non-Verbal Communication Practice')}
          <p className="print-instructions">Observe your partner during the Silent Interview and note their body language.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '50%' }}>Evaluation Criteria</th>
                <th>Observations & Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Posture & Presence</strong><br/>Standing/sitting tall, open posture.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Eye Contact</strong><br/>Appropriate and steady eye contact.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Gesture Control</strong><br/>Purposeful gestures, no fidgeting.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
          
          <div className="self-profile-form" style={{ marginTop: '2rem' }}>
            <div className="form-section">
              <h3>Constructive Feedback</h3>
              <p className="form-prompt">One thing they did well, and one thing to improve:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'MockMeeting' && (
        <div className="print-worksheet">
          {renderHeader('Mock Meeting Evaluation')}
          <p className="print-instructions">Evaluate your team's performance during the mock meeting simulation.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Role & Contributions</h3>
              <p className="form-prompt">What was your role, and what was your primary contribution?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Interruption Handling</h3>
              <p className="form-prompt">How did the team handle interruptions? Was it professional?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Overall Collaboration</h3>
              <p className="form-prompt">Did anyone dominate the conversation? How could collaboration improve?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'CareerMapping' && (
        <div className="print-worksheet">
          {renderHeader('Career Mapping Sheet')}
          <p className="print-instructions">Map your interests to realistic entry-level roles and identify your skill gaps.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Target Roles</h3>
              <p className="form-prompt">Identify two entry-level roles that interest you based on your strengths:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Gap Analysis</h3>
              <p className="form-prompt">What technical and soft skills do you currently lack for these roles?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Action Plan</h3>
              <p className="form-prompt">Write down one concrete step you can take this month to build a required skill:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'InterviewPrep' && (
        <div className="print-worksheet">
          {renderHeader('Interview Prep Worksheet')}
          <p className="print-instructions">Research your target company and prepare your introductory pitch.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Company Research</h3>
              <p className="form-prompt">Target Company Name:</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Mission Statement / Recent News:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. "Tell Me About Yourself" Pitch</h3>
              <p className="form-prompt">Draft your 60-second introduction (Education, Skills, Interest):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'MockAnswerPractice' && (
        <div className="print-worksheet">
          {renderHeader('Mock Answer Practice (STAR Method)')}
          <p className="print-instructions">Outline your behavioral answer and evaluate your partner's delivery.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Your STAR Outline</h3>
              <p className="form-prompt">S (Situation):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">T (Task):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">A (Action):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">R (Result):</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>Partner Evaluation</h3>
              <p className="form-prompt">Did they clearly hit all 4 STAR points? Was their delivery confident?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'ProfessionalEmail' && (
        <div className="print-worksheet">
          {renderHeader('Professional Email Task')}
          <p className="print-instructions">Draft a follow-up email to a recruiter with proper digital etiquette.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Email Draft</h3>
              <p className="form-prompt">To: recruiter@company.com</p>
              <p className="form-prompt">Subject:</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Body:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>Self-Checklist</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div>[ ] Professional greeting and sign-off</div>
                <div>[ ] Clear and actionable subject line</div>
                <div>[ ] Appropriate tone and zero typos</div>
                <div>[ ] Correct file naming convention mentioned</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComTraditionalPaths' && (
        <div className="print-worksheet">
          {renderHeader('B.Com Traditional Career Map')}
          <p className="print-instructions">Map out the requirements for a traditional commerce pathway (e.g., CA, CS, Banking).</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Target Pathway</h3>
              <p className="form-prompt">Which traditional path are you exploring (e.g., Chartered Accountancy)?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Entry Barriers & Exams</h3>
              <p className="form-prompt">What specific exams, registrations, or articleships are required?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Timeline & Preparation</h3>
              <p className="form-prompt">What is your realistic timeline for preparing for the next milestone?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComModernPaths' && (
        <div className="print-worksheet">
          {renderHeader('Modern Finance Roles Research')}
          <p className="print-instructions">Research an emerging field in commerce such as Fintech, Data Analytics, or Digital Marketing for Finance.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Emerging Role</h3>
              <p className="form-prompt">Role Name & Industry:</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Tech Skill Requirements</h3>
              <p className="form-prompt">What software or technical tools are mandatory for this role (e.g., Python, Advanced Excel, SQL)?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Bridging the Gap</h3>
              <p className="form-prompt">How will you acquire these skills outside of your standard B.Com syllabus?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComFreelance' && (
        <div className="print-worksheet">
          {renderHeader('Freelance Consultant Profile')}
          <p className="print-instructions">Draft your service offering for the gig economy (e.g., bookkeeping, tax filing, financial writing).</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Service</h3>
              <p className="form-prompt">What specific financial or administrative service can you offer right now?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Target Audience</h3>
              <p className="form-prompt">Who is your ideal client (e.g., small business owners, freelancers, startups)?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The Pitch</h3>
              <p className="form-prompt">Draft a 2-sentence bio for your Upwork or Fiverr profile:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComCaseStudy' && (
        <div className="print-worksheet">
          {renderHeader('Industry Case Study Analysis')}
          <p className="print-instructions">Break down a real-world commerce case study using a structured analytical framework.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Core Problem</h3>
              <p className="form-prompt">Identify the primary financial, operational, or strategic issue the company is facing:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Financial Impact</h3>
              <p className="form-prompt">How is this problem affecting the bottom line or cash flow?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Proposed Solution</h3>
              <p className="form-prompt">Detail 2 actionable steps the business should take to mitigate the issue:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComPanelInterview' && (
        <div className="print-worksheet">
          {renderHeader('Panel Interview Strategy')}
          <p className="print-instructions">Prepare for rigorous technical and HR panel rounds.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Technical Curveball</h3>
              <p className="form-prompt">How will you respond if asked a commerce question you don't know the exact answer to?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Cross-Examination</h3>
              <p className="form-prompt">Draft a response defending a resume point that a panelist might question:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComMockAssessment' && (
        <div className="print-worksheet">
          {renderHeader('Demo Psychometric Assessment')}
          <p className="print-instructions">Track your pacing and strategy during the mock aptitude test.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Quantitative Section</h3>
              <p className="form-prompt">Time taken (target: 20 mins):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Hardest topic encountered (e.g., Data Interpretation, Probability):</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Logical Reasoning</h3>
              <p className="form-prompt">Time taken (target: 20 mins):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Where did you get stuck?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Action Plan</h3>
              <p className="form-prompt">Based on this baseline, which area needs the most practice before placement season?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BComWorkplaceTools' && (
        <div className="print-worksheet">
          {renderHeader('Workplace Tools Checklist')}
          <p className="print-instructions">Use this audit to ensure your digital submissions are corporate-ready.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Professional Standard</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>File Naming:</strong> Document is named clearly (e.g., "JohnDoe_FinancialModel_V1.xlsx")</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Formatting:</strong> Fonts are consistent (Arial/Calibri), headings are bolded, margins aligned.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Data Hygiene:</strong> Excel cells are properly formatted (Currency vs. Percentage), no hardcoded numbers in formulas.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
{templateId === 'BBATraditionalPaths' && (
        <div className="print-worksheet">
          {renderHeader('BBA Traditional Career Map')}
          <p className="print-instructions">Map out the requirements for a traditional management pathway (e.g., CA, CS, Banking).</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Target Pathway</h3>
              <p className="form-prompt">Which traditional path are you exploring (e.g., Chartered Accountancy)?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Entry Barriers & Exams</h3>
              <p className="form-prompt">What specific exams, registrations, or articleships are required?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Timeline & Preparation</h3>
              <p className="form-prompt">What is your realistic timeline for preparing for the next milestone?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBAModernPaths' && (
        <div className="print-worksheet">
          {renderHeader('Modern Finance Roles Research')}
          <p className="print-instructions">Research an emerging field in management such as Fintech, Data Analytics, or Digital Marketing for Finance.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Emerging Role</h3>
              <p className="form-prompt">Role Name & Industry:</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Tech Skill Requirements</h3>
              <p className="form-prompt">What software or technical tools are mandatory for this role (e.g., Python, Advanced Excel, SQL)?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Bridging the Gap</h3>
              <p className="form-prompt">How will you acquire these skills outside of your standard BBA syllabus?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBAFreelance' && (
        <div className="print-worksheet">
          {renderHeader('Freelance Consultant Profile')}
          <p className="print-instructions">Draft your service offering for the gig economy (e.g., bookkeeping, tax filing, financial writing).</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Service</h3>
              <p className="form-prompt">What specific financial or administrative service can you offer right now?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Target Audience</h3>
              <p className="form-prompt">Who is your ideal client (e.g., small business owners, freelancers, startups)?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. The Pitch</h3>
              <p className="form-prompt">Draft a 2-sentence bio for your Upwork or Fiverr profile:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBACaseStudy' && (
        <div className="print-worksheet">
          {renderHeader('Industry Case Study Analysis')}
          <p className="print-instructions">Break down a real-world management case study using a structured analytical framework.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Core Problem</h3>
              <p className="form-prompt">Identify the primary financial, operational, or strategic issue the company is facing:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Financial Impact</h3>
              <p className="form-prompt">How is this problem affecting the bottom line or cash flow?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Proposed Solution</h3>
              <p className="form-prompt">Detail 2 actionable steps the business should take to mitigate the issue:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBAPanelInterview' && (
        <div className="print-worksheet">
          {renderHeader('Panel Interview Strategy')}
          <p className="print-instructions">Prepare for rigorous technical and HR panel rounds.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Technical Curveball</h3>
              <p className="form-prompt">How will you respond if asked a management question you don't know the exact answer to?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Cross-Examination</h3>
              <p className="form-prompt">Draft a response defending a resume point that a panelist might question:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBAMockAssessment' && (
        <div className="print-worksheet">
          {renderHeader('Demo Psychometric Assessment')}
          <p className="print-instructions">Track your pacing and strategy during the mock aptitude test.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Quantitative Section</h3>
              <p className="form-prompt">Time taken (target: 20 mins):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Hardest topic encountered (e.g., Data Interpretation, Probability):</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Logical Reasoning</h3>
              <p className="form-prompt">Time taken (target: 20 mins):</p>
              <div className="dotted-line"></div>
              <p className="form-prompt">Where did you get stuck?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>3. Action Plan</h3>
              <p className="form-prompt">Based on this baseline, which area needs the most practice before placement season?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BBAWorkplaceTools' && (
        <div className="print-worksheet">
          {renderHeader('Workplace Tools Checklist')}
          <p className="print-instructions">Use this audit to ensure your digital submissions are corporate-ready.</p>
          
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Professional Standard</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>File Naming:</strong> Document is named clearly (e.g., "JohnDoe_FinancialModel_V1.xlsx")</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Formatting:</strong> Fonts are consistent (Arial/Calibri), headings are bolded, margins aligned.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
              <tr>
                <td><strong>Data Hygiene:</strong> Excel cells are properly formatted (Currency vs. Percentage), no hardcoded numbers in formulas.</td>
                <td><div className="blank-space medium"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {templateId === 'BCA_SWEPath' && (
        <>
          {/* Page 1: Frontend Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('Frontend Development Roadmap')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>HTML/CSS/JS Basics</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>React.js / State Management</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>API Integration & Web Performance</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Frontend Engineer</div>
            </div>
          </div>

          {/* Page 2: Backend Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('Backend Development Roadmap')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Programming Language Mastery</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Database Design & SQL</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>API Development & Security</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Backend Engineer</div>
            </div>
          </div>

          {/* Page 3: Full-Stack Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('Full-Stack Development Roadmap')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Frontend Foundations</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Backend & Databases</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>DevOps & Deployment</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Full-Stack Engineer</div>
            </div>
          </div>

          {/* Page 4: Decision Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('Pathway Decision Matrix')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 4rem', backgroundColor: '#f8fafc', border: '4px solid #0f172a', borderRadius: '16px', fontSize: '1.8rem', fontWeight: '900', textAlign: 'center' }}>
                What do you enjoy building most?
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center', marginTop: '2rem' }}>
                {/* Frontend Path */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '30%' }}>
                  <div style={{ padding: '1.5rem', border: '3px dashed #94a3b8', borderRadius: '12px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '600', minHeight: '120px', display: 'flex', alignItems: 'center' }}>
                    Visuals, User Interfaces & Interactivity
                  </div>
                  <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
                  <div style={{ padding: '1.2rem 2rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.3rem', width: '100%', textAlign: 'center' }}>
                    Choose Frontend
                  </div>
                </div>

                {/* Backend Path */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '30%' }}>
                  <div style={{ padding: '1.5rem', border: '3px dashed #94a3b8', borderRadius: '12px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '600', minHeight: '120px', display: 'flex', alignItems: 'center' }}>
                    Logic, Data & Architecture
                  </div>
                  <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
                  <div style={{ padding: '1.2rem 2rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.3rem', width: '100%', textAlign: 'center' }}>
                    Choose Backend
                  </div>
                </div>

                {/* Full-Stack Path */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '30%' }}>
                  <div style={{ padding: '1.5rem', border: '3px dashed #94a3b8', borderRadius: '12px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '600', minHeight: '120px', display: 'flex', alignItems: 'center' }}>
                    End-to-End Systems & Startups
                  </div>
                  <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
                  <div style={{ padding: '1.2rem 2rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.3rem', width: '100%', textAlign: 'center' }}>
                    Choose Full-Stack
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 5: Activity */}
          <div className="print-worksheet">
            {renderHeader('Software Engineering Pathways Worksheet')}
            <p className="print-instructions">Select your primary pathway (Frontend, Backend, or Full-Stack) and map out the required tech stack.</p>
            
            <div className="self-profile-form">
              <div className="form-section">
                <h3>1. Primary Pathway</h3>
                <p className="form-prompt">Which SWE pathway are you focusing on?</p>
                <div className="dotted-line"></div>
              </div>

              <div className="form-section">
                <h3>2. Core Tech Stack</h3>
                <p className="form-prompt">List the top 3 technologies you need to master for this role:</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
              
              <div className="form-section">
                <h3>3. The First Project</h3>
                <p className="form-prompt">What is the very first project you will build using this stack?</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {templateId === 'BCA_DataScience' && (
        <>
          {/* Page 1: The Data Pipeline Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('The Data Pipeline Roadmap')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Data Collection</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Data Cleaning</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Feature Engineering</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Model Training</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Deployment & Monitoring</div>
            </div>
          </div>

          {/* Page 2: Activity Worksheet */}
          <div className="print-worksheet">
            {renderHeader('Data Science Pipeline Worksheet')}
            <p className="print-instructions">Outline a basic data pipeline for a predictive business problem.</p>
            
            <div className="self-profile-form">
              <div className="form-section">
                <h3>1. The Business Problem</h3>
                <p className="form-prompt">What is the core issue you are trying to predict or solve?</p>
                <div className="dotted-line"></div>
              </div>

              <div className="form-section">
                <h3>2. Data Requirements</h3>
                <p className="form-prompt">What specific datasets or features will you need to train your model?</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
              
              <div className="form-section">
                <h3>3. Algorithm Choice</h3>
                <p className="form-prompt">Which algorithm or model structure might be best suited for this, and why?</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {templateId === 'BCA_CloudArch' && (
        <>
          {/* Page 1: The Cloud Architecture Roadmap */}
          <div className="print-worksheet" style={{ pageBreakAfter: 'always' }}>
            {renderHeader('Scalable Cloud Architecture Roadmap')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', alignItems: 'center', fontFamily: '"Outfit", sans-serif' }}>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Client Request</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Load Balancer</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ padding: '1.5rem 3rem', border: '3px solid #4f46e5', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold' }}>Compute / Web Servers</div>
              <div style={{ fontSize: '3rem', color: '#4f46e5', lineHeight: '1' }}>↓</div>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>Database & Storage</div>
                <div style={{ padding: '1.5rem 3rem', backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>Caching Layer</div>
              </div>
            </div>
          </div>

          {/* Page 2: Worksheet */}
          <div className="print-worksheet">
            {renderHeader('Cloud Architecture Design')}
            <p className="print-instructions">Design a basic scalable cloud architecture for a web application.</p>
            
            <div className="self-profile-form">
              <div className="form-section">
                <h3>1. Compute & Traffic</h3>
                <p className="form-prompt">How will you handle incoming user traffic and distribute the load?</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>

              <div className="form-section">
                <h3>2. Data Storage</h3>
                <p className="form-prompt">Where will user data and media files (images/videos) be stored?</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
              
              <div className="form-section">
                <h3>3. Security Measures</h3>
                <p className="form-prompt">List two security protocols or layers you will implement:</p>
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {templateId === 'BCA_PortfolioAudit' && (
        <div className="print-worksheet">
          {renderHeader('GitHub Portfolio Audit')}
          <p className="print-instructions">Review your current GitHub profile and plan your next technical project.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Current Profile Status</h3>
              <p className="form-prompt">What is missing from your GitHub profile right now (e.g., READMEs, live links)?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Next Portfolio Project</h3>
              <p className="form-prompt">Describe a complex, non-trivial project you plan to build next:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Deployment Plan</h3>
              <p className="form-prompt">Where and how will you deploy this project so recruiters can view it?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BCA_CodingInterview' && (
        <div className="print-worksheet">
          {renderHeader('DSA Whiteboarding Practice')}
          <p className="print-instructions">Simulate a technical coding interview using a structured thought process.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Problem Clarification</h3>
              <p className="form-prompt">What clarifying questions did you ask before writing any code?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Approach</h3>
              <p className="form-prompt">Briefly explain the optimal approach and data structure used:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Complexity Analysis</h3>
              <p className="form-prompt">What is the Time Complexity (Big O) and Space Complexity of your solution?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BCA_SystemDesign' && (
        <div className="print-worksheet">
          {renderHeader('System Design Basics')}
          <p className="print-instructions">Apply core design principles to architect a scalable system (e.g., URL Shortener).</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Core Requirements</h3>
              <p className="form-prompt">Define the functional and non-functional requirements of the system:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. API Design</h3>
              <p className="form-prompt">List the core API endpoints required (e.g., POST /shorten):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Bottlenecks</h3>
              <p className="form-prompt">Where is the system most likely to fail under heavy load?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BCA_TechPanel' && (
        <div className="print-worksheet">
          {renderHeader('Technical Panel Preparation')}
          <p className="print-instructions">Prepare to defend your technical decisions and resume.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Resume Defense</h3>
              <p className="form-prompt">Pick one technology on your resume. How would you explain its inner workings?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Unknown</h3>
              <p className="form-prompt">How will you respond if asked a highly specific technical question you don't know?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Live Debugging</h3>
              <p className="form-prompt">What is your step-by-step methodology when presented with broken code?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BCA_FinalAudit' && (
        <div className="print-worksheet">
          {renderHeader('BCA Capstone Readiness')}
          <p className="print-instructions">Complete your final technical audit before applying for roles.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Technical Gaps</h3>
              <p className="form-prompt">Identify the biggest weak point in your technical foundation right now:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Action Plan</h3>
              <p className="form-prompt">What exactly will you build or practice over the next 4 weeks to close this gap?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Career Target</h3>
              <p className="form-prompt">What specific role and industry are you targeting for your first job?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'PG_ProfBaseline' && (
        <div className="print-worksheet">
          {renderHeader('Professional Baseline Reflection')}
          <p className="print-instructions">Assess your current executive capabilities and business acumen.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Commercial Acumen</h3>
              <p className="form-prompt">How comfortably can you explain the strategic drivers of your industry?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Leadership Experience</h3>
              <p className="form-prompt">Describe a situation where you had to lead without formal authority:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Critical Weakness</h3>
              <p className="form-prompt">What is the one professional trait you must improve this semester?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_CompetencyProfile' && (
        <div className="print-worksheet">
          {renderHeader('Competency Profile & Johari Window')}
          <p className="print-instructions">Map your known strengths and identify your growth gaps.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Your Core Strength (Open Area)</h3>
              <p className="form-prompt">What is the skill that your peers most associate with you?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Growth Gaps (Blind Spots)</h3>
              <p className="form-prompt">Based on recent feedback, what is a weakness you were previously unaware of?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Target Role Competency</h3>
              <p className="form-prompt">What is the most critical skill required for your post-graduation target role?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_PerfManagement' && (
        <div className="print-worksheet">
          {renderHeader('Performance & Energy Management')}
          <p className="print-instructions">Design a system to manage your time and energy under high stress.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Peak Performance Hours</h3>
              <p className="form-prompt">During which hours of the day are you most capable of deep, analytical work?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Distraction Audit</h3>
              <p className="form-prompt">What are your top three time-wasting habits, and how will you eliminate them?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Extreme Ownership</h3>
              <p className="form-prompt">Describe a recent failure. How could you have taken ownership to prevent it?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_AnalyticalListen' && (
        <div className="print-worksheet">
          {renderHeader('Analytical Listening Observation')}
          <p className="print-instructions">Practice global listening and decode subtext during a live discussion.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Stated Argument</h3>
              <p className="form-prompt">What was the speaker's primary, explicit argument?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Unsaid Subtext</h3>
              <p className="form-prompt">What was the speaker omitting, avoiding, or hinting at?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. The Strategic Question</h3>
              <p className="form-prompt">Formulate one probing question to expose the hidden assumptions:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_OralBrief' && (
        <div className="print-worksheet">
          {renderHeader('Executive Oral Briefing')}
          <p className="print-instructions">Structure a 2-minute high-impact presentation on a complex topic.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Bottom Line Up Front (BLUF)</h3>
              <p className="form-prompt">State your core recommendation or conclusion in one sentence:</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Key Supporting Evidence</h3>
              <p className="form-prompt">List the three strongest data points supporting your conclusion:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Delivery Focus</h3>
              <p className="form-prompt">What aspect of your executive presence (pacing, eye contact) will you focus on?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_ConceptExplain' && (
        <div className="print-worksheet">
          {renderHeader('Analytical Articulation')}
          <p className="print-instructions">Explain a complex operational or financial concept to a non-expert.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Concept</h3>
              <p className="form-prompt">What is the concept, and why does it matter to the business?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Analogy</h3>
              <p className="form-prompt">Provide a simple, real-world analogy to make the concept accessible:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. The Strategic Implication</h3>
              <p className="form-prompt">How should this concept influence the non-expert's decision making?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_Facilitation' && (
        <div className="print-worksheet">
          {renderHeader('Discussion Facilitation Tracker')}
          <p className="print-instructions">Guide a complex business discussion to a resolution.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Meeting Objective</h3>
              <p className="form-prompt">What specific decision must be reached by the end of this discussion?</p>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Handling Disruption</h3>
              <p className="form-prompt">How will you tactfully handle a participant who dominates the conversation?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Synthesis</h3>
              <p className="form-prompt">Draft your summary statement to lock in the final consensus:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_AnalyticalWriting' && (
        <div className="print-worksheet">
          {renderHeader('Executive Memo Draft')}
          <p className="print-instructions">Draft the framework for a high-impact business memo.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Executive Summary</h3>
              <p className="form-prompt">What is the problem, the proposed solution, and the cost?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Risks & Alternatives</h3>
              <p className="form-prompt">What are the key risks of this proposal, and what is the next best alternative?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Action Items</h3>
              <p className="form-prompt">Who needs to do what, by when, to execute this proposal?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_MeetingLeadership' && (
        <div className="print-worksheet">
          {renderHeader('Meeting Chair Audit')}
          <p className="print-instructions">Plan and execute a tightly controlled business meeting.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Agenda</h3>
              <p className="form-prompt">List the 3 main agenda items and their time allocations:</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. The Parking Lot</h3>
              <p className="form-prompt">What predictable off-topic issues might arise, and how will you defer them?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Post-Meeting Review</h3>
              <p className="form-prompt">Did the meeting end on time? Were all action items assigned?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'PG_InterviewDesign' && (
        <div className="print-worksheet">
          {renderHeader('STAR Interview Response')}
          <p className="print-instructions">Structure your response to a complex behavioral question.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Situation & Task</h3>
              <p className="form-prompt">Briefly set the scene and define your specific responsibility (20% of time):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>

            <div className="form-section">
              <h3>2. Action</h3>
              <p className="form-prompt">Detail the specific steps YOU took to solve the problem (60% of time):</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
            
            <div className="form-section">
              <h3>3. Result</h3>
              <p className="form-prompt">What was the quantifiable business outcome (20% of time)?</p>
              <div className="dotted-line"></div>
              <div className="dotted-line"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'AccountabilityContract' && (
        <div className="print-worksheet">
          {renderHeader('The Accountability Contract')}
          <p className="print-instructions">Select your path and formally define your commitment deliverables.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Chosen Path</h3>
              <p className="form-prompt">Check one: [ ] Corporate [ ] Entrepreneurial [ ] Consultant</p>
            </div>
            
            <div className="form-section">
              <h3>Deliverable 1: Target Definition</h3>
              <p className="form-prompt">(Corporate: Target Companies | Entrepreneurial: Idea Generation | Consultant: Problem Statement)</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>Deliverable 2: Execution Framework</h3>
              <p className="form-prompt">(Corporate: History & Hiring Trends | Entrepreneurial: Chain of Thoughts | Consultant: RCA / Fishbone)</p>
              <div className="blank-space large"></div>
            </div>

            <div className="form-section">
              <h3>Deliverable 3: Stakeholder Interaction</h3>
              <p className="form-prompt">(Entrepreneurial only: Peer pitch notes / responses)</p>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'RevisionBrief' && (
        <div className="print-worksheet">
          {renderHeader('Revision Brief')}
          <p className="print-instructions">Process the peer feedback from your Execution Review ("Shark Tank") session.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Harshest Feedback</h3>
              <p className="form-prompt">What was the most difficult critique you received during your pitch?</p>
              <div className="blank-space medium"></div>
            </div>
            
            <div className="form-section">
              <h3>2. The Reality Check</h3>
              <p className="form-prompt">Why were they right? Be brutally honest about the flaws in your initial assumption.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Pivot Strategy</h3>
              <p className="form-prompt">Detail exactly how you are changing your strategy/framework based on this feedback.</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'CrisisSimulation' && (
        <div className="print-worksheet">
          {renderHeader('The Death Spiral Strategy')}
          <p className="print-instructions">Document your team's rapid response strategy as the crisis unfolds.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>Initial Strategy (First 10 Minutes)</h3>
              <p className="form-prompt">What is your immediate response to "Crisis Zero"?</p>
              <div className="blank-space large"></div>
            </div>
            
            <div className="form-section">
              <h3>Inject 1 Response</h3>
              <p className="form-prompt">How does your strategy pivot based on the new variable?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>Inject 2 Response</h3>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>Inject 3 Response</h3>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'ResilienceReflection' && (
        <div className="print-worksheet">
          {renderHeader('Resilience Reflection')}
          <p className="print-instructions">Process your psychological response to extreme pressure.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Breaking Point</h3>
              <p className="form-prompt">Describe the exact moment during the simulation you felt the most overwhelmed.</p>
              <div className="blank-space medium"></div>
            </div>
            
            <div className="form-section">
              <h3>2. Your Natural Response</h3>
              <p className="form-prompt">How did you react under pressure? Check one: [ ] Fight [ ] Flight [ ] Freeze</p>
              <p className="form-prompt">Briefly explain how this response manifested in your behavior:</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Grounding Technique</h3>
              <p className="form-prompt">What is one concrete grounding technique you will use in your career when a real crisis hits?</p>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'DataNarrative' && (
        <div className="print-worksheet">
          {renderHeader('Data Narrative Breakdown')}
          <p className="print-instructions">Pass the financial data through the "So What?" filter to create an actionable insight for non-finance stakeholders.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Metric</h3>
              <p className="form-prompt">What is the exact number or trend you are highlighting?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. The Impact</h3>
              <p className="form-prompt">Why does this matter to the business? (The "So What?")</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Actionable Insight</h3>
              <p className="form-prompt">What specific action should the stakeholder take based on this data?</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'BudgetDenialRoleplay' && (
        <div className="print-worksheet">
          {renderHeader('The Sandwich Method: Budget Denial')}
          <p className="print-instructions">Script out your response to deny the budget request without destroying the relationship.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Context</h3>
              <p className="form-prompt">Acknowledge the importance of their project/request.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. The Reality (The "No")</h3>
              <p className="form-prompt">Deliver the clear denial based on policy or constraints.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Pivot (The "How")</h3>
              <p className="form-prompt">Offer a compliant, alternative solution or next step.</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'EthicsEscalation' && (
        <div className="print-worksheet">
          {renderHeader('Ethics Escalation Brief')}
          <p className="print-instructions">Document the compliance violation and outline your mitigation strategy.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Violation</h3>
              <p className="form-prompt">State the exact nature of the ethical breach or policy violation.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. Immediate Next Steps</h3>
              <p className="form-prompt">Who do you report this to? What documentation do you need to secure?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. Risk Mitigation</h3>
              <p className="form-prompt">What are the potential career risks to yourself, and how will you protect yourself?</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'ProcurementNegotiation' && (
        <div className="print-worksheet">
          {renderHeader('Procurement Negotiation Strategy')}
          <p className="print-instructions">Prepare your leverage and counter-offers before entering the negotiation.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Your BATNA</h3>
              <p className="form-prompt">What is your Best Alternative to a Negotiated Agreement?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. Target & Walk-Away</h3>
              <div className="checkbox-group" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p className="form-prompt">Opening Counter-Offer:</p>
                  <div className="blank-space small"></div>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="form-prompt">Maximum Price (Walk-Away):</p>
                  <div className="blank-space small"></div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>3. The Opening Script</h3>
              <p className="form-prompt">Write out the first 2 minutes of your response to their $120k renewal proposal (include the flinch).</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'FinancialPersona' && (
        <div className="print-worksheet">
          {renderHeader('The Strategic Financial Persona')}
          <p className="print-instructions">Declare your financial niche and map out your targeted networking strategy.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Persona Declaration</h3>
              <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '15px' }}>
                <label><input type="checkbox" /> Big 4 Auditor</label>
                <label><input type="checkbox" /> Corporate Finance Strategist</label>
                <label><input type="checkbox" /> Investment Banker / PE Analyst</label>
              </div>
            </div>

            <div className="form-section">
              <h3>2. The Networking Plan</h3>
              <p className="form-prompt">Step 1: The Target (Who are you reaching out to?)</p>
              <div className="blank-space small"></div>
              <p className="form-prompt">Step 2: The Medium (LinkedIn, Alumni Event, Cold Email?)</p>
              <div className="blank-space small"></div>
              <p className="form-prompt">Step 3: The "Give" (What value are you providing before asking for anything?)</p>
              <div className="blank-space medium"></div>
            </div>
          </div>
        </div>
      )}
      {templateId === 'TechnicalDefensePrep' && (
        <div className="print-worksheet">
          {renderHeader('Technical Defense Prep')}
          <p className="print-instructions">Prepare your strategies for the hostile technical interview environment.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The Delay & Process Tactic</h3>
              <p className="form-prompt">How will you pause to buy 3 seconds of thinking time before answering a brain teaser?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. The Clarifying Question</h3>
              <p className="form-prompt">Write out a script for how you will politely narrow the scope of a vague modeling question.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Pushback Script</h3>
              <p className="form-prompt">Script out your polite but firm response when the MD incorrectly challenges your accurate answer.</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'First90DaysStrategy' && (
        <div className="print-worksheet">
          {renderHeader('The 90-Day Desk Strategy')}
          <p className="print-instructions">Map out your success metrics for the first 90 days on the job.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Reality Check</h3>
              <p className="form-prompt">Summarize the harsh daily reality of your chosen persona (Auditor, CorpFin, IB).</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. The First Week Objective</h3>
              <p className="form-prompt">Identify the 3 key people you need to build immediate rapport with, and how you will do it.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. Month 3 Milestone</h3>
              <p className="form-prompt">What is the one complex task you want to be trusted to execute autonomously by day 90?</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'CrisisTriageShock' && (
        <div className="print-worksheet">
          {renderHeader('The War Room: External Shock Triage')}
          <p className="print-instructions">Draft your emergency briefing for the CFO following a major macroeconomic shock.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Liquidity Assessment (Cash Preservation)</h3>
              <p className="form-prompt">Identify 3 immediate levers you can pull to preserve cash within 24 hours.</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. Exposure Mapping</h3>
              <p className="form-prompt">Which of your major clients, suppliers, or divisions are most at risk of bankruptcy?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Executive Summary</h3>
              <p className="form-prompt">Write the exact 3-sentence, action-oriented opening statement you will deliver to the CFO.</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'CompPortfolioBreakdown' && (
        <div className="print-worksheet">
          {renderHeader('Total Compensation Breakdown')}
          <p className="print-instructions">Evaluate the two competing job offers based on guaranteed cash and expected equity value.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. Guaranteed Year 1 Cash</h3>
              <div className="checkbox-group" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <p className="form-prompt">Offer A (Big 4 Bank):</p>
                  <div className="blank-space small"></div>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="form-prompt">Offer B (FinTech Startup):</p>
                  <div className="blank-space small"></div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>2. Equity Risk Assessment</h3>
              <p className="form-prompt">What are the specific risks associated with the RSUs in Offer B (vesting cliff, valuation risk, liquidity)?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Final Decision</h3>
              <p className="form-prompt">Which offer do you accept, and what is your mathematical/strategic justification?</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}

      {templateId === 'MarketLaunchpadChecklist' && (
        <div className="print-worksheet">
          {renderHeader('The Launchpad Checklist')}
          <p className="print-instructions">Finalize your transition strategy from M.Com student to Financial Analyst.</p>
          
          <div className="self-profile-form">
            <div className="form-section">
              <h3>1. The 3-Year Vision</h3>
              <p className="form-prompt">What is your exact target title and target compensation 36 months from today?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>2. The Upskilling Gap</h3>
              <p className="form-prompt">What is the one major technical skill or certification (e.g., CFA, Python) you still need to acquire?</p>
              <div className="blank-space medium"></div>
            </div>

            <div className="form-section">
              <h3>3. The Burnout Protocol</h3>
              <p className="form-prompt">What is your non-negotiable hard boundary to protect your physical and mental health?</p>
              <div className="blank-space large"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
