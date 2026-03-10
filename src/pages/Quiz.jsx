import { useState } from 'react';
import { quizData } from '../data/quizData';
import { CheckCircle2, ChevronRight, RefreshCcw, AlertTriangle } from 'lucide-react';

export function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (index) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        selectedAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswerIndex) {
                score++;
            }
        });
        return score;
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers(Array(quizData.length).fill(null));
        setShowResults(false);
    };

    if (showResults) {
        const score = calculateScore();
        const percentage = Math.round((score / quizData.length) * 100);
        let message = '';
        if (percentage >= 80) message = 'Excellent Job! You are a Revit Family Master.';
        else if (percentage >= 50) message = 'Good Effort! Keep practicing your Revit Family skills.';
        else message = 'Needs Improvement. We recommend reviewing the core concepts.';

        return (
            <div style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '4rem 2rem' }}>
                    <CheckCircle2 size={64} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Quiz Completed!</h1>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '1rem' }}>
                        {score} / {quizData.length}
                    </div>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        {percentage}% - {message}
                    </p>
                    <button onClick={resetQuiz} style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto',
                        padding: '1rem 2rem', background: 'var(--text-primary)', color: 'white',
                        border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '600',
                        cursor: 'pointer', transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <RefreshCcw size={20} /> Retake Quiz
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData[currentQuestionIndex];
    const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== null;

    return (
        <div style={{ padding: '2rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                        Revit Family Creation Quiz
                    </h1>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Question {currentQuestionIndex + 1} of {quizData.length}
                    </p>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                        <span>Progress</span>
                        <span>{Math.round(((currentQuestionIndex) / quizData.length) * 100)}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${(currentQuestionIndex / quizData.length) * 100}%`,
                            height: '100%',
                            background: 'var(--accent)',
                            transition: 'width 0.3s ease'
                        }}></div>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }}></div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                        {currentQuestion.questionEn}
                    </h2>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: '500', margin: 0, lineHeight: 1.5 }}>
                        {currentQuestion.questionMy}
                    </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentQuestion.optionsEn.map((optionEn, index) => {
                        const isSelected = selectedAnswers[currentQuestionIndex] === index;
                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem',
                                    padding: '1.25rem',
                                    background: isSelected ? 'rgba(225, 29, 72, 0.05)' : 'white',
                                    border: `2px solid ${isSelected ? 'var(--accent)' : 'rgba(0,0,0,0.08)'}`,
                                    borderRadius: '12px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isSelected ? '0 4px 12px rgba(225, 29, 72, 0.1)' : '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: isSelected ? '600' : '500', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                                    {optionEn}
                                </span>
                                <span style={{ fontSize: '0.95rem', color: isSelected ? 'var(--accent)' : 'var(--text-secondary)', opacity: 0.8 }}>
                                    {currentQuestion.optionsMy[index]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        padding: '1rem 2rem', border: 'none', background: 'rgba(0,0,0,0.05)',
                        color: currentQuestionIndex === 0 ? 'rgba(0,0,0,0.2)' : 'var(--text-primary)',
                        borderRadius: '8px', fontSize: '1rem', fontWeight: '600',
                        cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={!hasAnsweredCurrent}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '1rem 2.5rem', border: 'none',
                        background: hasAnsweredCurrent ? 'var(--accent)' : 'rgba(0,0,0,0.1)',
                        color: hasAnsweredCurrent ? 'white' : 'white',
                        borderRadius: '8px', fontSize: '1rem', fontWeight: '600',
                        cursor: hasAnsweredCurrent ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        boxShadow: hasAnsweredCurrent ? '0 4px 12px rgba(225, 29, 72, 0.25)' : 'none'
                    }}
                >
                    {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next'} <ChevronRight size={20} />
                </button>
            </div>

            {!hasAnsweredCurrent && (
                <p style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Please select an answer to continue.
                </p>
            )}
        </div>
    );
}
