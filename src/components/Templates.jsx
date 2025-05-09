import React, { useState } from 'react';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    message: ''
  });
  
  // Store templates in state
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Default Template',
      message: 'Dear {Contact name}, This is {Agent name} calling from {Organization name}. We tri...',
      createdAt: new Date().toISOString()
    }
  ]);

  const variables = [
    'Contact name',
    'Contact phone number',
    'Agent name',
    'Organization name'
  ];

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNewTemplate = () => {
    setShowNewTemplateDialog(true);
    setNewTemplate({ name: '', message: '' });
  };

  const handleCloseDialog = () => {
    setShowNewTemplateDialog(false);
    setNewTemplate({ name: '', message: '' });
  };

  const handleCreateTemplate = () => {
    // Validate required fields
    if (!newTemplate.name.trim()) {
      alert('Please enter a template name');
      return;
    }

    if (!newTemplate.message.trim()) {
      alert('Please enter a message');
      return;
    }

    // Create new template with unique ID
    const newTemplateData = {
      id: Date.now(),
      ...newTemplate,
      createdAt: new Date().toISOString()
    };

    // Add to templates list
    setTemplates(prev => [...prev, newTemplateData]);

    // Reset form and close dialog
    handleCloseDialog();

    // Show success message
    alert('Template created successfully!');
  };

  const handleInsertVariable = (variable) => {
    const insertText = `{${variable}}`;
    setNewTemplate(prev => ({
      ...prev,
      message: prev.message + insertText
    }));
    setShowVariableDropdown(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Templates</h1>

      {/* Search and New Template */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg 
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <button
          onClick={handleNewTemplate}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          New template
        </button>
      </div>

      {/* Templates Table */}
      <div className="bg-white rounded-lg border">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Template name
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Message
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Created on
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTemplates.map((template) => (
              <tr 
                key={template.id}
                className="hover:bg-gray-50"
              >
                <td className="py-4 px-6 text-sm text-gray-900">
                  {template.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {template.message}
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {new Date(template.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-sm text-right">
                  <button 
                    onClick={() => setSelectedTemplate(template)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <span className="mx-2 text-gray-300">|</span>
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this template?')) {
                        setTemplates(prev => prev.filter(t => t.id !== template.id));
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedTemplates.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No templates found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm text-gray-600"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredTemplates.length > 0
                ? `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                    currentPage * rowsPerPage,
                    filteredTemplates.length
                  )} of ${filteredTemplates.length}`
                : '0-0 of 0'}
            </span>
            <div className="flex gap-1">
              <button 
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
              <button 
                className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage * rowsPerPage >= filteredTemplates.length}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Template Dialog */}
      {showNewTemplateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-20 z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">New template</h2>
              <button 
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter template name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={newTemplate.message}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    placeholder="Enter message or type '@' to insert variables"
                    required
                  />
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={() => setShowVariableDropdown(!showVariableDropdown)}
                      className="absolute right-2 bottom-2 text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium"
                    >
                      Insert Variable
                      <svg className={`w-4 h-4 transform transition-transform ${showVariableDropdown ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {showVariableDropdown && (
                      <div className="absolute right-0 bottom-10 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
                        {variables.map((variable) => (
                          <button
                            key={variable}
                            type="button"
                            onClick={() => handleInsertVariable(variable)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {variable}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDialog}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;