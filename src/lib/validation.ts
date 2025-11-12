import { z } from 'zod';

// Career Progress Data Schema
export const CareerProgressDataSchema = z.object({
  user_id: z.string().uuid(),
  track: z.string(),
  data: z.object({
    totalXP: z.number().min(0),
    currentXP: z.number().min(0),
    completedTasks: z.array(z.string()),
    levels: z.array(z.object({
      id: z.number(),
      title: z.string(),
      xpRequired: z.number(),
      isUnlocked: z.boolean(),
      isCompleted: z.boolean(),
      tasks: z.array(z.object({
        id: z.string(),
        title: z.string(),
        xp: z.number(),
        isCompleted: z.boolean(),
        type: z.enum(['video', 'article', 'project']),
        description: z.string(),
        resources: z.array(z.string()),
      })),
    })),
  }),
});

// Analysis Response Schema
export const AnalysisResponseSchema = z.object({
  track: z.enum(['Game Design', 'Content Creation', 'Game Asset Artist']),
  reasoning: z.string(),
  scores: z.object({
    gameDesign: z.number().min(0).max(100),
    contentCreation: z.number().min(0).max(100),
    artDesign: z.number().min(0).max(100),
  }).optional(),
});

// Ultravox Session Schema
export const UltravoxSessionSchema = z.object({
  sessionId: z.string(),
  token: z.string(),
});

// User Profile Schema
export const UserProfileSchema = z.object({
  id: z.string(),
  user_id: z.string().uuid(),
  assigned_track: z.string().nullable(),
  career_data: z.any().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Runtime validation functions
export function validateCareerProgressData(data: unknown) {
  return CareerProgressDataSchema.parse(data);
}

export function validateAnalysisResponse(data: unknown) {
  return AnalysisResponseSchema.parse(data);
}

export function validateUltravoxSession(data: unknown) {
  return UltravoxSessionSchema.parse(data);
}

export function validateUserProfile(data: unknown) {
  return UserProfileSchema.parse(data);
}

// Type exports for use throughout the app
export type CareerProgressData = z.infer<typeof CareerProgressDataSchema>;
export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
export type UltravoxSession = z.infer<typeof UltravoxSessionSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
