import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory } from '@/lib/firestore';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

const EMOJI_OPTIONS = ['🍕', '👕', '👜', '💎', '👗', '👞', '⌚', '🎒', '👒', '🧣', '🥾', '💍', '🎁', '📦', '🛍️'];

export default function AddCategoryModal({
  isOpen,
  onClose,
  onCategoryAdded,
}: AddCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    if (!formData.icon) {
      newErrors.icon = 'Please select an emoji';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData(prev => ({ ...prev, icon: emoji }));
    if (errors.icon) {
      setErrors(prev => ({ ...prev, icon: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      await createCategory({
        name: formData.name,
        icon: formData.icon,
      });

      toast.success('Category added successfully!');
      onCategoryAdded();
      handleClose();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to add category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      icon: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new product category with a name and emoji icon</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Category Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Accessories"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Emoji Selection */}
          <div>
            <Label className="text-sm font-medium block mb-3">Select Icon (Emoji) *</Label>
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`
                    p-3 text-2xl rounded-lg transition-all border-2
                    ${
                      formData.icon === emoji
                        ? 'border-primary bg-primary/10 scale-110'
                        : 'border-border hover:border-primary'
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {errors.icon && <p className="text-sm text-destructive mt-2">{errors.icon}</p>}
          </div>

          {/* Preview */}
          {formData.icon && (
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Preview</p>
              <p className="text-4xl">{formData.icon}</p>
              <p className="text-sm font-medium mt-2">{formData.name || 'Category Name'}</p>
            </div>
          )}

          {/* Form Actions */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Category'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
