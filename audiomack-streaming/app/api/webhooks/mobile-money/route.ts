import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialisation du client admin pour contourner le RLS lors des webhooks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TODO: Vérifier la signature du webhook selon le provider (Wave, Orange, etc.)
    // const signature = req.headers.get('x-provider-signature');
    // if (!verifySignature(body, signature, process.env.WEBHOOK_SECRET)) { ... }

    const { transaction_ref, status } = body;

    // Traitement d'un paiement réussi
    if (status === 'SUCCESS' || status === 'completed') {
      
      // 1. Récupérer l'achat en attente
      const { data: purchase, error: fetchError } = await supabaseAdmin
        .from('purchases')
        .select('*')
        .eq('transaction_ref', transaction_ref)
        .single();

      if (fetchError || !purchase) {
        console.error('Achat introuvable', fetchError);
        return NextResponse.json({ error: 'Transaction introuvable' }, { status: 404 });
      }

      // 2. Mettre à jour le statut
      const { error: updateError } = await supabaseAdmin
        .from('purchases')
        .update({ 
          payment_status: 'completed',
          // Optionnel : Définir une date d'expiration (ex: accès de 1 an)
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() 
        })
        .eq('id', purchase.id);

      if (updateError) {
        throw updateError;
      }

      // TODO: Envoyer une notification push/WebSocket à l'utilisateur ici
      
      return NextResponse.json({ message: 'Paiement traité avec succès' });
    }

    // Gestion des échecs ou autres statuts
    if (status === 'FAILED') {
       await supabaseAdmin
        .from('purchases')
        .update({ payment_status: 'failed' })
        .eq('transaction_ref', transaction_ref);
    }

    return NextResponse.json({ message: 'Webhook reçu, statut ignoré ou mis à jour' });

  } catch (error) {
    console.error('Erreur Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
