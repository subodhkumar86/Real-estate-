"use client";
import React, { useState } from "react";
import { Sun, Sunset, Moon, Compass, Wind, Eye, Sparkles } from "lucide-react";

interface BalconySkylineSimulatorProps {
  propertyName: string;
  floorLevel?: string;
  facing?: string;
}

export default function BalconySkylineSimulator({
  propertyName,
  floorLevel = "38th Floor Sky Mansion",
  facing = "180° South-West Facing (Golf & Yamuna View)"
}: BalconySkylineSimulatorProps) {
  const [timeOfDay, setTimeOfDay] = useState<"day" | "sunset" | "night">("sunset");

  const views = {
    day: {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      title: "Crystal Daylight Panoramas",
      desc: "Clear horizon overlooking the 18-hole golf championship links and Yamuna riverfront corridor. Unhindered natural light with zero shadowing.",
      temp: "27°C",
      wind: "6 km/h Breeze",
      sky: "Clear Visibility (AQI Clean Filtered)"
    },
    sunset: {
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85",
      title: "Golden Hour Ember Glow",
      desc: "Amber sunset reflecting across the expressway water features and skyline towers. Ideal for evening deck entertaining and private lounge gatherings.",
      temp: "24°C",
      wind: "8 km/h Gentle",
      sky: "Golden Dusk"
    },
    night: {
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
      title: "Luminous Night Skyline",
      desc: "The glittering metropolitan nightscape of Delhi-NCR gateway. Architectural crown illumination with full sound-insulated double glazed serenity.",
      temp: "21°C",
      wind: "5 km/h Calm",
      sky: "Starlit Horizon"
    }
  };

  const current = views[timeOfDay];

  return (
    <div className="premium-surface border border-[#c6a15b]/35 p-5 sm:p-8 rounded-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] my-12 relative overflow-hidden">
      {/* Section Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#c6a15b] uppercase tracking-[0.25em] font-medium mb-1">
            <Sparkles size={14} />
            <span>High-Altitude Deck Simulation</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Balcony Skyline <em>Simulator.</em>
          </h3>
          <p className="text-xs text-gray-300 mt-1 max-w-xl font-light">
            Experience the panoramic living vistas from {propertyName} across different times of the day.
          </p>
        </div>

        {/* Time of Day Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-[#06100a] border border-[#c6a15b]/30 rounded-[2px]">
          <button
            onClick={() => setTimeOfDay("day")}
            className={`px-3 py-1.5 text-xs tracking-wider flex items-center gap-1.5 rounded-[2px] transition-all cursor-pointer ${
              timeOfDay === "day"
                ? "bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] font-bold shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sun size={13} />
            <span>Day</span>
          </button>
          <button
            onClick={() => setTimeOfDay("sunset")}
            className={`px-3 py-1.5 text-xs tracking-wider flex items-center gap-1.5 rounded-[2px] transition-all cursor-pointer ${
              timeOfDay === "sunset"
                ? "bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] font-bold shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sunset size={13} />
            <span>Golden Hour</span>
          </button>
          <button
            onClick={() => setTimeOfDay("night")}
            className={`px-3 py-1.5 text-xs tracking-wider flex items-center gap-1.5 rounded-[2px] transition-all cursor-pointer ${
              timeOfDay === "night"
                ? "bg-gradient-to-r from-[#dfc17b] via-[#faebd7] to-[#c6a15b] text-[#07100b] font-bold shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Moon size={13} />
            <span>Night</span>
          </button>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className="relative h-80 sm:h-96 lg:h-[420px] w-full overflow-hidden border border-[#c6a15b]/30 rounded-[2px] shadow-2xl group">
        <img
          key={timeOfDay}
          src={current.image}
          alt={`${propertyName} ${timeOfDay} view`}
          className="w-full h-full object-cover animate-fadeIn filter brightness-95"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-[#060d09]/90 border border-[#c6a15b]/40 text-[#dfc17b] px-3 py-1 text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
            {floorLevel} · Elevation +128m
          </span>
          <span className="bg-black/75 text-gray-300 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
            <Compass size={11} className="text-[#c6a15b]" />
            <span>{facing}</span>
          </span>
        </div>

        {/* Floating atmospheric stats */}
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-3 bg-[#060d09]/85 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] text-gray-300">
          <span className="flex items-center gap-1">
            <Wind size={11} className="text-[#c6a15b]" />
            {current.wind}
          </span>
          <span>•</span>
          <span>{current.temp}</span>
          <span>•</span>
          <span className="text-emerald-400">{current.sky}</span>
        </div>

        {/* Bottom Context Banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060d09] via-[#060d09]/85 to-transparent p-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfc17b] font-medium block">
              Simulated Deck Vantage
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
              {current.title}
            </h4>
            <p className="text-xs text-gray-300 max-w-xl font-light leading-relaxed mt-1">
              {current.desc}
            </p>
          </div>

          <div className="shrink-0 bg-[#c6a15b]/15 border border-[#c6a15b]/30 px-3 py-1.5 text-[10px] text-[#dfc17b] tracking-wider uppercase font-semibold">
            Unobstructed Horizon
          </div>
        </div>
      </div>
    </div>
  );
}
