"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    icons,
    Folder,
} from 'lucide-react';

import {
    mockDecks,
    mockUserStats,
    mockDailyReview,
    getTimeAgo,
    categoryColors,
    type Deck,
    type UserStats,
} from '@/lib/mockData';

import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function FlashcardDashboard() {
    const [decks] = useLocalStorage<Deck[]>("ielts_decks", mockDecks);
    const [stats] = useLocalStorage<UserStats>("user_stats", mockUserStats);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const recentDecks = [...decks]
        .sort((a, b) => new Date(b.lastStudied).getTime() - new Date(a.lastStudied).getTime())
        .slice(0, 4);
    return (
        <div className='flex h-screen bg-slate-50'>
            {/* Slidebar - Desktop */}
            <aside className='hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col'>
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
            <main className='flex-1 overflow-y-auto'>
                {/* Mobile Header */}
                <div className='lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10'>
                    <Button
                        variant={"ghost"}
                        size={"icon-sm"}
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <h1 className='text-lg font-bold text-slate-900'>Dashboard</h1>
                    <div className='w-8' />
                </div>
                
                <div className='max-w w-7xl mx-auto p-4 lg:p-8 space-y-8'>
                    {/* Hero Section */}
                    <section>
                        <div className='mb-6'>
                            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
                                Welcome back! 👋
                            </h1>
                            <p className='text-slate-600'>
                                Track your IELTS progress and continue your learning journey
                            </p>
                        </div>
                    
                    {/* Start Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <StatCard 
                            icon={<Target className='w-5 h-5 text-blue-600'/>}
                            label='Esimated Band'
                            value={stats.estimateBand}
                            suffix='↑'
                            bgColor='bg-blue-50'
                        />
                        <StatCard
                            icon={<Clock className='w-5 h-5 text-purple-600'/>}
                            label='Study Time'
                            value={`${stats.studyMinutes}m`}
                            bgColor='bg-purple-50'
                        />
                    </div>
                    </section>
                    {/* Daily Review Section */}
                    <section>
                            <Card className='border-blue-200 bg-blue-50' >
                            <CardContent className='p-6'>
                                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                                <div className='flex items-start gap-3'>
                                    <div className='p-2 bg-blue-100 rounded-lg'>
                                    <Sparkles className='w-6 h-6 text-blue-600'/>
                                    </div>
                                    <div>
                                    <h3 className='font-semibold text-slate-900'>
                                        Daily Review Ready - {mockDailyReview.title}
                                    </h3>
                                    <p className='text-sm text-slate-600'>
                                        Review {mockDailyReview.wordCount} words from your current studies
                                    </p>
                                    {/* <p className='text-sm text-shadow-amber-800'>
                                        {review.deckId}
                                    </p> */}
                                    </div>
                                </div>
                                <Button className='bg-blue-600 hover:bg-blue-700 text-white shrink-0'>
                                    Start Review
                                </Button>
                                </div>
                            </CardContent>
                            </Card>
                    </section>
                    {/* Recent Decks */}
                    <section>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-xl font-bold text-slate-900'>Recent Decks</h2>
                            <Button variant={"ghost"} size={"sm"} className='text-blue-600'>View All</Button>
                            <ChevronRight className='w-4 h-4 ml-1'/>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {recentDecks.map((deck) => (
                                <DeckCard key={deck.id} deck={deck}/>
                            ))}
                        </div>
                    </section>
                    {/* Quick Actions */}
                    <section>
                        <h2 className='text-xl font-bold text-slate-900 mb-4'>Quick Actions</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <QuickActionCard
                                icon={<Plus className='w-5 h-5'/>}
                                title="Upload PDF"
                                description='Import IELTS material'
                            />
                            <QuickActionCard 
                                icon={<Upload className='w-5 h-5'/>}
                                title="Upload PDF"
                                description='Import IELTS material'
                            />
                            <QuickActionCard
                                icon={<FolderOpen className='w-5 h-5'/>}
                                title='Organize Decks'
                                description='Create folder'
                            />
                        </div>
                    </section>
                </div>
            </main>
            {/* Floating Action Button */}
            <button 
                className='fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 hover:size-18 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group'
                aria-label='Create new deck'
            >
                <Plus className='w-6 h-5 transition-transform duration-200'/>
            </button>
        </div>
    )
}
function SidebarContent() {
    const navItems = [
        { icon: Home, label: 'Home', active: true, href: "/flashcards" },
        { icon: Library, label: 'Library', active: false, href: "/flashcards/library"},
        { icon: FolderOpen, label: 'Folder', active: false, href: "/flashcards/folder" },
        { icon: Bell, label: 'Notifications', active: false, href: "/flashcards/notifications" },
    ];
    return (
        <>
            <div className='p-6 border-b hidden lg:block'>
                <h2 className='text-lg font-bold text-slate-900'>NOVA AI</h2>
                <p className='text-sm text-slate-500 mt-1'>IELTS Flashcards</p>
            </div>

            <nav className='flex-1 p-4 space-y-1'>
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            item.active
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className='p-4 border-t'>
                <div className='bg-slate-50 rounded-lg p-4'>
                    <p className='text-xs font-semibold text-slate-900 mb-1'>
                        Weekly Goal
                    </p>
                    <div className='flex items-center gap-2'>
                        <div className='flex-1 h-2 bg-slate-200 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-blue-600 rounded-full transition-all duration-500'
                                style={{ width: `${(mockUserStats.streak / mockUserStats.weeklyGoal) * 100}%`}}
                                >
                            </div>
                            <span className='text-xs font-medium text-slate-600'>
                                {mockUserStats.streak} / {mockUserStats.weeklyGoal}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({
    icon,
    label,
    value,
    suffix,
    bgColor
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    suffix?: string;
    bgColor: string;
}) {
    return (
        <Card>
            <CardContent className='p-6'>
                <div className='flex items-center justify-between mb-3'>
                    <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
                </div>
                <p className='text-sm text-slate-600 mb-1'>{label}</p>
                <p className='text-2xl font-bold text-slate-900'>
                    {value} {suffix && <span className='text-lg'>{suffix}</span>}
                </p>
            </CardContent>
        </Card>
    )
}

function DeckCard({ deck }: { deck: Deck }){
    return (
        <Card className='hover:shadown-md transition-shadow cursor-pointer'>
            <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-3'>
                    <span 
                        className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[deck.category]}`}
                    >
                        {deck.category.toUpperCase()}
                    </span>
                    <span className='text-xs text-slate-500'>
                        {getTimeAgo(deck.lastStudied)}
                    </span>
                </div>
                <h3 className='font-semibold text-slate-900 mb-2 line-clamp-1'>
                    {deck.title}
                </h3>
                <p className='text-sm text-slate-600 mb-4 line-clamp-1'>
                    {deck.description}
                </p>
                
                <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-slate-600'>Progress</span>
                        <span className='font-medium text-slate-900'>
                            {deck.masteredCards}/{deck.totalCards}
                        </span>
                    </div>
                    <div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-green-500 rounded-full transition-all duration-500'
                            style={{ width: `${deck.progress}%`}}
                        />
                    </div>
                </div>

                <Button
                    variant={"outline"}
                    size={"sm"}
                    className='w-full mt-4'>Continue Studying
                </Button>
            </CardContent>
        </Card>
    )
}

function QuickActionCard({
    icon, 
    title,
    description
}: {
    icon: React.ReactNode,
    title: string;
    description: string;
}) {
    return (
        <Card className='hover:shadow-md transition-shadow cursor-pointer'>
            <CardContent className='p-6 text-center'>
                <div className='inline-flex p-3 bg-blue-50 rounded-full mb-3'>
                    <div className='text-blue-600'>{icon}</div>
                </div>
                <h3 className='font-semibold text-slate-900 mb-1'>{title}</h3>
                <p className='text-sm text-slate-600'>{description}</p>
            </CardContent>
        </Card>
    )
}