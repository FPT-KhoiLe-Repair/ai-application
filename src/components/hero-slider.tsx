"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "flashcards",
    label: "AI Flashcards",
    eyebrow: "Study smarter with AI",
    titleMain: "An AI-powered workspace for",
    titleAccent: "creating smarter flashcards.",
    description:
      "Paste your notes, let the AI suggest questions, and review with a clean, focused interface. Designed for students who want less friction and more flow.",
    primaryCta: { label: "Go to Flashcards", href: "/flashcards" },
    secondaryCta: { label: "Customize Experience", href: "/flashcards/login" },
  },
  {
    id: "ai-tutor",
    label: "AI Study Companion",
    eyebrow: "Ask, explore, learn, understand",
    titleMain: "Your curious AI tutor for",
    titleAccent: "innovative learning.",
    description:
      "Chat with an AI tutor that not only just give answers, but guides you with questions, examples, and analogies tailored to how to learn.",
    primaryCta: { label: "Try the AI Tutor", href: "/ai-tutor" },
    secondaryCta: { label: "Learn More", href: "/ai-tutor#learn-more" },
  },
  {
    id: "study-planner",
    label: "Learning Paths",
    eyebrow: "From chaos to clarity",
    titleMain: "Plan your learning journey with",
    titleAccent: "smart, adaptive curricula",
    description:
      "Group topics, estimate effort, and let AI suggest a learning path that fits your time and goals. Great for self-study and project based learning.",
    primaryCta: { label: "Design a learning path", href: "/study-planner" },
    secondaryCta: { label: "View example roadmaps", href: "/study-planner#examples"},
  },
  {
    id: "learning-forum",
    label: "Learning Forum",
    eyebrow: "Collaborate, discuss, grow",
    titleMain: "Join a community-driven",
    titleAccent: "learning forum.",
    description:
      "Engage with fellow learners, share insights, ask questions, and grow together in a supportive environment designed to enhance your educational journey.",
    primaryCta: { label: "Visit the Learning Forum", href: "/learning-forum" },
    secondaryCta: { label: "Sign Up Now", href: "/learning-forum/signup" },
  }
];

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
}

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const current = slides[activeIndex];
  
  const [containerRef, containerVisible] = useScrollReveal();

  const goToNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

  // Auto-play (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Main Carousel Container */}
        <div
          ref={containerRef}
          className={`relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-1000 min-h-[620px] ${
            containerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Area with Slide Animation */}
          <div className="relative overflow-hidden">
            <div
              key={activeIndex}
              className={`p-8 md:p-12 lg:p-16 transition-all duration-500 ${
                direction === 'right' 
                  ? 'animate-[slideInRight_0.5s_ease-out]' 
                  : 'animate-[slideInLeft_0.5s_ease-out]'
              }`}
            >
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Eyebrow */}
                <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    {current.eyebrow}
                  </p>
                </div>

                {/* Title */}
                <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    {current.titleMain}
                    <br />
                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {current.titleAccent}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={current.primaryCta.href}
                      className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      {current.primaryCta.label}
                    </a>
                    {current.secondaryCta && (
                      <a
                        href={current.secondaryCta.href}
                        className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all duration-200"
                      >
                        {current.secondaryCta.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
                  <p className="text-sm text-slate-500">
                    No sign-up yet. Local demo for now — perfect for experimenting and
                    tweaking the UX of your AI education stack.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-slate-50 border-t border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm">
                  ✦ AI education ecosystem
                </span>
                <span className="rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm">
                  ✦ One workspace, multiple tools
                </span>
              </div>

              {/* Slide Counter */}
              <div className="text-sm font-medium text-slate-600">
                {activeIndex + 1} / {slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? "w-12 h-3 bg-linear-to-r from-blue-600 to-indigo-600"
                  : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}