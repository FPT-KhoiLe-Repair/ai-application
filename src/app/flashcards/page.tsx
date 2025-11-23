// src/app/flashcards/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Library,
  FolderOpen,
  Bell,
  Plus,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  ChevronRight,
  Upload,
  Sparkles,
  Menu,
  X,
  MessageCircle,
  Lightbulb,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  mockDecks,
  mockUserStats,
  mockUserTargets,
  mockDailyReview,
  getTimeAgo,
  categoryColors,
  type Deck,
  type UserStats,
  type UserTargets,
} from "@/lib/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FlashcardDashboard() {
  const [decks] = useLocalStorage<Deck[]>("ielts_decks", mockDecks);
  const [stats, setStats] = useLocalStorage<UserStats>("user_stats", mockUserStats);
  const [targets, setTargets] = useLocalStorage<UserTargets>("user_targets", mockUserTargets);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const recentDecks = [...decks]
    .sort((a, b) => new Date(b.lastStudied).getTime() - new Date(a.lastStudied).getTime())
    .slice(0, 4);

  // AI Recommendations: Suggest decks from weakest category
  const categoryProgress = decks.reduce((acc, deck) => {
    if (!acc[deck.category]) acc[deck.category] = { total: 0, mastered: 0, decks: [] };
    acc[deck.category].total += deck.totalCards;
    acc[deck.category].mastered += deck.masteredCards;
    acc[deck.category].decks.push(deck);
    return acc;
  }, {} as Record<string, { total: number; mastered: number; decks: Deck[] }>);

  const weakestCategory = Object.entries(categoryProgress)
    .map(([cat, data]) => ({
      category: cat,
      progress: (data.mastered / data.total) * 100,
      decks: data.decks,
    }))
    .sort((a, b) => a.progress - b.progress)[0];

  const recommendations = weakestCategory?.decks.slice(0, 2) || [];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-slate-900">NOVA AI</h2>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          <div className="w-8" />
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
          {/* Hero Section */}
          <section>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-slate-600">
                Track your IELTS progress and continue your learning journey
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
                label="Study Streak"
                value={`${stats.streak}`}
                target={`${targets.streakTarget} days`}
                suffix="🔥"
                bgColor="bg-orange-50"
              />
              <StatCard
                icon={<BookOpen className="w-5 h-5 text-green-600" />}
                label="Mastered Words"
                value={stats.totalMastered}
                target={`${targets.totalWordsMasteredTarget} words`}
                bgColor="bg-green-50"
              />
              <StatCard
                icon={<Target className="w-5 h-5 text-blue-600" />}
                label="Estimated Band"
                value={stats.estimatedBand.toFixed(1)}
                target={targets.estimatedBandTarget.toFixed(1)}
                bgColor="bg-blue-50"
              />
              <StatCard
                icon={<Clock className="w-5 h-5 text-purple-600" />}
                label="Study Time"
                value={`${stats.studyMinutes}m`}
                target={`${targets.studyMinutesTarget}m`}
                bgColor="bg-purple-50"
              />
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <QuickActionCard
                icon={<Plus className="w-5 h-5" />}
                title="Create Deck"
                description="Start from scratch"
              />
              <QuickActionCard
                icon={<Upload className="w-5 h-5" />}
                title="Upload PDF"
                description="AI generates flashcards"
              />
              <QuickActionCard
                icon={<FolderOpen className="w-5 h-5" />}
                title="Organize Decks"
                description="Create folders"
              />
            </div>
          </section>

          {/* Daily Review Section */}
          <section>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        Daily Review Ready
                      </h3>
                      <p className="text-sm text-slate-600">
                        Review {mockDailyReview.wordCount} words from your recent studies
                      </p>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                    Start Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AI Recommendations Section */}
          {recommendations.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900">
                  Recommended for You
                </h2>
              </div>
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-700 mb-4">
                    💡 <strong>AI Insight:</strong> Your {weakestCategory.category} skills need
                    attention (
                    {Math.round(weakestCategory.progress)}% mastered). Try these decks:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((deck) => (
                      <div
                        key={deck.id}
                        className="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              categoryColors[deck.category]
                            }`}
                          >
                            {deck.category.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-500">
                            {deck.totalCards} cards
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1 text-sm">
                          {deck.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {deck.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-3 text-amber-700 hover:text-amber-800 hover:bg-amber-100"
                        >
                          Start Learning
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Recent Decks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Decks</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentDecks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Floating AI Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="AI Chat Assistant"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* AI Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              AI Study Assistant
            </DialogTitle>
            <DialogDescription>
              Ask me anything about IELTS vocabulary, study tips, or deck
              recommendations!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Mock Chat Messages */}
            <div className="bg-slate-50 rounded-lg p-4 max-h-[300px] overflow-y-auto space-y-3">
              <div className="bg-blue-100 rounded-lg p-3 text-sm">
                <p className="font-semibold text-blue-900 mb-1">AI Assistant</p>
                <p className="text-slate-700">
                  Hi! I noticed you are working on{" "}
                  <strong>{recentDecks[0]?.title}</strong>. Great progress! 🎉
                  How can I help you today?
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  Try asking:
                </p>
                <button className="w-full text-left text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded p-2 transition-colors">
                  💡 What words should I focus on for Band 7?
                </button>
                <button className="w-full text-left text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded p-2 transition-colors">
                  📚 Recommend decks for {weakestCategory?.category}
                </button>
                <button className="w-full text-left text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded p-2 transition-colors">
                  🎯 Create a study plan for this week
                </button>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about IELTS vocab..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                className="bg-blue-600 hover:bg-blue-700 shrink-0"
                disabled={!chatInput.trim()}
              >
                Send
              </Button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              🚧 AI integration coming soon! This is a preview of the interface.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SidebarContent() {
  const navItems = [
    { icon: Home, label: "Home", active: true, href: "/flashcards" },
    { icon: Library, label: "Library", active: false, href: "/flashcards/library" },
    { icon: FolderOpen, label: "Folders", active: false, href: "/flashcards/folders" },
    { icon: Bell, label: "Notifications", active: false, href: "/flashcards/notifications" },
  ];

  return (
    <>
      <div className="p-6 border-b hidden lg:block">
        <h2 className="text-lg font-bold text-slate-900">NOVA AI</h2>
        <p className="text-xs text-slate-500 mt-1">IELTS Flashcards</p>
      </div>
      
      {/* Weekly Goal */}
      <div className="p-4 border-t">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-900 mb-1">
            Weekly Goal
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{
                  width: `${(mockUserStats.streak / mockUserTargets.weeklyStreakTarget) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-medium text-slate-600">
              {mockUserStats.streak}/{mockUserTargets.weeklyStreakTarget}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  target,
  suffix,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  target: string | number;
  suffix?: string;
  bgColor: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
        </div>
        <p className="text-sm text-slate-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">
          {value} / {target} {suffix && <span className="text-lg">{suffix}</span>}
        </p>
      </CardContent>
    </Card>
  );
}

function DeckCard({ deck }: { deck: Deck }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              categoryColors[deck.category]
            }`}
          >
            {deck.category.toUpperCase()}
          </span>
          <span className="text-xs text-slate-500">
            {getTimeAgo(deck.lastStudied)}
          </span>
        </div>

        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
          {deck.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-1">
          {deck.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-medium text-slate-900">
              {deck.masteredCards}/{deck.totalCards}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${deck.progress}%` }}
            />
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4">
          Continue Studying
        </Button>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6 text-center">
        <div className="inline-flex p-3 bg-blue-50 rounded-full mb-3">
          <div className="text-blue-600">{icon}</div>
        </div>
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}