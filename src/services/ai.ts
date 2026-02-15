import { supabase } from "@/integrations/supabase/client";

interface SubjectMarks {
    subject: string;
    marks: string;
    interest?: 'high' | 'mid' | 'low';
}

export const generateQuizQuestions = async (
    educationLevel: string,
    interests: string,
    marksData?: {
        class9Marks?: SubjectMarks[];
        class10Marks?: SubjectMarks[];
        class11Subjects?: SubjectMarks[];
        class12Subjects?: SubjectMarks[];
    }
) => {
    console.log("Generating aptitude questions for:", educationLevel, interests, marksData);

    // Analyze marks to determine strengths
    let strengthsAnalysis = "";
    if (marksData) {
        const allMarks = [
            ...(marksData.class9Marks || []),
            ...(marksData.class10Marks || []),
            ...(marksData.class11Subjects || []),
            ...(marksData.class12Subjects || [])
        ];

        const highPerformance = allMarks.filter(m => parseFloat(m.marks) >= 80);
        const highInterest = allMarks.filter(m => m.interest === 'high');

        strengthsAnalysis = `Student shows strong performance in: ${highPerformance.map(m => m.subject).join(', ')}. High interest in: ${highInterest.map(m => m.subject).join(', ')}.`;
    }

    // Try to get API key
    let apiKey = "";
    try {
        const { data } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('admin_settings' as any)
            .select('value')
            .eq('key', 'OPENROUTER_API_KEY')
            .maybeSingle();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data) apiKey = (data as any).value;
    } catch (e) {
        console.warn("Could not fetch API key");
    }

    // If we have key, call OpenRouter
    if (apiKey && marksData) {
        try {
            const prompt = `You are a career counselor AI. Based on the following student data, generate 5 personalized aptitude questions to assess their career fit:

Education Level: ${educationLevel}
Interests: ${interests}
Academic Strengths: ${strengthsAnalysis}

Generate 5 multiple-choice questions that assess:
1. Problem-solving approach
2. Work style preference
3. Career impact goals
4. Subject affinity
5. Learning style

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "question text",
    "options": [
      {"label": "option 1", "value": 10},
      {"label": "option 2", "value": 8},
      {"label": "option 3", "value": 6},
      {"label": "option 4", "value": 4},
      {"label": "Other", "value": 0}
    ]
  }
]`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            const data = await response.json();
            const content = data.choices[0].message.content;
            const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (err) {
            console.error("AI Call Failed, using fallback", err);
        }
    }

    // Fallback mock questions
    return [
        {
            id: 1,
            question: "When you encounter a complex problem, what is your first instinct?",
            options: [
                { label: "Break it down into logical steps", value: 10 },
                { label: "Look for creative, out-of-the-box solutions", value: 8 },
                { label: "Ask others for their perspective", value: 6 },
                { label: "Research how others solved it", value: 5 },
                { label: "Other", value: 0 }
            ]
        },
        {
            id: 2,
            question: "Which activity sounds most appealing for a weekend project?",
            options: [
                { label: "Building a mechanical model or coding an app", value: 10 },
                { label: "Writing a story or painting", value: 9 },
                { label: "Organizing a community event", value: 7 },
                { label: "Analyzing data or solving puzzles", value: 8 },
                { label: "Other", value: 0 }
            ]
        },
        {
            id: 3,
            question: "How do you prefer to work?",
            options: [
                { label: "Independently with deep focus", value: 9 },
                { label: "Collaborating in a dynamic team", value: 8 },
                { label: "Leading and directing others", value: 10 },
                { label: "Following clear instructions", value: 5 },
                { label: "Other", value: 0 }
            ]
        },
        {
            id: 4,
            question: "What kind of impact do you want to make?",
            options: [
                { label: "Advancing technology and innovation", value: 10 },
                { label: "Helping people directly (healthcare/teaching)", value: 9 },
                { label: "Influencing policy and society", value: 8 },
                { label: "Creating beauty and entertainment", value: 7 },
                { label: "Other", value: 0 }
            ]
        },
        {
            id: 5,
            question: "Which subject requires the least effort for you?",
            options: [
                { label: "Mathematics & Physics", value: 10 },
                { label: "Literature & History", value: 8 },
                { label: "Biology & Environment", value: 9 },
                { label: "Business & Commerce", value: 7 },
                { label: "Other", value: 0 }
            ]
        }
    ];
};

// New function to generate college and job recommendations
export const generateRecommendations = async (
    educationLevel: string,
    interests: string,
    marksData: {
        class9Marks?: SubjectMarks[];
        class10Marks?: SubjectMarks[];
        class11Subjects?: SubjectMarks[];
        class12Subjects?: SubjectMarks[];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aptitudeAnswers: Record<number, any>
) => {
    console.log("Generating recommendations for:", educationLevel, interests, marksData, aptitudeAnswers);

    // Analyze marks
    const allMarks = [
        ...(marksData.class9Marks || []),
        ...(marksData.class10Marks || []),
        ...(marksData.class11Subjects || []),
        ...(marksData.class12Subjects || [])
    ];

    const highPerformance = allMarks.filter(m => parseFloat(m.marks) >= 80);
    const highInterest = allMarks.filter(m => m.interest === 'high');

    // Try to get API key
    let apiKey = "";
    try {
        const { data } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('admin_settings' as any)
            .select('value')
            .eq('key', 'OPENROUTER_API_KEY')
            .maybeSingle();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (data) apiKey = (data as any).value;
    } catch (e) {
        console.warn("Could not fetch API key");
    }

    // If we have key, call OpenRouter for recommendations
    if (apiKey) {
        try {
            const prompt = `You are a career counselor AI for Indian students. Based on the following data, provide personalized recommendations:

Education Level: ${educationLevel}
Interests: ${interests}
High Performance Subjects: ${highPerformance.map(m => `${m.subject} (${m.marks}%)`).join(', ')}
High Interest Subjects: ${highInterest.map(m => m.subject).join(', ')}
Aptitude Answers: ${JSON.stringify(aptitudeAnswers)}

Provide recommendations in this EXACT JSON format:
{
  "strengths": "A paragraph describing the student's academic strengths and personality traits based on marks and aptitude",
  "recommendedCourses": [
    {
      "courseName": "Course name (e.g., Computer Science Engineering)",
      "stream": "Stream category",
      "match": 95,
      "description": "Why this course fits",
      "whyGreat": ["Reason 1", "Reason 2", "Reason 3"],
      "colleges": [
        {"name": "IIT Delhi", "location": "New Delhi", "cutoff": "JEE Advanced Rank < 500"},
        {"name": "BITS Pilani", "location": "Pilani, Rajasthan", "cutoff": "BITSAT Score > 350"}
      ],
      "careerOptions": ["Software Engineer", "Data Scientist", "AI/ML Engineer"]
    }
  ]
}

Provide 3 course recommendations with 3-5 colleges each. Use real Indian colleges (IITs, NITs, BITS, etc.).`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }]
                })
            });

            const data = await response.json();
            const content = data.choices[0].message.content;
            const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (err) {
            console.error("AI Recommendation Failed, using fallback", err);
        }
    }

    // Fallback mock recommendations
    return {
        strengths: "You exhibit exceptional academic performance across all subjects, particularly in Mathematics and Science, indicating strong analytical and problem-solving abilities. Your interest in technology and innovation is well-supported by your responses, which highlight a preference for logical thinking, creative problem-solving, and systematic approaches.",
        recommendedCourses: [
            {
                courseName: "Computer Science Engineering",
                stream: "Core Technology & Engineering",
                match: 95,
                description: "This course directly aligns with your strong academic performance in Math and Science, coupled with your interest in technology and innovation.",
                whyGreat: [
                    "Exceptional performance in Mathematics and Science",
                    "Strong interest in logical thinking and problem-solving",
                    "Preference for innovation and creating new solutions"
                ],
                colleges: [
                    { name: "IIT Delhi", location: "New Delhi", cutoff: "JEE Advanced Rank < 500" },
                    { name: "IIT Bombay", location: "Mumbai", cutoff: "JEE Advanced Rank < 600" },
                    { name: "BITS Pilani", location: "Pilani, Rajasthan", cutoff: "BITSAT Score > 350" }
                ],
                careerOptions: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst"]
            },
            {
                courseName: "Electronics Engineering",
                stream: "Hardware & Systems Engineering",
                match: 88,
                description: "Given your strong aptitude in Physics and Mathematics, this stream offers an excellent pathway into hardware and systems engineering.",
                whyGreat: [
                    "Strong performance in Physics and Mathematics",
                    "Interest in systematic and analytical thinking",
                    "Opens doors to cutting-edge hardware innovation"
                ],
                colleges: [
                    { name: "IIT Madras", location: "Chennai", cutoff: "JEE Advanced Rank < 800" },
                    { name: "NIT Trichy", location: "Tiruchirappalli", cutoff: "JEE Main Rank < 5000" },
                    { name: "IIIT Hyderabad", location: "Hyderabad", cutoff: "JEE Main Rank < 3000" }
                ],
                careerOptions: ["Electronics Engineer", "Embedded Systems Engineer", "VLSI Design Engineer", "Robotics Engineer"]
            },
            {
                courseName: "Biotechnology",
                stream: "Interdisciplinary Technology & Research",
                match: 75,
                description: "Your high performance in Science and interest in innovation could be channeled into interdisciplinary fields like Bioinformatics.",
                whyGreat: [
                    "Excellent performance in Science",
                    "Interest in research and cutting-edge advancements",
                    "Unique application of technology in biological sciences"
                ],
                colleges: [
                    { name: "IIT Kharagpur", location: "Kharagpur", cutoff: "JEE Advanced Rank < 2000" },
                    { name: "Anna University", location: "Chennai", cutoff: "TNEA Cutoff < 1000" },
                    { name: "VIT Vellore", location: "Vellore", cutoff: "VITEEE Rank < 5000" }
                ],
                careerOptions: ["Bioinformatician", "Computational Biologist", "Biomedical Engineer", "Pharmaceutical Researcher"]
            }
        ]
    };
};
