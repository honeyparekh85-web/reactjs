const fs = require('fs');
let c = fs.readFileSync('src/pages/MyLibrary/MyLibrary.jsx', 'utf8');

c = c.replace(
  "import { getUploadedPdfsFirestore, uploadPdfFirestore } from '../../firebase/firestoreService';",
  "import { getUploadedPdfsFirestore, uploadPdfFirestore, deletePdfFirestore } from '../../firebase/firestoreService';"
);

c = c.replace(
  "import { addLocalPdf, getLocalPdfs } from '../../services/localPdfLibrary';",
  "import { addLocalPdf, getLocalPdfs, removeLocalPdf } from '../../services/localPdfLibrary';\nimport { Trash2 } from 'lucide-react';"
);

c = c.replace(
  "const [usingLocalMode, setUsingLocalMode] = useState(false);",
  `const [usingLocalMode, setUsingLocalMode] = useState(false);

  const handleDelete = async (id, isLocal) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return;
    try {
      if (isLocal) {
        await removeLocalPdf(id);
      } else {
        await deletePdfFirestore(id);
      }
      setSuccess('PDF deleted successfully.');
      loadLibrary();
    } catch (err) {
      console.error(err);
      setError('Failed to delete PDF.');
    }
  };`
);

c = c.replace(
  /\{items\.map\(\(item\) => \([\s\S]*?<\/a>\r?\n\s*\)\)}/,
  `{items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[2rem] bg-white p-6 shadow-cozy border border-book-beige/60 hover:border-book-terracotta transition gap-4">
                    <a href={item.fileUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <h2 className="text-xl font-semibold text-book-mocha">{item.title}</h2>
                      <p className="text-sm text-book-mocha/60">by {item.author}</p>
                    </a>
                    <div className="flex items-center gap-3">
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" className="rounded-full bg-book-beige px-3 py-1 text-xs uppercase tracking-[0.2em] text-book-mocha hover:bg-book-beige/80">Open</a>
                      <button 
                        onClick={() => handleDelete(item.id, item.isLocal || usingLocalMode)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete PDF"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}`
);

fs.writeFileSync('src/pages/MyLibrary/MyLibrary.jsx', c);
