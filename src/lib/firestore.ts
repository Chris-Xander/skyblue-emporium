import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

// Types
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    categoryId: string;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Categories
export async function getAllCategories(): Promise<Category[]> {
  const q = query(collection(db, 'categories'), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Category));
}

export async function createCategory(
  categoryData: Omit<Category, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), categoryData);
  return docRef.id;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const docRef = doc(db, 'categories', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Category;
  }
  return null;
}

// Products
export async function getAllProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Product));
}

export async function createProduct(
  productData: Omit<Product, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product;
  }
  return null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('categoryId', '==', categoryId)
  );
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Product));
  // Sort in memory instead of using Firestore orderBy to avoid composite index requirement
  return products.sort((a, b) => a.name.localeCompare(b.name));
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  // Firestore doesn't support full-text search, so we fetch all products and filter
  const allProducts = await getAllProducts();
  const term = searchTerm.toLowerCase();
  return allProducts.filter(
    product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
  );
}

// Orders
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Order;
  }
  return null;
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Order;
  });
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<void> {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  const docRef = doc(db, 'orders', id);
  await deleteDoc(docRef);
}

// Bulk operations
export async function initializeFirestoreData(categories: Category[], products: Product[]): Promise<void> {
  const batch = writeBatch(db);

  // Add categories
  categories.forEach(category => {
    const catRef = doc(collection(db, 'categories'), category.id);
    batch.set(catRef, {
      name: category.name,
      icon: category.icon,
    });
  });

  // Add products
  products.forEach(product => {
    const prodRef = doc(collection(db, 'products'), product.id);
    batch.set(prodRef, {
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  });

  await batch.commit();
}
