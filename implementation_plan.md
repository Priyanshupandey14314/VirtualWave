# Implementation Plan - Edit/Delete for Services and Blog

## Goal
Add "Edit" and "Delete" functionality for Services and Blogs in the Admin Panel, using Bootstrap symbols and styles. Ensure the Edit functionality works correctly and updates the backend.

## User Review Required
> [!IMPORTANT]
> I will be modifying the backend PHP files (`services.php`, `blogs.php`) to handle update requests. I will also add the Bootstrap Icons CDN to `index.html` to support the requested symbols.

## Proposed Changes

### Backend Updates

#### [MODIFY] [services.php](file:///f:/MERN/VirtualWave/php_backend/services.php)
- Update `POST` logic:
    - Check if `id` is present in `POST` data.
    - If `id` exists, perform an `UPDATE` SQL query instead of `INSERT`.
    - Handle image upload: if new image is uploaded, update the `image` field; otherwise, keep the existing one.

#### [MODIFY] [blogs.php](file:///f:/MERN/VirtualWave/php_backend/blogs.php)
- Update `POST` logic:
    - Check if `id` is present in `POST` data.
    - If `id` exists, perform an `UPDATE` SQL query.
    - Handle image upload similar to services.

### Frontend Updates

#### [MODIFY] [index.html](file:///f:/MERN/VirtualWave/index.html)
- Add Bootstrap Icons CDN link to `<head>`.

#### [MODIFY] [AdminDashboard.jsx](file:///f:/MERN/VirtualWave/src/Components/AdminDashboard.jsx)
- **ServicesManagement**:
    - Add `editingId` state to track which service is being edited.
    - Add `handleEdit(service)` function:
        - Sets `editingId`.
        - Populates `formData` with service data.
        - Shows the form.
    - Update `handleSubmit`:
        - Include `id` in `formData` if `editingId` is present.
        - After success, reset `editingId`.
    - Update UI:
        - Add "Edit" button to each item in the list using Bootstrap classes and icons (e.g., `<i className="bi bi-pencil-square"></i>`).
        - Style buttons using Bootstrap (`btn btn-sm btn-outline-primary`, `btn btn-sm btn-outline-danger`).
- **BlogsManagement**:
    - Add similar `editingId` and `handleEdit` logic.
    - Update `handleSubmit` and UI similarly.

## Verification Plan

### Manual Verification
1.  **Add Service/Blog**: Verify creating new items still works.
2.  **Edit Service/Blog**:
    - Click "Edit" on an item.
    - Change some fields (title, description, image).
    - Save.
    - Verify the list updates with new values.
    - Verify the backend database is updated (via page refresh).
3.  **Delete Service/Blog**:
    - Click "Delete".
    - Confirm.
    - Verify item is removed.
