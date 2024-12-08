"use client";

import React, { useState } from 'react';

interface Question {
    question: string;
    options: string[];
}

interface ProfileData {
    title: string;
    description: string;
    recommendations: {
        [key: string]: string[];
    };
}

const questions: Question[] = [
    {
        question: "What's your primary focus for health optimization?",
        options: [
            "Overall wellness and longevity",
            "Mental performance and focus",
            "Sleep quality and recovery",
            "Stress management and resilience",
            "Physical performance and fitness"
        ]
    },
    {
        question: "How do you prefer to track your health progress?",
        options: [
            "Advanced biomarkers and lab tests",
            "Wearable devices and apps",
            "Journal and subjective feeling",
            "Regular performance measurements",
            "Mix of different tracking methods"
        ]
    },
    {
        question: "What's your current experience with supplementation?",
        options: [
            "Advanced stacks and protocols",
            "Basic vitamins and minerals",
            "Mainly herbal supplements",
            "Prescription medications only",
            "No supplementation experience"
        ]
    },
    {
        question: "How would you describe your current sleep quality?",
        options: [
            "Optimized and tracked",
            "Generally good but could improve",
            "Inconsistent quality",
            "Poor sleep patterns",
            "Never tracked sleep before"
        ]
    },
    {
        question: "What's your approach to trying new health practices?",
        options: [
            "Research thoroughly and implement systematically",
            "Jump in enthusiastically",
            "Start slowly and build up",
            "Wait for proven results",
            "Skeptical but open-minded"
        ]
    }
];

const profiles: { [key: string]: ProfileData } = {
    scientist: {
        title: "The Biohacking Scientist",
        description: "You take a methodical, data-driven approach to health optimization. Your strength lies in understanding complex biological systems and implementing evidence-based protocols.",
        recommendations: {
            "Testing & Tracking": [
                "Implement quarterly blood panel analysis",
                "Use continuous glucose monitoring",
                "Track HRV and sleep metrics daily"
            ],
            "Advanced Protocols": [
                "Design personalized peptide protocols",
                "Experiment with molecular hydrogen",
                "Implement metabolic flexibility training"
            ],
            "Technology Integration": [
                "Invest in high-quality biotracking devices",
                "Use neurofeedback training",
                "Implement red light therapy"
            ]
        }
    },
    optimized: {
        title: "The Performance Optimizer",
        description: "You excel at maximizing human potential through systematic optimization. Your focus on peak performance drives your health decisions.",
        recommendations: {
            "Physical Enhancement": [
                "Design periodized training protocols",
                "Implement cold/heat exposure therapy",
                "Use advanced recovery techniques"
            ],
            "Mental Performance": [
                "Create a nootropic stack protocol",
                "Practice dual n-back training",
                "Use flow state triggers"
            ],
            "Recovery": [
                "Schedule regular massage therapy",
                "Use compression therapy",
                "Implement meditation practices"
            ]
        }
    },
    balanced: {
        title: "The Holistic Harmonizer",
        description: "You understand the importance of balance in health optimization. Your approach combines traditional wisdom with modern science.",
        recommendations: {
            "Lifestyle Integration": [
                "Create morning and evening rituals",
                "Practice time-restricted eating",
                "Implement nature exposure routines"
            ],
            "Natural Solutions": [
                "Use adaptogenic herbs strategically",
                "Practice breathwork techniques",
                "Incorporate movement snacks"
            ],
            "Mind-Body Practices": [
                "Regular yoga or tai chi practice",
                "Mindfulness meditation",
                "Gratitude journaling"
            ]
        }
    },
    explorer: {
        title: "The Biohacking Pioneer",
        description: "You're drawn to cutting-edge health innovations. Your adventurous spirit helps you discover unique optimization strategies.",
        recommendations: {
            "Innovative Practices": [
                "Explore photobiomodulation therapy",
                "Try sensory deprivation tanks",
                "Experiment with new biofeedback tools"
            ],
            "Emerging Technologies": [
                "Test portable EEG devices",
                "Use EMF mitigation tools",
                "Try virtual reality therapy"
            ],
            "Novel Protocols": [
                "Implement hormetic stressors",
                "Test alternative sleep cycles",
                "Explore sound therapy"
            ]
        }
    },
    mindful: {
        title: "The Conscious Optimizer",
        description: "You prioritize sustainable, mindful approaches to health. Your thoughtful perspective helps create lasting changes.",
        recommendations: {
            "Mindful Practices": [
                "Develop a meditation routine",
                "Practice conscious breathing",
                "Implement digital wellness strategies"
            ],
            "Sustainable Health": [
                "Create environmental wellness spaces",
                "Use natural circadian rhythm optimization",
                "Practice intuitive movement"
            ],
            "Emotional Wellness": [
                "Heart rate variability training",
                "Regular journaling practice",
                "Stress adaptation techniques"
            ]
        }
    }
};

export function HealthQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState(false);
    const [profile, setProfile] = useState<string | null>(null);

    const calculateProfile = () => {
        const scores = {
            scientist: 0,
            optimized: 0,
            balanced: 0,
            explorer: 0,
            mindful: 0
        };

        Object.entries(answers).forEach(([question, answer]) => {
            switch(answer) {
                case 0:
                    scores.scientist += 2;
                    break;
                case 1:
                    scores.optimized += 2;
                    break;
                case 2:
                    scores.balanced += 2;
                    break;
                case 3:
                    scores.explorer += 2;
                    break;
                case 4:
                    scores.mindful += 2;
                    break;
            }
        });

        return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    };

    const handleOptionSelect = (index: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: index }));
    };

    const handleNext = () => {
        if (typeof answers[currentQuestion] === 'undefined') {
            alert('Please select an option before continuing');
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            const profileType = calculateProfile();
            setProfile(profileType);
            setShowResults(true);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-8 rounded-lg text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Discover Your Biohacking Profile</h1>
                <p className="text-lg">Get personalized recommendations for optimal health and performance</p>
            </div>

            {!showResults ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="h-2 bg-gray-200 rounded-full mb-6">
                        <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-blue-800 mb-6">
                            {questions[currentQuestion].question}
                        </h2>
                        <div className="space-y-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                                        ${answers[currentQuestion] === index 
                                            ? 'border-blue-600 bg-blue-600 text-white' 
                                            : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {currentQuestion > 0 && (
                            <button
                                onClick={handlePrev}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                        </button>
                    </div>
                </div>
            ) : profile && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">{profiles[profile].title}</h2>
                    <p className="text-gray-700 mb-8">{profiles[profile].description}</p>
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-blue-800">Your Personalized Optimization Plan</h3>
                        {Object.entries(profiles[profile].recommendations).map(([category, items]) => (
                            <div key={category} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                                <h4 className="text-lg font-semibold text-blue-800 mb-4">{category}</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {items.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
