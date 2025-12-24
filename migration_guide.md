# Backend Migration Guide Notifiction

## PHP Setup Instructions
To complete the migration to the PHP backend, please follow these steps:

1.  **Environment**: Ensure you have a PHP environment ready (e.g., XAMPP, WAMP, or any LAMP stack).
2.  **API Folder**: Create a folder named `virtualwave-api` in your server's root directory (e.g., `htdocs` or `www`).
3.  **Files**: Copy the contents of `php_backend/` (from this project) into the `virtualwave-api` folder.
    *   Files: `config.php`, `services.php`, `blogs.php`, `database.sql`
4.  **Uploads**: Create an `uploads` folder inside `virtualwave-api`.
    *   Path: `virtualwave-api/uploads`
5.  **Database**:
    *   Open phpMyAdmin (or your preferred SQL tool).
    *   Import the `database.sql` file to create the `virtualwave` database and tables.
6.  **Verify**:
    *   Visit `http://localhost/virtualwave-api/services.php` in your browser. You should see `[]` (empty JSON array).

## Frontend Configuration
The frontend has been updated to point to `http://localhost/virtualwave-api`. If your server runs on a different port or path, update the `API_BASE_URL` in:
-   `src/Components/AdminDashboard.jsx` - lines 19-20
-   `src/Pages/Services.jsx` - line 19
-   `src/Pages/Blogs.jsx` - line 19
-   `src/Pages/BlogDetails.jsx` - line 19
