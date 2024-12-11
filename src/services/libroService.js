import { getFirestore, collection, getDocs } from 'firebase/firestore';

class LibroService {
  async getLibros() {
    const db = getFirestore();
    const librosCollection = collection(db, 'libros');
    const snapshot = await getDocs(librosCollection);
    return snapshot.docs.map(doc => {
      const libroData = doc.data();
      return {
        id: doc.id,
        titulo: libroData.titulo,
        autor: libroData.autor,
        disponible: libroData.disponible,
      };
    });
  }

  async getLibrosPrestables(query) {
    const db = getFirestore();
    const librosCollection = collection(db, 'libros');
    const snapshot = await getDocs(librosCollection);
    return snapshot.docs
      .filter(doc => doc.data().disponible) // Filtrar los libros disponibles
      .map(doc => {
        const libroData = doc.data();
        return {
          id: doc.id,
          titulo: libroData.titulo,
        };
      });
  }
}

export const libroService = new LibroService();
