"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/button";
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homm1.jpg"
          alt="Background"
          fill
          className="object-cover w-full h-full"
          quality={100}
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Elevate Your Well-Being
        </h1>
        <p className="text-xl md:text-2xl text-white mb-6 max-w-2xl drop-shadow-md">
          Your ultimate guide to health, vitality, and balanced living
        </p>
        <div className="flex items-center justify-center">
          <Button 
            className="bg-[#0ba5e9] hover:bg-[#0284c7] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Explore Now</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
