import { useState, useCallback, useMemo } from "react";

export interface UseTableSelectionOptions<T> {
  items: T[];
  getItemId: (item: T) => string | number;
}

export function useTableSelection<T>({ items, getItemId }: UseTableSelectionOptions<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const allItemIds = useMemo(() => items.map(getItemId), [items, getItemId]);

  const isAllSelected = useMemo(
    () => allItemIds.length > 0 && allItemIds.every((id) => selectedIds.has(id)),
    [allItemIds, selectedIds]
  );

  const isSomeSelected = useMemo(
    () => allItemIds.some((id) => selectedIds.has(id)) && !isAllSelected,
    [allItemIds, selectedIds, isAllSelected]
  );

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allItemIds));
    }
  }, [isAllSelected, allItemIds]);

  const toggleItem = useCallback((id: string | number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isSelected = useCallback(
    (id: string | number) => selectedIds.has(id),
    [selectedIds]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.has(getItemId(item))),
    [items, selectedIds, getItemId]
  );

  return {
    selectedIds,
    selectedItems,
    isAllSelected,
    isSomeSelected,
    isSelected,
    toggleAll,
    toggleItem,
    clearSelection,
  };
}
