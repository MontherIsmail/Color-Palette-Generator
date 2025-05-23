# Interactive Color Palette Generator 🎨

This project is a React + TypeScript app styled with Tailwind CSS. It allows users to dynamically generate, lock, and modify color palettes interactively.

---

## Features

- **Palette Display:** Shows 5 randomly generated colors on load.
- **Color Interaction:**
  - Hover over a color to reveal its HEX code.
  - Click the HEX code to copy it to the clipboard with visual feedback.
- **Generate New Palette:** Button to regenerate all unlocked colors.
- **Locking Colors:** Lock/unlock individual colors to prevent changes on regeneration.
- **Change Single Color:** Refresh icon to change a single unlocked color without regenerating the entire palette.
- **Mobile Friendly:** Touch support for color HEX display.
- **Fully styled using Tailwind CSS** for modern, clean UI.

---

## UI/UX and Component Design Decisions

- **Component Breakdown:**  
  - `ColorPaletteGenerator` — main container managing the palette state and logic.  
  - `ColorBox` — individual color square handling display, lock toggle, copy-to-clipboard, and single color refresh.  

- **State Management:**  
  Used React hooks (`useState`) to maintain an array of colors with their lock status for efficient updates.

- **User Feedback:**  
  Copy-to-clipboard triggers a brief tooltip message to confirm action, improving user experience.

- **Styling:**  
  Tailwind CSS utility classes were used exclusively to ensure consistency, responsiveness, and ease of maintenance.

---

## Challenges & Solutions

- **Locking logic:**  
  Maintaining and updating color locks without affecting locked colors during palette regeneration required careful state updates.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone git@github.com:MontherIsmail/Color-Palette-Generator.git
cd color-palette-generator
npm install
