import React, { useState } from 'react';

const Survey = () => {
  const [showNewSurvey, setShowNewSurvey] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [surveys, setSurveys] = useState([]);
  const [surveyForm, setSurveyForm] = useState({
    campaignName: '',
    maxResponseTime: '5 secs',
    introduction: '',
    questions: [
      {
        id: 1,
        type: 'Yes/No',
        title: '',
        keypress: {
          1: 'Yes',
          2: 'No'
        },
        audioFile: null
      }
    ],
    thankYouMessage: ''
  });

  const resetForm = () => {
    setSurveyForm({
      campaignName: '',
      maxResponseTime: '5 secs',
      introduction: '',
      questions: [
        {
          id: 1,
          type: 'Yes/No',
          title: '',
          keypress: {
            1: 'Yes',
            2: 'No'
          },
          audioFile: null
        }
      ],
      thankYouMessage: ''
    });
  };

  const handleAddQuestion = () => {
    setSurveyForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        id: prev.questions.length + 1,
        type: 'Yes/No',
        title: '',
        keypress: {
          1: 'Yes',
          2: 'No'
        },
        audioFile: null
      }]
    }));
  };

  const handleCreateSurvey = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!surveyForm.campaignName.trim()) {
      alert('Please enter a campaign name');
      return;
    }

    if (!surveyForm.introduction.trim()) {
      alert('Please enter an introduction message');
      return;
    }

    const hasInvalidQuestions = surveyForm.questions.some(q => !q.title.trim());
    if (hasInvalidQuestions) {
      alert('Please fill in all question titles');
      return;
    }

    if (!surveyForm.thankYouMessage.trim()) {
      alert('Please enter a thank you message');
      return;
    }

    // Create new survey
    const newSurvey = {
      id: Date.now(),
      ...surveyForm,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    // Add to surveys list
    setSurveys(prev => [...prev, newSurvey]);

    // Reset form and close modal
    resetForm();
    setShowNewSurvey(false);

    // Show success message
    alert('Survey created successfully!');
  };

  const handleFileUpload = (questionIndex, file) => {
    if (file) {
      const newQuestions = [...surveyForm.questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        audioFile: file
      };
      setSurveyForm({ ...surveyForm, questions: newQuestions });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Survey Campaigns</h1>
        <button
          onClick={() => setShowNewSurvey(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Survey
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search surveys..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center gap-4">
          <select className="px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
          <button className="text-gray-500 hover:text-gray-700">Clear filters</button>
        </div>
      </div>

      {/* Surveys List or No Surveys State */}
      {surveys.length > 0 ? (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {surveys.map((survey) => (
                <tr key={survey.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{survey.campaignName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {survey.questions.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {survey.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="max-w-sm mx-auto">
            <div className="mb-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first survey campaign</p>
            <button
              onClick={() => setShowNewSurvey(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Survey
            </button>
          </div>
        </div>
      )}

      {/* New Survey Modal */}
      {showNewSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[1000px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create survey</h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowNewSurvey(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateSurvey} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign name</label>
                  <input
                    type="text"
                    value={surveyForm.campaignName}
                    onChange={(e) => setSurveyForm({...surveyForm, campaignName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter campaign name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max response time per question</label>
                  <select
                    value={surveyForm.maxResponseTime}
                    onChange={(e) => setSurveyForm({...surveyForm, maxResponseTime: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>5 secs</option>
                    <option>10 secs</option>
                    <option>15 secs</option>
                    <option>20 secs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                <input
                  type="text"
                  value={surveyForm.introduction}
                  onChange={(e) => setSurveyForm({...surveyForm, introduction: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter introduction text"
                  required
                />
              </div>

              {surveyForm.questions.map((question, index) => (
                <div key={question.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">QUESTION - {question.id}</h3>
                    {index === surveyForm.questions.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="text-green-600 hover:text-green-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question type</label>
                      <select
                        value={question.type}
                        onChange={(e) => {
                          const newQuestions = [...surveyForm.questions];
                          newQuestions[index] = {...question, type: e.target.value};
                          setSurveyForm({...surveyForm, questions: newQuestions});
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option>Yes/No</option>
                        <option>Multiple Choice</option>
                        <option>Rating</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Keypress</label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 flex items-center justify-center border rounded-lg">1</span>
                            <span>Yes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 flex items-center justify-center border rounded-lg">2</span>
                            <span>No</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question title</label>
                      <input
                        type="text"
                        value={question.title}
                        onChange={(e) => {
                          const newQuestions = [...surveyForm.questions];
                          newQuestions[index] = {...question, title: e.target.value};
                          setSurveyForm({...surveyForm, questions: newQuestions});
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter question title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question recording</label>
                      <label className="w-full px-4 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 cursor-pointer">
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(index, e.target.files[0])}
                        />
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {question.audioFile ? question.audioFile.name : 'Upload audio'}
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thank you</label>
                <input
                  type="text"
                  value={surveyForm.thankYouMessage}
                  onChange={(e) => setSurveyForm({...surveyForm, thankYouMessage: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter thank you message"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowNewSurvey(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;