import type { Flavor, FoodChoice, Recommendation, Selections, WineStyle } from './types';
type Rule = { food: FoodChoice; style: Exclude<WineStyle, 'sorpresa'>; category: string; character: string; base: string; alternative: Exclude<WineStyle, 'sorpresa'> };
const rules: Rule[] = [
  { food: 'mar', style: 'blanco', category: 'Blanco seco y fresco', character: 'Tensión cítrica · final salino', base: 'acompaña sabores marinos sin cubrir su delicadeza', alternative: 'espumoso' },
  { food: 'mar', style: 'espumoso', category: 'Espumoso brut de perfil seco', character: 'Burbuja fina · paso vibrante', base: 'refresca el paladar y realza las texturas ligeras', alternative: 'blanco' },
  { food: 'carne', style: 'tinto', category: 'Tinto de cuerpo medio', character: 'Fruta madura · tanino amable', base: 'acompaña sabores profundos sin dominar el bocado', alternative: 'generoso' },
  { food: 'carne', style: 'generoso', category: 'Generoso seco y estructurado', character: 'Nuez · profundidad · longitud', base: 'dialoga con notas tostadas e intensas', alternative: 'tinto' },
  { food: 'vegetal', style: 'blanco', category: 'Blanco aromático y seco', character: 'Hierbas frescas · acidez limpia', base: 'subraya los matices verdes y la sensación de frescura', alternative: 'espumoso' },
  { food: 'vegetal', style: 'espumoso', category: 'Espumoso seco y vertical', character: 'Burbuja fina · final limpio', base: 'aligera el conjunto y da ritmo a cada bocado', alternative: 'blanco' },
  { food: 'quesos', style: 'tinto', category: 'Tinto jugoso de cuerpo medio', character: 'Fruta oscura · textura redonda', base: 'acompaña la intensidad sin endurecer el final', alternative: 'generoso' },
  { food: 'quesos', style: 'generoso', category: 'Generoso de crianza oxidativa', character: 'Frutos secos · umami · persistencia', base: 'encuentra afinidad con sabores curados y salinos', alternative: 'tinto' }
];
const defaults: Record<FoodChoice, Exclude<WineStyle, 'sorpresa'>> = { mar: 'blanco', carne: 'tinto', vegetal: 'blanco', quesos: 'generoso', explorar: 'espumoso' };
const adjectives: Partial<Record<Flavor, string>> = { fresco: 'Su perfil fresco mantiene el conjunto ágil.', intenso: 'La estructura elegida sostiene una intensidad mayor.', especiado: 'Su carácter deja espacio a los matices especiados.', cremoso: 'La textura redonda acompaña sensaciones cremosas.', dulce: 'El contraste conserva el final equilibrado.' };
function generic(style: Exclude<WineStyle, 'sorpresa'>, food: FoodChoice): Rule {
  const category = { blanco: 'Blanco seco de perfil fresco', tinto: 'Tinto equilibrado de cuerpo medio', espumoso: 'Espumoso brut de perfil seco', generoso: 'Generoso seco con crianza' };
  const character = { blanco: 'Frescura · precisión · final limpio', tinto: 'Fruta · estructura · textura', espumoso: 'Burbuja fina · tensión · brillo', generoso: 'Profundidad · frutos secos · longitud' };
  return { food, style, category: category[style], character: character[style], base: 'crea un contraste equilibrado con el perfil elegido', alternative: defaults[food] === style ? 'espumoso' : defaults[food] };
}
export function recommend(selection: Selections): { primary: Recommendation; alternative: Recommendation } {
  const food = selection.food ?? 'explorar';
  const requested = selection.wine === 'sorpresa' || !selection.wine ? defaults[food] : selection.wine;
  const rule = rules.find((candidate) => candidate.food === food && candidate.style === requested) ?? generic(requested, food);
  const flavorLine = selection.flavors.map((flavor) => adjectives[flavor]).filter((value): value is string => Boolean(value)).slice(0, 2).join(' ');
  const primary = { category: rule.category, character: rule.character, reason: `Una opción orientativa que ${rule.base}. ${flavorLine}`.trim(), serving: 'Pide orientación al equipo de sala para la referencia disponible.' };
  const altRule = rules.find((candidate) => candidate.food === food && candidate.style === rule.alternative) ?? generic(rule.alternative, food);
  return { primary, alternative: { category: altRule.category, character: altRule.character, reason: `Como alternativa, ${altRule.base}.`, serving: 'Pide orientación al equipo de sala para la referencia disponible.' } };
}
