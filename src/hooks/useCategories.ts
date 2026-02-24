import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getCategoryById, Category } from '@/lib/firestore';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
}
