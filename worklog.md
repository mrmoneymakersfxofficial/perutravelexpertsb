---
Task ID: 1
Agent: Main
Task: Update 3 tour subpages with content and images from Word documents

Work Log:
- Extracted text and images from 3 Word docs: Machu Picchu (6 images), City Tour Cusco (5 images), Inca Trail 4D (10 images)
- Copied all 21 images to public/tours/ with proper naming conventions
- Extended TourData interface with new optional fields: subtitleEs/En, excludesEs/En, highlightsEs/En, whatToBringEs/En, pricingNoteEs/En
- Updated tours-data.ts for city-tour-cusco: new title, full description from doc, 4 gallery images, per-tour includes/excludes, highlights, what to bring, 2-step itinerary (Puka Pukara + Qenqo/Sacsayhuamán)
- Updated tours-data.ts for machu-picchu: new title "Signature Experience", changed from 2-day to 1-day, full description, 5 gallery images, 8 includes items, per-tour excludes, highlights, 5-step hourly itinerary
- Updated tours-data.ts for inka-trail-4d: new title with "Private Service", full description, 9 gallery images, 21 comprehensive includes items, per-tour excludes, highlights, detailed 4-day itinerary with altitude/distance/time metadata, what to bring list
- Fixed TourSlugClient.tsx to pass itinerarySteps to TourInfoTabs (was a bug showing "Itinerary not available" for all tours)
- Fixed TourSlugClient.tsx to use per-tour excludes instead of hardcoded generic excludes
- Updated TourInfoTabs.tsx with new props: highlights, whatToBring, pricingNote - added Highlights section with star icon, What to Bring section with backpack icon
- Updated ItineraryAccordion.tsx: made title bilingual (ES/EN), increased max-height from 300px to 2000px for long Inca Trail descriptions, changed title line-clamp from 1 to 2
- Fixed unrelated build error: replaced non-existent Trekking icon with Footprints in customized-tours page
- Build verified successful

Stage Summary:
- All 3 tour pages now display Word document content: titles, descriptions, itineraries, includes/excludes, highlights, what to bring
- All 21 images from Word documents deployed to public/tours/
- Itinerary tab now works for all tours (was broken before)
- Per-tour excludes replace the old hardcoded generic ones for these 3 tours
- New sections: Tour Highlights and What to Bring