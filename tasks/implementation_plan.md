# User Profile & Settings Page Implementation Plan

The goal is to replace the existing `src/pages/Profile.tsx` with a new design based on the provided HTML. The new design includes a sidebar, profile information form, education details summary, and account status. I will retain the existing Supabase integration for fetching and saving user profile data.

## User Review Required

> [!NOTE]
> The new design includes fields like "Education Level" and "Marks" which may not have corresponding fields in the current `user_profiles` table. I will implement the UI for these but they might be read-only or placeholder data until backend support is confirmed/added.
> I will map the 'General' section to the current Profile editing functionality.

## Proposed Changes

### Pages

#### [MODIFY] [Profile.tsx](file:///c:/Users/johan/Documents/Zertainity.com/src/pages/Profile.tsx)

-   Replace the JSX with the structure from the provided HTML.
-   Integrate existing state (`profile`, `loading`, `saving`) and handlers (`handleSave`) into the new UI.
-   **Sidebar**: Implement the sidebar navigation. Active state will be "General" for now.
-   **Profile Information**:
    -   Bind "Full Name" input (currently missing in state, will check if it's in `user_profiles` or just use a placeholder/derived from auth). -> *Correction*: Existing `Profile.tsx` doesn't have a "Name" field in the state, only `bio`, `location` etc. I will check if I should add it or just use the `User` object meta if available.
    -   Bind "Email Address" input (read-only, from `supabase.auth.getUser()`).
    -   Bind "Phone Number" input to `profile.phone_number`.
    -   Bind "Change Photo" to existing avatar logic (or just a placeholder button if no upload logic exists yet).
-   **Education Details**: Render the section as static HTML for now, matching the provided design.
-   **Account Status**: Render as static HTML or infer from `user` object (e.g. `email_confirmed_at`).

### Components

-   No new components are strictly necessary, but I might extract the Sidebar or Sections if the file grows too large. For now, keeping it in `Profile.tsx` is fine as per the request to "implement the html code".

## Verification Plan

### Automated Tests
-   None existing.

### Manual Verification
1.  **Navigate to /profile**:
    -   Login if not authenticated.
    -   Click on "Settings" or navigate manually to `/profile`.
2.  **Visual Check**:
    -   Verify the page looks like the provided design (Sidebar, Inputs, Cards).
    -   Check Dark/Light mode responsiveness (toggle theme if possible, or check system preference).
3.  **Functionality Check**:
    -   Verify data loading: usage of `useEffect` to fetch data.
    -   Verify "Save" button functionality: Modify a field (e.g. Phone) and click "Update Profile". Ensure toast notification appears.
    -   Check responsiveness on smaller screens (mobile view of sidebar).
