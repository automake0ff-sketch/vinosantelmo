export type FoodChoice = 'mar' | 'carne' | 'vegetal' | 'quesos' | 'explorar';
export type Flavor = 'fresco' | 'intenso' | 'especiado' | 'cremoso' | 'dulce';
export type WineStyle = 'blanco' | 'tinto' | 'espumoso' | 'generoso' | 'sorpresa';
export interface Selections { food?: FoodChoice; flavors: Flavor[]; wine?: WineStyle; }
export interface Recommendation { category: string; character: string; reason: string; serving: string; }
