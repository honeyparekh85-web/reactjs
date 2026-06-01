/** High-quality cover URLs (Open Library large size). */
const TITLE_COVERS = {
  'onyx storm': 'https://covers.openlibrary.org/b/id/15103233-L.jpg',
  'fourth wing': 'https://covers.openlibrary.org/b/id/14407898-L.jpg',
  'a court of thorns and roses': 'https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg',
  'the shadow of the wind': 'https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg',
  'the night circus': 'https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg',
  'the book thief': 'https://covers.openlibrary.org/b/isbn/9780375831003-L.jpg',
  'twisted love': 'https://covers.openlibrary.org/b/id/12821463-L.jpg',
  'twisted games': 'https://covers.openlibrary.org/b/id/12821465-L.jpg',
  'twisted game': 'https://covers.openlibrary.org/b/id/12821465-L.jpg',
  'twisted hate': 'https://covers.openlibrary.org/b/id/12928487-L.jpg',
  'twisted lies': 'https://covers.openlibrary.org/b/id/14425197-L.jpg',
};

const LOCAL_COVER_FILES = {
  'onyx storm': '/images/books/book-1.jpg',
  'fourth wing': '/images/books/book-2.jpg',
  'a court of thorns and roses': '/images/books/book-3.jpg',
  'the shadow of the wind': '/images/books/book-4.jpg',
  'the night circus': '/images/books/book-5.jpg',
};

const upgradeRemoteUrl = (url) => {
  if (!url || typeof url !== 'string') return url;

  return url
    .replace(/zoom=\d/, 'zoom=0')
    .replace(/_SY\d+_/, '_SY475_')
    .replace(/\/s\d+-/, '/s475-')
    .replace(/[?&]w=\d+/, (match) => match.replace(/\d+/, '500'));
};

export const resolveBookImageSrc = (image, title = '') => {
  const key = title?.trim().toLowerCase() || '';

  if (key && TITLE_COVERS[key]) {
    return TITLE_COVERS[key];
  }

  let src = '';
  if (image && typeof image === 'object') {
    src = image.fileUrl || image.url || '';
  } else if (typeof image === 'string') {
    src = image;
  }

  if (!src && key && LOCAL_COVER_FILES[key]) {
    return LOCAL_COVER_FILES[key];
  }

  if (!src) return '';

  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }

  return upgradeRemoteUrl(src);
};
