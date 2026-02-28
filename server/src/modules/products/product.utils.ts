import { ProductVariant } from './product.interface';
export function buildOptions(variants: ProductVariant[]) {
  const optionMap = new Map<string, Set<string>>();

  for (const variant of variants) {
    for (const attr of variant.attributes) {
      if (!optionMap.has(attr.name)) {
        optionMap.set(attr.name, new Set());
      }

      optionMap.get(attr.name)!.add(attr.value);
    }
  }

  return Array.from(optionMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}
