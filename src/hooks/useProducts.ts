import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductsByCategory, searchProducts, getProductById, Product } from '@/lib/firestore';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });
}

export function useProductSearch(searchTerm: string) {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: searchTerm.length > 0,
  });
}

export function useProductsFiltered(categoryId?: string, searchTerm?: string) {
  const allProducts = useProducts();
  const categoryProducts = useProductsByCategory(categoryId || '');
  const searchResults = useProductSearch(searchTerm || '');

  const data: Product[] = (() => {
    if (searchTerm && searchTerm.length > 0) {
      return searchResults.data || [];
    }
    if (categoryId) {
      return categoryProducts.data || [];
    }
    return allProducts.data || [];
  })();

  const isLoading =
    (searchTerm && searchTerm.length > 0 ? searchResults.isLoading : false) ||
    (categoryId ? categoryProducts.isLoading : allProducts.isLoading);

  const error =
    (searchTerm && searchTerm.length > 0 ? searchResults.error : null) ||
    (categoryId ? categoryProducts.error : allProducts.error);

  return {
    data,
    isLoading,
    error,
  };
}
