const fs = require('fs');
let c = fs.readFileSync('src/firebase/firestoreService.js', 'utf8');

c = c.replace(
  /export const uploadPdfFirestore = async \(\{ title, author, fileUrl \}\) => \{[\s\S]*?return \{ id: docRef\.id, \.\.\.snapshot\.data\(\) \};\r?\n\};/,
  `export const uploadPdfFirestore = async ({ title, author, fileUrl }) => {
  const docRef = await addDoc(uploadedPdfsCollection, {
    title,
    author,
    fileUrl,
    uploadedAt: serverTimestamp(),
  });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const deletePdfFirestore = async (id) => {
  const docRef = doc(db, 'uploadedPDFs', id);
  await deleteDoc(docRef);
};`
);

fs.writeFileSync('src/firebase/firestoreService.js', c);
