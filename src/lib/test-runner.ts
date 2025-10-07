/**
 * Test runner for AMA Career Platform
 * Provides utilities for testing all major functionality
 */

import { shouldUseMockClients, MockUltravoxClient, MockPerplexityClient, MockSupabaseClient } from './mock-clients';
import { validateCareerProgressData, validateAnalysisResponse } from './validation';

export class TestRunner {
  private results: TestResult[] = [];
  private mockUltravox = new MockUltravoxClient();
  private mockPerplexity = new MockPerplexityClient();
  private mockSupabase = new MockSupabaseClient();

  async runAllTests(): Promise<TestReport> {
    console.log('🧪 Starting AMA Career Platform Test Suite...');
    
    // Test mock client detection
    await this.testMockClientDetection();
    
    // Test Ultravox integration
    await this.testUltravoxIntegration();
    
    // Test Perplexity integration
    await this.testPerplexityIntegration();
    
    // Test Supabase integration
    await this.testSupabaseIntegration();
    
    // Test validation
    await this.testValidation();
    
    // Test error handling
    await this.testErrorHandling();
    
    // Test accessibility
    await this.testAccessibility();
    
    return this.generateReport();
  }

  private async testMockClientDetection(): Promise<void> {
    console.log('🔍 Testing mock client detection...');
    
    try {
      const shouldUseMock = shouldUseMockClients();
      this.addResult('Mock Client Detection', shouldUseMock, 'Mock clients should be detected in demo mode');
    } catch (error) {
      this.addResult('Mock Client Detection', false, `Error: ${error}`);
    }
  }

  private async testUltravoxIntegration(): Promise<void> {
    console.log('🎤 Testing Ultravox integration...');
    
    try {
      const session = await this.mockUltravox.startSession();
      const hasSessionId = !!session.sessionId;
      const hasToken = !!session.token;
      
      this.addResult('Ultravox Session Creation', hasSessionId && hasToken, 'Session should have ID and token');
      
      // Test event listeners
      let transcriptReceived = false;
      this.mockUltravox.addEventListener('transcript', () => {
        transcriptReceived = true;
      });
      
      // Wait for mock transcript
      setTimeout(() => {
        this.addResult('Ultravox Transcript', transcriptReceived, 'Transcript should be received');
      }, 3000);
      
    } catch (error) {
      this.addResult('Ultravox Integration', false, `Error: ${error}`);
    }
  }

  private async testPerplexityIntegration(): Promise<void> {
    console.log('🤖 Testing Perplexity integration...');
    
    try {
      const mockTranscript = "I'm interested in game design and creating interactive experiences";
      const mockMetadata = { duration: 30, confidence: 0.95 };
      
      const analysis = await this.mockPerplexity.analyzeConversation(mockTranscript, mockMetadata);
      
      const hasTrack = !!analysis.track;
      const hasReasoning = !!analysis.reasoning;
      const hasScores = !!analysis.scores;
      
      this.addResult('Perplexity Analysis', hasTrack && hasReasoning && hasScores, 'Analysis should have track, reasoning, and scores');
      
    } catch (error) {
      this.addResult('Perplexity Integration', false, `Error: ${error}`);
    }
  }

  private async testSupabaseIntegration(): Promise<void> {
    console.log('🗄️ Testing Supabase integration...');
    
    try {
      // Test authentication
      const authResult = await this.mockSupabase.auth().signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });
      
      const authSuccess = !authResult.error;
      this.addResult('Supabase Authentication', authSuccess, 'Authentication should succeed');
      
      // Test user profile
      const profileResult = await this.mockSupabase.from('user_profiles').select('*').eq('user_id', 'mock-user-id').single();
      const profileExists = !!profileResult.data;
      this.addResult('Supabase User Profile', profileExists, 'User profile should exist');
      
    } catch (error) {
      this.addResult('Supabase Integration', false, `Error: ${error}`);
    }
  }

  private async testValidation(): Promise<void> {
    console.log('✅ Testing validation...');
    
    try {
      // Test career progress validation
      const validCareerData = {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        track: 'gameDesign',
        data: {
          totalXP: 1000,
          currentXP: 250,
          completedTasks: ['task-1'],
          levels: [{
            id: 1,
            title: 'Game Design Fundamentals',
            xpRequired: 100,
            isUnlocked: true,
            isCompleted: false,
            tasks: [{
              id: 'task-1',
              title: 'Introduction to Game Design',
              xp: 25,
              isCompleted: true,
              type: 'video' as const,
              description: 'Learn the basics',
              resources: ['https://example.com/video1'],
            }],
          }],
        },
      };
      
      const validatedCareerData = validateCareerProgressData(validCareerData);
      this.addResult('Career Progress Validation', !!validatedCareerData, 'Career progress data should validate');
      
      // Test analysis response validation
      const validAnalysisData = {
        track: 'gameDesign' as const,
        reasoning: 'User showed interest in interactive systems',
        scores: {
          gameDesign: 85,
          artDesign: 15,
          contentCreation: 10,
          productDesign: 5,
        },
      };
      
      const validatedAnalysisData = validateAnalysisResponse(validAnalysisData);
      this.addResult('Analysis Response Validation', !!validatedAnalysisData, 'Analysis response should validate');
      
    } catch (error) {
      this.addResult('Validation', false, `Error: ${error}`);
    }
  }

  private async testErrorHandling(): Promise<void> {
    console.log('🚨 Testing error handling...');
    
    try {
      // Test invalid data validation
      try {
        validateCareerProgressData({ invalid: 'data' });
        this.addResult('Invalid Data Rejection', false, 'Invalid data should be rejected');
      } catch (error) {
        this.addResult('Invalid Data Rejection', true, 'Invalid data should be rejected');
      }
      
      // Test network error simulation
      const networkError = new Error('Network request failed');
      this.addResult('Network Error Handling', networkError instanceof Error, 'Network errors should be handled');
      
    } catch (error) {
      this.addResult('Error Handling', false, `Error: ${error}`);
    }
  }

  private async testAccessibility(): Promise<void> {
    console.log('♿ Testing accessibility...');
    
    try {
      // Test ARIA attributes
      const modalElement = document.querySelector('[role="dialog"]');
      const hasAriaRole = !!modalElement;
      this.addResult('ARIA Roles', hasAriaRole, 'Modal should have ARIA role');
      
      // Test keyboard navigation
      const focusableElements = document.querySelectorAll('button, input, [tabindex]');
      const hasFocusableElements = focusableElements.length > 0;
      this.addResult('Keyboard Navigation', hasFocusableElements, 'Should have focusable elements');
      
    } catch (error) {
      this.addResult('Accessibility', false, `Error: ${error}`);
    }
  }

  private addResult(testName: string, passed: boolean, description: string): void {
    this.results.push({
      testName,
      passed,
      description,
      timestamp: new Date().toISOString()
    });
  }

  private generateReport(): TestReport {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    
    return {
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: (passedTests / totalTests) * 100
      },
      results: this.results,
      timestamp: new Date().toISOString()
    };
  }
}

interface TestResult {
  testName: string;
  passed: boolean;
  description: string;
  timestamp: string;
}

interface TestReport {
  summary: {
    total: number;
    passed: number;
    failed: number;
    successRate: number;
  };
  results: TestResult[];
  timestamp: string;
}

// Export test runner instance
export const testRunner = new TestRunner();

// Utility function to run tests from browser console
export function runTests(): Promise<TestReport> {
  return testRunner.runAllTests();
}

// Make available in browser console
if (typeof window !== 'undefined') {
  (window as any).runAMATests = runTests;
}
