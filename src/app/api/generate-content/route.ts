import { NextRequest, NextResponse } from 'next/server';
import { CareerData, TrackType } from '@/types';

export const dynamic = 'force-dynamic';

const TRACK_DATA: Record<TrackType, CareerData> = {
  'Game Design': {
    targetRole: 'Game Designer',
    selectedTrack: 'Game Design',
    totalXP: 1000,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      {
        id: 1,
        title: 'Game Design Fundamentals',
        xpRequired: 100,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'gd_1_1',
            title: 'Introduction to Game Design',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Learn the basics of game design principles',
            resources: ['https://example.com/video1'],
          },
          {
            id: 'gd_1_2',
            title: 'Game Mechanics Overview',
            xp: 25,
            isCompleted: false,
            type: 'article',
            description: 'Understanding core game mechanics',
            resources: ['https://example.com/article1'],
          },
        ],
      },
      {
        id: 2,
        title: 'Level Design Basics',
        xpRequired: 250,
        isUnlocked: false,
        isCompleted: false,
        tasks: [],
      },
    ],
  },
  'Game Asset Artist': {
    targetRole: 'Game Asset Artist',
    selectedTrack: 'Game Asset Artist',
    totalXP: 1000,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      {
        id: 1,
        title: 'Game Art Fundamentals',
        xpRequired: 100,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'gaa_1_1',
            title: 'Introduction to Game Art',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Learn the basics of game art and asset creation',
            resources: ['https://example.com/video1'],
          },
          {
            id: 'gaa_1_2',
            title: '2D and 3D Asset Creation',
            xp: 25,
            isCompleted: false,
            type: 'article',
            description: 'Understanding 2D and 3D asset creation for games',
            resources: ['https://example.com/article1'],
          },
        ],
      },
      {
        id: 2,
        title: '3D Modeling and Texturing',
        xpRequired: 250,
        isUnlocked: false,
        isCompleted: false,
        tasks: [],
      },
    ],
  },
  'Content Creation': {
    targetRole: 'Content Creator',
    selectedTrack: 'Content Creation',
    totalXP: 1000,
    currentXP: 0,
    currentLevel: 1,
    levels: [
      {
        id: 1,
        title: 'Content Creation Fundamentals',
        xpRequired: 100,
        isUnlocked: true,
        isCompleted: false,
        tasks: [
          {
            id: 'cc_1_1',
            title: 'Introduction to Content Creation',
            xp: 25,
            isCompleted: false,
            type: 'video',
            description: 'Learn the basics of content creation',
            resources: ['https://example.com/video1'],
          },
          {
            id: 'cc_1_2',
            title: 'Video Production and Streaming',
            xp: 25,
            isCompleted: false,
            type: 'article',
            description: 'Understanding video production and streaming platforms',
            resources: ['https://example.com/article1'],
          },
        ],
      },
      {
        id: 2,
        title: 'Social Media Strategy',
        xpRequired: 250,
        isUnlocked: false,
        isCompleted: false,
        tasks: [],
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track') as TrackType;

    if (!track || !TRACK_DATA[track]) {
      return NextResponse.json(
        { error: 'Invalid or missing track parameter' },
        { status: 400 }
      );
    }

    const careerData = TRACK_DATA[track];

    return NextResponse.json(careerData);
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}