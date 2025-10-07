'use client';

import { useState } from 'react';
import { TestRunner, TestReport } from '@/lib/test-runner';

export function TestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    try {
      const runner = new TestRunner();
      const report = await runner.runAllTests();
      setTestReport(report);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open test panel"
      >
        🧪 Run Tests
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Test Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close test panel"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>

        {testReport && (
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Results: {testReport.summary.passed}/{testReport.summary.total} passed
              ({testReport.summary.successRate.toFixed(1)}%)
            </div>
            
            <div className="max-h-48 overflow-y-auto space-y-1">
              {testReport.results.map((result, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    result.passed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <div className="font-medium">
                    {result.passed ? '✅' : '❌'} {result.testName}
                  </div>
                  <div className="text-gray-600">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
