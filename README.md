# BookFinder

BookFinder is a **React-based application** that allows users to search for books using the [Open Library API](https://openlibrary.org/developers/api). It provides search by title, author, or subject, and displays results with details such as cover images, author names, and publication years.

---

## Features

- **Search books** by title, author, subject, or general query
- **Paginated results** with total count displayed
- **Clickable book cards** to view details
- **Debounced search input** for better performance
- **Responsive design** styled with Tailwind CSS

---

## Tech Stack

- **Frontend:** React, Context API (state management), Tailwind CSS
- **API:** Open Library Search API
- **Tooling:** Vite (or CRA, depending on your setup)

---

## Installation

Clone the repository:

```bash
git clone git@github.com:your-username/bookfinder.git
cd bookfinder
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure
bookfinder/
├── src/
│   ├── components/   # UI components
│   ├── context/      # Context API store
│   ├── icons/        # Reusable icons
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

---

## Future Improvements

- Add book detail modal with more metadata
- Add favorites functionality with local storage
- Improve error handling and loading states