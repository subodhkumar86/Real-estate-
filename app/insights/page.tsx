"use client";
import { useState } from "react";
import { Sparkles, Clock, ArrowUpRight, Share2, ArrowLeft } from "lucide-react";
import { blogs, BlogPost } from "../../data/blogs";

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const filtered = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <main className="bg-[#060d09] text-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="border-b border-white/10 bg-[#08130d] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles size={15} />
            <span>The InvestInPro Journal · Market Intelligence</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4">
            Market <em>perspectives.</em>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Data-backed whitepapers, macro infrastructure catalysts, and institutional real estate perspectives shaping NCR capital deployment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-white/10">
          {["All", "Infrastructure", "Perspective", "Market Guide", "Commercial"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedArticle(null);
              }}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'gold-btn-luxury text-[#07100b] font-bold shadow-[0_2px_12px_rgba(198,161,91,0.35)]'
                  : 'bg-[#09150e]/90 text-gray-300 border border-white/10 hover:border-[#c6a15b]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* If an article is clicked to read full story */}
        {selectedArticle ? (
          <article className="max-w-4xl mx-auto premium-surface p-5 sm:p-10 lg:p-12 animate-fadeIn space-y-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs uppercase tracking-widest text-[#c6a15b] hover:text-white flex items-center gap-2 cursor-pointer pb-4 border-b border-white/10 w-full"
            >
              <ArrowLeft size={14} />
              <span>Back to All Articles</span>
            </button>

            <div>
              <div className="flex items-center gap-3 text-xs text-[#c6a15b] uppercase tracking-widest font-semibold mb-3">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span className="text-gray-400">{selectedArticle.readTime}</span>
                <span>•</span>
                <span className="text-gray-400">{selectedArticle.date}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight mb-6">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 py-4 border-y border-white/10 text-xs">
                <div>
                  <span className="text-white font-semibold block">{selectedArticle.author}</span>
                  <span className="text-gray-400">{selectedArticle.authorRole}</span>
                </div>
              </div>
            </div>

            <div className="h-80 sm:h-96 w-full overflow-hidden border border-white/10">
              <img src={selectedArticle.image} alt={selectedArticle.title} loading="eager" decoding="async" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              <p className="font-serif text-xl sm:text-2xl text-white font-normal italic border-l-2 border-[#c6a15b] pl-4 py-1">
                {selectedArticle.excerpt}
              </p>

              {selectedArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
              <span className="text-xs text-gray-400">
                Published by InvestInPro Private Research Division · invesstinpronoida.com
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied!");
                  }
                }}
                className="border border-white/20 hover:border-[#c6a15b] text-xs px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <Share2 size={13} />
                <span>Share Whitepaper</span>
              </button>
            </div>
          </article>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <article
                key={post.slug}
                onClick={() => setSelectedArticle(post)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedArticle(post);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Read ${post.title}`}
                className="group bg-[#0c1811] border border-white/10 hover:border-[#c6a15b]/60 focus-visible:border-[#c6a15b] focus-visible:outline-none transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div className="relative h-60 overflow-hidden bg-[#102018]">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#060d09]/90 border border-[#c6a15b]/30 text-[#c6a15b] px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                      <Clock size={13} />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#c6a15b] transition-colors mb-3">
                      {post.title}
                    </h2>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400">{post.author}</span>
                    <span className="text-[#c6a15b] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Full Analysis <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
