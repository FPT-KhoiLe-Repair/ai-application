export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    mastered: boolean;
};

export interface Deck {
    id: string;
    title: string;
    description: string;
    totalCards: number;
    masteredCards: number;
    progress: number; // percentage of mastered cards
    thumbnail: string;
    category: 'reading' | 'writing' | 'listening' | 'speaking';
    lastStudied: string;
    createdAt: string;
};

export interface UserStats {
    streak: number;
    totalMastered: number;
    estimatedBand: number;
    studyMinutes: number;
    weeklyGoal: number;
};

// Mock User Stats
export const mockUserStats: UserStats = {
    streak: 3,
    totalMastered: 120,
    estimatedBand: 6.5,
    studyMinutes: 245,
    weeklyGoal: 7,
};

export interface UserTargets {
    streakTarget: number;
    weeklyStreakTarget: number;
    totalWordsMasteredTarget: number;
    estimatedBandTarget: number;
    studyMinutesTarget: number;
};

export const mockUserTargets: UserTargets = {
    streakTarget: 200,
    weeklyStreakTarget: 7,
    totalWordsMasteredTarget: 500,
    estimatedBandTarget: 7.5,
    studyMinutesTarget: 300,
};

export interface DailyReview {
    id: string;
    title: string;
    wordCount: number;
    deckId: string;
};

// Mock IELTS Decks
export const mockDecks: Deck[] = [
  {
    id: 'deck-1',
    title: 'Cambridge IELTS 19 - Reading Test 1',
    description: 'Academic vocabulary from Cambridge official practice test',
    totalCards: 50,
    masteredCards: 35,
    progress: 70,
    thumbnail: '/api/placeholder/400/200',
    category: 'reading',
    lastStudied: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'deck-2',
    title: 'Essential Band 7 Vocabulary',
    description: 'High-frequency words for achieving Band 7+',
    totalCards: 100,
    masteredCards: 45,
    progress: 45,
    thumbnail: '/api/placeholder/400/200',
    category: 'writing',
    lastStudied: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'deck-3',
    title: 'Academic Word List - Sublist 1',
    description: 'AWL words commonly used in IELTS academic tasks',
    totalCards: 60,
    masteredCards: 52,
    progress: 87,
    thumbnail: '/api/placeholder/400/200',
    category: 'writing',
    lastStudied: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'deck-4',
    title: 'IELTS Speaking Part 2 - Topic Vocabulary',
    description: 'Common topics and expressions for Speaking test',
    totalCards: 40,
    masteredCards: 18,
    progress: 45,
    thumbnail: '/api/placeholder/400/200',
    category: 'speaking',
    lastStudied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'deck-5',
    title: 'Collocations for Band 8',
    description: 'Advanced collocations to boost your writing score',
    totalCards: 75,
    masteredCards: 0,
    progress: 0,
    thumbnail: '/api/placeholder/400/200',
    category: 'writing',
    lastStudied: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Daily Review Suggestions
export const mockDailyReview: DailyReview=
    {
        id: 'review-1',
        title: 'Cambridge IELTS 19',
        wordCount: 20,
        deckId: 'deck-1',
    }

// Helper to get time ago string
export function getTimeAgo(dateString: string): string {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    const diffInMs = now - past;
    const diffMins = Math.floor(diffInMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
        return `${diffMins} minute(s) ago`;
    }
    if (diffHours < 24) {
        return `${diffHours} hour(s) ago`;
    }
    if (diffDays === 1) {
        return `Yesterday`;
    }
    if (diffDays < 7) {
        return `${diffDays} day(s) ago`;
    }
    return new Date(dateString).toLocaleDateString();
}

// Category colors
export const categoryColors = {
    reading: 'bg-blue-100 text-blue-700',
    writing: 'bg-green-100 text-purple-700',
    listening: 'bg-yellow-100 text-green-700',
    speaking: 'bg-red-100 text-orange-700',
}