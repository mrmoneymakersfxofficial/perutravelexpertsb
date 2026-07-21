'use client';

import React from 'react';
import { useToastNotification } from '@/components/ToastNotification';
import { Share2, MessageCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ShareTourProps { tourName: string; tourSlug: string; }

export function ShareTour({ tourName, tourSlug }: ShareTourProps) {
  const [open, setOpen] = React.useState(false);
  const { showLinkCopied, showShared } = useToastNotification();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}/our-tours/${tourSlug}`;
  const encodedText = encodeURIComponent(`Check out this tour: ${tourName} - PeruTravelExpertsB`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: tourName, text: `Check out this tour: ${tourName}`, url: shareUrl }); showShared(); setOpen(false); } catch { /* cancelled */ }
    } else { handleCopyLink(); }
  };

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); showLinkCopied(); } catch { const ta = document.createElement('textarea'); ta.value = shareUrl; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showLinkCopied(); }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10 transition-colors" aria-label="Share">
          <Share2 className="w-5 h-5 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 z-[10001]" side="top" align="end">
        <div className="space-y-1">
          <button onClick={() => { window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank'); showShared(); setOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-[#F8F6F2] transition-colors">
            <MessageCircle className="w-4 h-4 text-[#25D366]" /><span>WhatsApp</span>
          </button>
          <button onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400'); showShared(); setOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-[#F8F6F2] transition-colors">
            <Share2 className="w-4 h-4 text-[#1877F2]" /><span>Facebook</span>
          </button>
          <button onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank', 'width=600,height=400'); showShared(); setOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-[#F8F6F2] transition-colors">
            <Share2 className="w-4 h-4 text-[#1C1C1C]" /><span>X (Twitter)</span>
          </button>
          <div className="h-px bg-[#E8CC6A]/30 my-1" />
          <button onClick={handleCopyLink} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-[#F8F6F2] transition-colors">
            <Copy className="w-4 h-4 text-[#8B8680]" /><span>Copy Link</span>
          </button>
          <div className="h-px bg-[#E8CC6A]/30 my-1" />
          <button onClick={handleNativeShare} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-[#F8F6F2] transition-colors">
            <Share2 className="w-4 h-4 text-[#8B8680]" /><span>More...</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareTour;
