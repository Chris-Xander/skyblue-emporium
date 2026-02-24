import { useCategories } from '@/hooks/useCategories';
import { Loader } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader className="w-4 h-4 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          !selectedCategory || selectedCategory === 'all'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'bg-secondary text-secondary-foreground hover:bg-accent'
        }`}
      >
        All Products
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-accent'
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
