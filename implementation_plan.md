# Implementation Plan - WhatsApp Floating Button

## Goal
Add a floating WhatsApp button to the bottom-left corner of the application. When clicked, it should open a WhatsApp chat with the company's phone number (`+91 95550 31430`).

## User Review Required
> [!NOTE]
> I am assuming the country code is +91 based on the phone number format and user context. The number used will be `919555031430`.

## Proposed Changes

### [NEW] Component: WhatsAppButton
#### [NEW] [WhatsAppButton.jsx](file:///f:/MERN/VirtualWave/src/Components/WhatsAppButton.jsx)
- Create a functional component that renders a floating button.
- Use a WhatsApp SVG icon.
- `position: fixed`, `bottom: 20px`, `left: 20px`.
- `z-index: 1000` to ensure it stays on top.
- Link href: `https://wa.me/919555031430`.

#### [NEW] [WhatsAppButton.css](file:///f:/MERN/VirtualWave/src/Components/WhatsAppButton.css)
- Style the button (green background, white icon, shadow, hover effect).
- Animation for attention (pulse or slight bounce).

### [MODIFY] Main Layout
#### [MODIFY] [App.jsx](file:///f:/MERN/VirtualWave/src/App.jsx)
- Import `WhatsAppButton`.
- Add `<WhatsAppButton />` inside the main `Router` or `div` so it appears on all pages.

## Verification Plan

### Manual Verification
1.  **Visual Check**: Verify the button appears on the bottom-left of the Home page.
2.  **Navigation Check**: Navigate to other pages (Services, Contact) and ensure the button remains visible.
3.  **Functional Check**: Click the button and verify it opens a new tab to `wa.me/919555031430`.
4.  **Responsive Check**: Ensure it looks good on mobile and desktop.
