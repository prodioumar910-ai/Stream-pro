import Image from 'next/image';
import Link from 'next/link';
import { Bell, Settings, Play } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default async function HomePage() {
  // Simulation d'une récupération Supabase (Server Component)
  // const { data: trending } = await supabase.from('videos').select('*, profiles(full_name)').eq('is_published', true);
  
  const trendingVideos = [
    { id: '1', title: 'Cyberpunk Shadows', creator: 'NeoStudios', category: 'Série', price: 0, thumbnail_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
    { id: '2', title: 'The Last Stand', creator: 'AlphaFilms', category: 'Court-métrage', price: 500, thumbnail_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80' }
  ];

  return (
    <div className="min-h-screen bg-background text-textMain pb-24 font-sans selection:bg-primary/30">
      {/* Header Sticky */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight text-white">Stream<span className="text-primary">View</span></h1>
        <div className="flex gap-4">
          <button className="text-gray-300 hover:text-white transition-colors"><Bell size={24} /></button>
          <button className="text-gray-300 hover:text-white transition-colors"><Settings size={24} /></button>
        </div>
      </header>

      <main className="flex flex-col gap-10 pb-8">
        {/* Hero Banner Animé */}
        <section className="relative w-full h-[450px] bg-gray-900 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <Image src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80" alt="Hero" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" priority />
          <div className="absolute bottom-8 left-4 z-20 w-full pr-4">
            <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block shadow-[0_0_10px_rgba(0,191,255,0.4)]">À la une</span>
            <h2 className="text-4xl font-bold text-white mb-2 leading-tight">Neon Genesis</h2>
            <p className="text-sm text-gray-300 mb-6 font-medium">Saison 1 Disponible • Action / Sci-Fi</p>
            <div className="flex gap-4">
              <button className="bg-secondary text-black font-semibold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#ffb52e] transition-all transform hover:scale-105 shadow-[0_4px_14px_rgba(255,165,0,0.4)]">
                <Play fill="currentColor" size={20} /> Regarder
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all border border-white/10">
                + Favoris
              </button>
            </div>
          </div>
        </section>

        {/* CTA Inviter (Style Audiomack) */}
        <div className="px-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 flex justify-between items-center border border-gray-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-white text-base mb-1">Gagnez du crédit</h3>
              <p className="text-xs text-gray-400">Invitez vos amis et débloquez du contenu.</p>
            </div>
            <button className="relative z-10 bg-secondary text-black text-sm font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(255,165,0,0.3)] hover:scale-105 transition-transform">
              Inviter
            </button>
          </div>
        </div>

        {/* Tendances (Carrousel Horizontal 16:9) */}
        <section className="px-0">
          <div className="px-4 mb-4 flex justify-between items-end">
            <h3 className="text-xl font-bold text-white">Tendances actuelles</h3>
            <Link href="/trending" className="text-sm text-textMuted hover:text-primary transition-colors">Voir tout</Link>
          </div>
          <div className="flex overflow-x-auto gap-5 px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {trendingVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
            <VideoCard video={{id: '3', title: 'Urban Myths', creator: 'CineMinds', category: 'Série', price: 0, thumbnail_url: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80'}} />
          </div>
        </section>
        
        {/* Courts-métrages */}
        <section className="px-0">
          <div className="px-4 mb-4 flex justify-between items-end">
            <h3 className="text-xl font-bold text-white">Courts-métrages</h3>
          </div>
          <div className="flex overflow-x-auto gap-5 px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
             <VideoCard video={{id: '4', title: 'Le Voyage', creator: 'ArtHouse', category: 'Court-métrage', price: 1000, thumbnail_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80'}} />
             <VideoCard video={{id: '5', title: 'Solitude', creator: 'IndieFocus', category: 'Court-métrage', price: 500, thumbnail_url: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&q=80'}} />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <div className="min-w-[280px] w-[280px] md:min-w-[340px] md:w-[340px] snap-start group cursor-pointer relative flex flex-col gap-3">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg shadow-black/50 bg-gray-800">
        <Image src={video.thumbnail_url} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[10px] px-2.5 py-1 rounded-md text-white uppercase tracking-wider border border-white/10 font-medium">
          {video.category}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 p-4 rounded-full text-white backdrop-blur-sm shadow-[0_0_20px_rgba(0,191,255,0.4)] transform scale-90 group-hover:scale-100 transition-all">
            <Play fill="currentColor" size={24} />
          </div>
        </div>
      </div>
      <div className="px-1">
        <h4 className="text-white text-[15px] font-bold truncate tracking-wide">{video.title}</h4>
        <p className="text-textMuted text-xs truncate mt-0.5">{video.creator}</p>
        <div className="mt-2 flex items-center">
          <p className={`text-xs font-bold px-2 py-1 rounded bg-gray-800/50 ${video.price === 0 ? 'text-primary' : 'text-secondary'}`}>
            {video.price === 0 ? 'Gratuit' : `${video.price} FCFA`}
          </p>
        </div>
      </div>
    </div>
  );
}
