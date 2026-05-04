# Team Profiles Integration - Profil Page

## Overview
Berhasil menambahkan section profil tim Selarasa dengan layout yang rapi dan modal popup untuk detail lengkap setiap anggota tim.

## Changes Made

### 1. Created Team Profile Modal Component
**File**: `src/components/TeamProfileModal.jsx`
- Modal popup component untuk menampilkan detail lengkap profil tim
- Features:
  - Full-screen overlay dengan backdrop blur
  - Responsive layout (mobile & desktop)
  - Close button dengan hover effect
  - Scrollable content untuk bio panjang
  - Photo dan bio side-by-side di desktop
  - Stacked layout di mobile
  - Contact information display (email, phone, address)

### 2. Added Team Profile Photos
**Files**: `public/profile-*.jpg`
- `profile-julian.jpg` - Julian Riezki (Juli Berskema)
- `profile-tahlia.jpg` - Tahlia Motik
- `profile-erby.jpg` - Bellina Erby
- `profile-risya.jpg` - Ayunin Widya Risya (Risya Ayudya)
- `profile-bonit.jpg` - Anita Bonit

### 3. Updated Profil Page
**File**: `src/pages/Profil.js`

#### Key Changes:

1. **Added Team Profiles Data**
   ```javascript
   const teamProfiles = [
     {
       id: 'julian-riezki',
       name: 'Julian Riezki',
       aka: 'Juli Berskema',
       photo: '/profile-julian.jpg',
       bio: [/* array of paragraphs */]
     },
     // ... 4 more profiles
   ];
   ```

2. **Added Modal State Management**
   ```javascript
   const [selectedProfile, setSelectedProfile] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   ```

3. **Added Team Profiles Section**
   - Positioned after "Profile Cards Navigation"
   - Before "Detail Sections"
   - Layout alternates between left-right alignment
   - Each profile shows:
     - Photo (aspect ratio 3:4)
     - Name and aka (if available)
     - First paragraph of bio (line-clamp-4)
     - "Baca Selengkapnya" button

4. **Integrated Modal Component**
   - Opens when "Baca Selengkapnya" clicked
   - Shows full bio with all paragraphs
   - Displays contact info (if available)
   - Close on overlay click or X button

## Team Profiles Layout

### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│              Tim Selarasa Header                │
└─────────────────────────────────────────────────┘

Profile 1 (Left-aligned):
┌──────────┐  ┌────────────────────────────────┐
│          │  │ Name                           │
│  Photo   │  │ Bio preview (4 lines)          │
│          │  │ [Baca Selengkapnya Button]     │
└──────────┘  └────────────────────────────────┘

Profile 2 (Right-aligned):
┌────────────────────────────────┐  ┌──────────┐
│ Name                           │  │          │
│ Bio preview (4 lines)          │  │  Photo   │
│ [Baca Selengkapnya Button]     │  │          │
└────────────────────────────────┘  └──────────┘

... alternating pattern continues
```

### Mobile Layout
```
All profiles stack vertically:
┌──────────────────┐
│                  │
│      Photo       │
│                  │
└──────────────────┘
┌──────────────────┐
│ Name             │
│ Bio preview      │
│ [Button]         │
└──────────────────┘
```

## Modal Popup Layout

### Desktop Modal
```
┌─────────────────────────────────────────────┐
│                                    [X]      │
│  ┌──────────┐  ┌──────────────────────────┐│
│  │          │  │ Name                     ││
│  │  Photo   │  │ aka / birth info         ││
│  │          │  │ Contact info             ││
│  │          │  │                          ││
│  └──────────┘  │ Full bio paragraph 1     ││
│                │                          ││
│                │ Full bio paragraph 2     ││
│                │                          ││
│                │ Full bio paragraph 3...  ││
│                └──────────────────────────┘│
└─────────────────────────────────────────────┘
```

### Mobile Modal
```
┌─────────────────────┐
│              [X]    │
│  ┌───────────────┐  │
│  │               │  │
│  │     Photo     │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│  Name               │
│  aka / birth info   │
│  Contact info       │
│                     │
│  Full bio...        │
│                     │
│  (scrollable)       │
└─────────────────────┘
```

## Team Members Included

### 1. Julian Riezki (Juli Berskema)
- Seniman musik, founder Hutan Jakarta
- Co-founder Selarasa Jagakarsa Foodlab (2019)
- Founder Majelis Sayur Jagakarsa (2020)

### 2. Tahlia Motik
- Filmmaker dengan fokus isu pangan
- Permaculture Design Course graduate (2019)
- Menghubungkan pangan, komunitas, seni, dan film

### 3. Bellina Erby
- Periset pangan dan Pekerja Budaya
- Sarjana Filsafat Seni UI
- Asisten direktur artistik documenta fifteen
- Founder misprints in riso (Kassel, Jerman)

### 4. Ayunin Widya Risya (Risya Ayudya)
- Art manager, artist, dan cook
- Pedagogy of Art, Surabaya State University
- Fokus: fiber art, macrame, pangan, dan circular economy

### 5. Anita Bonit
- Ibu, manajer seni, kurator, seniman
- Founder Grafis Huru Hara (GHH) 2012
- Fokus: seni cetak, humor, kerja kolektif
- Koordinator Workshop Gudskul

## Styling Details

### Colors & Transparency
- Section background: `bg-white/80 backdrop-blur-sm`
- Modal overlay: `bg-black/60 backdrop-blur-sm`
- Modal content: `bg-white` with `rounded-2xl`
- Button: `bg-earth-green hover:bg-earth-green/90`

### Typography
- Section title: `text-2xl md:text-3xl font-serif font-bold`
- Profile name: `text-xl md:text-2xl font-serif font-bold`
- Aka/subtitle: `text-sm italic text-earth-dark/60`
- Bio text: `text-sm md:text-base text-earth-dark/80`

### Spacing
- Section padding: `py-16 md:py-24 px-4`
- Profile gap: `space-y-8 md:space-y-12`
- Content gap: `gap-6 md:gap-8`

### Responsive Breakpoints
- Mobile: < 768px (stacked layout)
- Desktop: ≥ 768px (side-by-side layout)

## Features

### Interactive Elements
1. **"Baca Selengkapnya" Button**
   - Opens modal with full profile
   - Smooth transition
   - Hover effects

2. **Modal Overlay**
   - Click outside to close
   - Backdrop blur effect
   - Prevents body scroll when open

3. **Close Button**
   - Top-right corner
   - Hover scale effect
   - Clear X icon

4. **Alternating Layout**
   - Even profiles: photo left, text right
   - Odd profiles: photo right, text left
   - Creates visual rhythm

### Accessibility
- Keyboard focusable buttons
- Semantic HTML structure
- Alt text for images
- Clear close button
- Scrollable modal content

## Files Modified/Created
1. ✅ `src/components/TeamProfileModal.jsx` (created)
2. ✅ `src/pages/Profil.js` (updated)
3. ✅ `public/profile-julian.jpg` (added)
4. ✅ `public/profile-tahlia.jpg` (added)
5. ✅ `public/profile-erby.jpg` (added)
6. ✅ `public/profile-risya.jpg` (added)
7. ✅ `public/profile-bonit.jpg` (added)

## Testing Checklist
- [ ] Verify all photos load correctly
- [ ] Test modal open/close functionality
- [ ] Check responsive layout on mobile
- [ ] Check responsive layout on tablet
- [ ] Check responsive layout on desktop
- [ ] Test alternating left-right layout
- [ ] Verify modal scrolling for long bios
- [ ] Test close button functionality
- [ ] Test overlay click to close
- [ ] Check text readability
- [ ] Verify button hover effects
- [ ] Test on different browsers

## Notes
- Photos should be optimized for web (recommended: max 800px width)
- Bio text supports multiple paragraphs
- Contact info is optional (only shown if provided)
- Modal is fully responsive and scrollable
- Layout alternates automatically based on index
- All profiles start from left alignment (index 0)
