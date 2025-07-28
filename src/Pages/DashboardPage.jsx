// File: src/Pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import apiClient from '../api'; // Use your central API client

// Note: The Header is no longer imported or rendered here.
// It is now handled by the Layout.jsx component in your App router.

export default function DashboardPage() {
    // State for the form inputs
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    // State for the results and UI feedback
    const [candidates, setCandidates] = useState([]);
    const [isFetching, setIsFetching] = useState(true); // For the initial data load
    const [isSubmitting, setIsSubmitting] = useState(false); // For form submission process
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchCandidates = async () => {
        setIsFetching(true);
        try {
            const response = await apiClient.get('/candidates');
            setCandidates(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Failed to fetch candidates:', err);
            setError('Could not load screening history. Your session may have expired.');
            setCandidates([]);
        } finally {
            setIsFetching(false);
        }
    };

    // This hook runs fetchCandidates() once when the dashboard component first mounts
    useEffect(() => {
        fetchCandidates();
    }, []);

    // Handler for the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile || !jobDescription) {
            setError('Please provide both a job description and a resume file.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await apiClient.post('/screen', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess(`Successfully screened resume for ${response.data.candidateName || 'new candidate'}!`);
            
            // Instantly add the new candidate to the UI for a fast user experience
            const newCandidate = response.data;
            setCandidates(prevCandidates => [newCandidate, ...prevCandidates]);
            
            // Clear the form for the next submission
            setJobDescription('');
            setResumeFile(null);
            e.target.reset();

        } catch (err)
        {
            console.error('Screening submission failed:', err);
            setError(err.response?.data?.message || 'An unknown error occurred during screening.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 75) return '#198754';
        if (score >= 50) return '#ffc107';
        return '#dc3545';
    };

    return (
        <main className="container">
            {error && <div className="alert error-alert" role="alert">{error}</div>}
            {success && <div className="alert success-alert" role="alert">{success}</div>}

            {/* Form Card */}
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Screen a New Candidate</h2>
                    <div className="form-group">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea
                            id="jobDescription"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            rows="8"
                            placeholder="Paste the job description here..."
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resume">Candidate's Resume (PDF)</label>
                        <input
                            type="file"
                            id="resume"
                            accept=".pdf"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                </form>
            </div>

            {/* Results Card */}
            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Screening History</h2>
                {isFetching ? (
                     <p className="no-results">Loading history...</p>
                ) : candidates.length === 0 ? (
                    <p className="no-results">No resumes have been screened yet.</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>Candidate Name</th>
                                    <th>Match Score</th>
                                    <th>AI Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate) => (
                                    <tr key={candidate.id}>
                                        <td data-label="Candidate Name"><strong>{candidate.candidateName || 'N/A'}</strong></td>
                                        <td data-label="Match Score">
                                            <div className="progress-bar-container">
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: `${candidate.score || 0}%`, backgroundColor: getScoreColor(candidate.score || 0) }}
                                                >
                                                    {candidate.score || 0}%
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="AI Feedback">{candidate.feedback || 'No feedback available.'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}