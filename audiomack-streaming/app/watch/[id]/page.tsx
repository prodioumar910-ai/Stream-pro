'use client';

import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, MessageCircle, Play, Pause, Maximize, Volume2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Données mockées de la vidéo
  const video = {
    title: 'Neon Genesis',
    creator: 'NeoStudios',
    category: 'Série',
    views: '12k vues',
    date: 'Il y a 2 jours',
    description: "Dans un futur lointain où l'humanité a fusionné avec la technologie, un groupe de rebelles tente de découvrir la vérité derrière le système central qui contrôle tout.",
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
  };

  return (
    <div className="min-h-screen bg-black text-textMain pb-20 font-sans">
      
      {/* Lecteur Vidéo (Mock) */}
      <div className="relative w-full aspect-video bg-gray-900 group">
        <Image src={video.thumbnailUrl} alt={video.title} fill className={`object-cover ${isPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
        
        {/* Overlay Assombri quand en pause */}
        {!isPlaying && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}

        {/* Bouton de retour par-dessus le lecteur (mobile) */}
        <div className="absolute top-4 left-4 z-20">
          <Link href="/" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white inline-block border border-white/10 hover:bg-black/70 transition">
            <ArrowLeft size={24} />
          </Link>
        </div>

        {/* Centre du lecteur : Gros bouton Play */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button 
              onClick={() => setIsPlaying(true)}
              className="bg-primary/90 text-white p-5 rounded-full backdrop-blur-sm shadow-[0_0_30px_rgba(0,191,255,0.6)] transform hover:scale-110 transition-all"
            >
              <Play fill="currentColor" size={36} className="ml-1" />
            </button>
          </div>
        )}

        {/* Contrôles du bas (simulés) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer">
            <div className="h-full bg-primary rounded-full w-1/3 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
              </button>
              <Volume2 size={20} className="hover:text-primary transition-colors cursor-pointer" />
              <span className="text-xs font-medium">12:04 / 45:00</span>
            </div>
            <Maximize size={20} className="hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Informations de la vidéo */}
      <div className="px-4 py-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="bg-gray-800 text-textMuted text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block border border-gray-700">
              {video.category}
            </span>
            <h1 className="text-2xl font-bold text-white mb-1 leading-tight">{video.title}</h1>
            <p className="text-xs text-textMuted font-medium">{video.views} • {video.date}</p>
          </div>
        </div>

        {/* Actions (Like, Share) */}
        <div className="flex gap-4 my-5 border-y border-gray-800 py-4">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors flex-1">
            <Heart size={22} className="hover:fill-primary hover:text-primary transition-colors" />
            <span className="text-[10px] font-medium">J'aime</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors flex-1">
            <MessageCircle size={22} />
            <span className="text-[10px] font-medium">120</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors flex-1">
            <Share2 size={22} />
            <span className="text-[10px] font-medium">Partager</span>
          </button>
        </div>

        {/* Profil du Créateur / Acteur */}
        <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-xl border border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
                NS
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{video.creator}</h3>
              <p className="text-[10px] text-textMuted">Acteur / Studio Officiel</p>
            </div>
          </div>
          <button className="text-xs font-bold bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
            S'abonner
          </button>
        </div>

        {/* Description */}
        <div className="mt-5">
          <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/30 p-4 rounded-xl border border-gray-800/30">
            {video.description}
          </p>
        </div>

      </div>
    </div>
  );
}
