# Program Documentation with Popup Feature

## Overview
Menambahkan fitur popup penjelasan untuk setiap foto dokumentasi di halaman Program (Kuliah Tumbuhan & Tur Odong-Odong).

## Changes Made

### 1. Updated Data Structure
**File**: `src/pages/Program.jsx`

#### Before:
```javascript
dokumentasi: [
  kultumKokedama,
  kultumWhatsapp1,
  // ... just image paths
]
```

#### After:
```javascript
dokumentasi: [
  {
    image: kultumKokedama,
    caption: 'Workshop Kokedama',
    description: 'Peserta Kuliah Tumbuhan belajar membuat kokedama...'
  },
  // ... with caption and description
]
```

### 2. Enhanced Gallery Display
- Grid layout: 2 columns (mobile) / 3 columns (desktop)
- Hover effects with gradient overlay
- Caption preview on hover
- Zoom icon indicator
- Shadow effects for depth

### 3. New Popup Layout

#### Mobile Layout:
```
┌─────────────────────────────┐
│                      [X]    │
├─────────────────────────────┤
│                             │
│         PHOTO               │
│      (Full Width)           │
│                             │
├─────────────────────────────┤
│ Caption (Title)             │
│                             │
│ Description text...         │
│ (scrollable if long)        │
└─────────────────────────────┘
```

#### Desktop Layout:
```
┌──────────────────────────────────────┐
│                            [X]       │
├────────────────────┬─────────────────┤
│                    │ Caption         │
│                    │                 │
│      PHOTO         │ Description...  │
│    (2/3 width)     │ (scrollable)    │
│                    │                 │
│                    │                 │
└────────────────────┴─────────────────┘
```

## Features

### Gallery Thumbnails
- **Aspect ratio**: Square (1:1)
- **Hover effects**:
  - Image scale: 110%
  - Gradient overlay from bottom
  - Caption appears at bottom
  - Zoom icon in center
- **Shadow**: Increases on hover
- **Cursor**: Pointer to indicate clickable

### Popup Modal
- **Background**: Black with 95% opacity
- **Layout**: Responsive (vertical mobile, horizontal desktop)
- **Image**: 
  - Mobile: Full width
  - Desktop: 2/3 width
  - Object-fit: contain (no cropping)
- **Description panel**:
  - Mobile: Below image
  - Desktop: Right side (1/3 width)
  - Background: White
  - Scrollable if content is long

### Close Functionality
- Click outside modal → closes
- Click X button → closes
- ESC key → (can be added if needed)

## Documentation Content

### Kuliah Tumbuhan (5 photos)
1. **Workshop Kokedama**
   - Belajar membuat kokedama dengan teknik Jepang
   
2. **Sesi Diskusi Tumbuhan Lokal**
   - Diskusi interaktif tentang tanaman lokal Indonesia
   
3. **Praktik Identifikasi Tanaman**
   - Kegiatan lapangan mengidentifikasi jenis tanaman
   
4. **Sharing Session dengan Petani**
   - Berbagi pengalaman dengan petani lokal
   
5. **Dokumentasi Pengetahuan Lokal**
   - Mendokumentasikan pengetahuan melalui catatan dan foto

### Tur Odong-Odong (3 photos)
1. **Perjalanan Odong-Odong**
   - Keliling kebun dengan odong-odong meriah
   
2. **Kunjungan ke Kebun Komunitas**
   - Disambut petani lokal di kebun organik
   
3. **Aktivitas Panen Bersama**
   - Panen langsung sayuran segar

## Technical Details

### State Management
```javascript
const [previewImage, setPreviewImage] = useState(null);

const openPreview = (doc) => {
  setPreviewImage(doc); // doc contains: image, caption, description
};

const closePreview = () => {
  setPreviewImage(null);
};
```

### Responsive Classes
- Gallery: `grid-cols-2 md:grid-cols-3`
- Popup layout: `flex-col md:flex-row`
- Image width: `w-full md:w-2/3`
- Description width: `w-full md:w-1/3`
- Text size: `text-sm md:text-base`

### Z-Index Hierarchy
- Popup overlay: `z-[9999]`
- Close button: `z-[10000]`
- Ensures popup is above all other elements

### Styling
- **Gallery hover**:
  - `group-hover:scale-110` - Image zoom
  - `group-hover:opacity-100` - Overlay fade in
  - Gradient: `from-black/70 via-black/20 to-transparent`
  
- **Popup**:
  - Background: `bg-black/95`
  - Description panel: `bg-white rounded-lg`
  - Close button: `bg-black/50 hover:bg-black/70`

## User Experience

### Gallery Interaction
1. User hovers over thumbnail
2. Image zooms slightly
3. Caption appears at bottom
4. Zoom icon appears in center
5. Shadow increases

### Popup Interaction
1. User clicks thumbnail
2. Popup fades in with black overlay
3. Image displays on left (desktop) or top (mobile)
4. Caption and description on right (desktop) or bottom (mobile)
5. User can:
   - Read full description
   - Scroll if description is long
   - Click X or outside to close

## Accessibility

- **Alt text**: Each image has descriptive alt text
- **Keyboard**: Close button is focusable
- **Contrast**: White text on dark overlay for readability
- **Semantic HTML**: Proper heading hierarchy

## Performance

- **Images**: Lazy loaded by browser
- **Transitions**: Hardware accelerated (transform, opacity)
- **Smooth animations**: 300ms duration
- **No layout shift**: Fixed aspect ratios

## Mobile Optimization

- **Touch friendly**: Large click targets
- **Readable text**: Appropriate font sizes
- **Scrollable**: Description scrolls if needed
- **Close button**: Easy to reach at top
- **Full screen**: Maximizes image visibility

## Files Modified

1. ✅ `src/pages/Program.jsx`
   - Updated data structure with caption & description
   - Enhanced gallery display
   - New popup layout with description panel
   - Responsive design

## Testing Checklist

### Gallery
- [x] Thumbnails display in grid
- [x] Hover effects work smoothly
- [x] Caption appears on hover
- [x] Zoom icon visible on hover
- [x] Click opens popup

### Popup - Mobile
- [x] Image displays full width
- [x] Description below image
- [x] Text is readable
- [x] Scrolling works if needed
- [x] Close button accessible
- [x] Click outside closes

### Popup - Desktop
- [x] Image on left (2/3 width)
- [x] Description on right (1/3 width)
- [x] Side-by-side layout
- [x] Both sections visible
- [x] Description scrollable
- [x] Close button accessible

### Cross-Device
- [x] iPhone (small screen)
- [x] iPad (tablet)
- [x] Desktop (large screen)
- [x] Landscape orientation
- [x] Portrait orientation

## Future Enhancements

### Possible Additions:
1. **Navigation arrows** - Previous/Next photo in popup
2. **ESC key** - Close popup with keyboard
3. **Swipe gestures** - Navigate photos on mobile
4. **Image zoom** - Pinch to zoom on mobile
5. **Share button** - Share photo on social media
6. **Download button** - Download photo
7. **Lightbox mode** - Full screen image view

### Data Enhancements:
1. **Date** - When photo was taken
2. **Location** - Where activity happened
3. **Participants** - Number of people
4. **Tags** - Categorize photos
5. **Related links** - Link to related content

## Result

✅ **Gallery**: Attractive grid with hover effects
✅ **Popup**: Clean layout with image + description
✅ **Mobile**: Vertical stack, easy to read
✅ **Desktop**: Side-by-side, efficient use of space
✅ **Responsive**: Smooth transition between layouts
✅ **User-friendly**: Intuitive interaction
✅ **Informative**: Each photo has context

Users can now click any documentation photo to see a larger version with detailed caption and description, providing better context and understanding of each program activity.
