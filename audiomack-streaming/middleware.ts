import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Récupérer la session active
  const { data: { session } } = await supabase.auth.getSession();

  // Protection du streaming video (DRM basique)
  if (req.nextUrl.pathname.startsWith('/api/stream/')) {
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé. Veuillez vous connecter.' }, { status: 401 });
    }

    const videoId = req.nextUrl.pathname.split('/').pop();

    // 1. Vérifier si la vidéo est gratuite ou si l'utilisateur est le créateur
    const { data: video } = await supabase
      .from('videos')
      .select('price, creator_id')
      .eq('id', videoId)
      .single();

    if (!video) {
      return NextResponse.json({ error: 'Vidéo introuvable' }, { status: 404 });
    }

    if (video.price === 0 || video.creator_id === session.user.id) {
      return res; // Accès autorisé
    }

    // 2. Si payant, vérifier si l'utilisateur possède la vidéo (achat complété)
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('video_id', videoId)
      .eq('payment_status', 'completed')
      .single();

    if (!purchase) {
      return NextResponse.json({ error: 'Paiement requis pour ce contenu' }, { status: 403 });
    }

    // 3. Vérifier l'expiration de la location (si applicable)
    if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Votre accès a expiré' }, { status: 403 });
    }

    // Accès autorisé : Le route handler va ensuite générer un lien signé
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/api/stream/:path*'],
};
