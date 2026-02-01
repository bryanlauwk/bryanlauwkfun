

# Admin Dashboard Redesign

## Overview
Redesign the admin dashboard to:
1. Remove the Feature Image upload field (unnecessary complexity)
2. Add a Guest Book management section to read visitor feedback
3. Improve overall UX/UI with better organization using tabs

---

## Current State Analysis

**Existing Admin Features:**
- Project CRUD (Create, Read, Update, Delete)
- Drag-and-drop reordering
- Visibility toggle
- Project duplication
- Form fields: Title, Description, URL, Feature Image, Visibility, Text Overlay

**Guest Book Table Structure:**
- `id` (uuid)
- `name` (text)
- `message` (text)
- `created_at` (timestamp)

---

## Proposed Changes

### 1. Remove Feature Image Upload
**Files affected:** `src/pages/Admin.tsx`

Remove from the project form:
- `image_url` field from `ProjectFormData` interface
- `handleImageUpload` function
- Image upload UI (lines 538-575)
- `uploading` state variable

The project cards will use the gradient fallback (`DEFAULT_GRADIENT`) instead.

---

### 2. Add Tabbed Navigation Structure
**Files affected:** `src/pages/Admin.tsx`

Replace single "Projects" view with tabs:

```text
+-------------------------------------------+
|  [Projects]  [Guest Book]                 |
+-------------------------------------------+
```

- **Projects Tab**: Current project management functionality
- **Guest Book Tab**: New section to view visitor feedback

---

### 3. Create Guest Book Admin Panel
**New hook:** `src/hooks/useGuestBook.ts`

Create a custom hook for guest book queries:
- `useAdminGuestBookEntries()` - Fetch all entries with pagination
- `useDeleteGuestBookEntry()` - Allow deleting inappropriate entries

**UI Features in Admin:**
- Table view of all guest book entries (name, message, date)
- Delete action for each entry
- Entry count badge on tab
- Scroll area for long lists
- Empty state when no entries

---

### 4. Simplified Project Form
**Files affected:** `src/pages/Admin.tsx`

Streamlined form fields:
- Title (required)
- Description
- URL
- Visibility toggle (with helper text)
- Text overlay toggle

Remove:
- Feature Image upload section

---

### 5. UI/UX Improvements
**Files affected:** `src/pages/Admin.tsx`

- Add stats/counts in header (e.g., "5 projects, 12 guest entries")
- Better visual hierarchy with section headers
- Responsive table for guest book on desktop, cards on mobile
- Add confirmation dialog for deleting guest book entries
- Loading states for each tab
- Badge on Guest Book tab showing unread count

---

## Implementation Details

### New Hook: `src/hooks/useGuestBook.ts`

```typescript
// Fetch guest book entries for admin
export function useAdminGuestBook() {
  return useQuery({
    queryKey: ["guest-book", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guest_book")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Delete guest book entry
export function useDeleteGuestBookEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("guest_book")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guest-book"] });
    },
  });
}
```

---

### Database: Add RLS Policy for Admin Delete

A migration is needed to allow admins to delete guest book entries:

```sql
CREATE POLICY "Admins can delete guest book entries"
  ON public.guest_book
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
```

---

### Admin Dashboard Layout

```text
+----------------------------------------------------------+
|  <- Back    Admin Dashboard           [Sign Out]         |
+----------------------------------------------------------+
|  5 projects | 12 guest book entries                      |
+----------------------------------------------------------+
|  [Projects]  [Guest Book (12)]                           |
+----------------------------------------------------------+
|                                                          |
|  PROJECTS TAB:                                           |
|  +----------------------+ [+ Add Project]                |
|  | Drag-sortable cards  |                                |
|  +----------------------+                                |
|                                                          |
|  GUEST BOOK TAB:                                         |
|  +--------------------------------------------------+   |
|  | Name       | Message              | Date    | X  |   |
|  +--------------------------------------------------+   |
|  | John       | Great site!          | Jan 31  | X  |   |
|  | Jane       | Love the vibe        | Jan 30  | X  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useGuestBook.ts` | Create | Admin guest book queries and mutations |
| `src/pages/Admin.tsx` | Modify | Add tabs, guest book panel, remove image upload |
| Migration | Create | Add RLS policy for admin delete on guest_book |

---

## Summary of Changes

**Removed:**
- Feature Image upload field and related logic
- `uploading` state
- `handleImageUpload` function
- Image preview in form

**Added:**
- Tabbed interface (Projects / Guest Book)
- Guest Book admin panel with table view
- Delete functionality for guest book entries
- Entry count badges
- Stats summary in header
- RLS policy for admin guest book deletion

**Improved:**
- Cleaner, more focused project form
- Better visual organization
- Responsive design for guest book table

