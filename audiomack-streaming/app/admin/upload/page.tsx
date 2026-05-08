'use client';

import React, { useState } from 'react';
import { UploadCloud, Film, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminUploadPage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulation upload
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-textMain pb-12 font-sans selection:bg-primary/30 p-4 md:p-8">
      {/* Header Backoffice */}
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Backoffice <span className="text-primary">Admin</span></h1>
          <p className="text-sm text-textMuted">Intégration centralisée des contenus</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Sélection du Créateur/Acteur */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">Attribuer à un Créateur / Acteur</label>
            <select className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
              <option value="">Sélectionnez un créateur...</option>
              <option value="user_id_1">NeoStudios</option>
              <option value="user_id_2">AlphaFilms</option>
            </select>
          </div>

          {/* Titre et Catégorie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Titre de la vidéo</label>
              <input type="text" placeholder="Ex: Neon Genesis" required className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-500" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Catégorie</label>
              <select className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                <option value="serie">Série</option>
                <option value="court-metrage">Court-métrage</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">Synopsis / Description</label>
            <textarea rows={4} placeholder="Description du contenu..." className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-500 resize-none"></textarea>
          </div>

          {/* Prix */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-300">Prix d'accès (0 pour gratuit)</label>
            <div className="relative">
              <input type="number" min="0" defaultValue="0" className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full" />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">FCFA</span>
            </div>
          </div>

          {/* Zone d'Upload (Fichiers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail */}
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-gray-800/50 cursor-pointer group">
              <div className="bg-gray-800 p-3 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                <ImageIcon className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
              </div>
              <p className="text-sm font-medium text-white mb-1">Affiche (16:9)</p>
              <p className="text-xs text-gray-500">JPG, PNG (Max 5MB)</p>
              <input type="file" accept="image/*" className="hidden" />
            </div>

            {/* Video File */}
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-secondary/50 transition-colors bg-gray-800/50 cursor-pointer group">
              <div className="bg-gray-800 p-3 rounded-full mb-3 group-hover:bg-secondary/20 transition-colors">
                <Film className="text-gray-400 group-hover:text-secondary transition-colors" size={24} />
              </div>
              <p className="text-sm font-medium text-white mb-1">Fichier Vidéo</p>
              <p className="text-xs text-gray-500">MP4, WebM (Cryptage auto)</p>
              <input type="file" accept="video/*" className="hidden" />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input type="checkbox" id="publish" className="w-5 h-5 accent-primary rounded bg-gray-800 border-gray-700" />
            <label htmlFor="publish" className="text-sm font-medium text-gray-300">Publier immédiatement après encodage</label>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isUploading}
            className={`mt-4 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              isUploading 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-primary text-black hover:bg-[#00a3d9] hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,191,255,0.4)]'
            }`}
          >
            {isUploading ? (
              <span className="animate-pulse">Envoi en cours...</span>
            ) : (
              <>
                <UploadCloud size={24} />
                Uploader & Sécuriser la vidéo
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
