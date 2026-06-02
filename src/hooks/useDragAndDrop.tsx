import { useState } from 'react';
import type { Product, DragAndDropReturn } from '../types/index';

export function useDragAndDrop(initialProducts: Product[]): DragAndDropReturn {
  const [products, setProducts] = useState(initialProducts);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...products];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, dragged);
    setProducts(updated);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return {
    products,
    dragIndex,
    overIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    setProducts,
  };
}
