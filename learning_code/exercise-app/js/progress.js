export function normalizeSequentialProgress(orderedIds, completedIds) {
  const completedSet = new Set(completedIds);
  const normalized = [];

  for (const id of orderedIds) {
    if (!completedSet.has(id)) break;
    normalized.push(id);
  }

  return normalized;
}

export function isItemUnlocked(orderedIds, completedIds, itemId) {
  const index = orderedIds.indexOf(itemId);
  if (index === -1) return false;
  if (index === 0) return true;

  const normalized = normalizeSequentialProgress(orderedIds, completedIds);
  return normalized.includes(itemId) || normalized.includes(orderedIds[index - 1]);
}

export function completeItem(orderedIds, completedIds, itemId) {
  if (!isItemUnlocked(orderedIds, completedIds, itemId)) {
    return normalizeSequentialProgress(orderedIds, completedIds);
  }

  return normalizeSequentialProgress(orderedIds, [...completedIds, itemId]);
}

export function uncompleteItemAndFollowing(orderedIds, completedIds, itemId) {
  const index = orderedIds.indexOf(itemId);
  if (index === -1) return normalizeSequentialProgress(orderedIds, completedIds);

  const completedSet = new Set(completedIds);
  return orderedIds.slice(0, index).filter(id => completedSet.has(id));
}
