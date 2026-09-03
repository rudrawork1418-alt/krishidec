import { Rule } from '../types';

export const INITIAL_RULES: Rule[] = [
  {
    id: 1,
    name: 'Heavy soil favours a water-loving crop',
    pattern: [1, '*', '*', '*'],
    specificity: 1,
    obligatory: false,
    order: 1,
    action: {
      type: 'recommend',
      crop: 'Paddy',
      details: 'Rice / Oryza sativa',
    },
    actionDisplay: 'Recommend Paddy',
  },
  {
    id: 2,
    name: 'Heavy soil + deficient monsoon overrides to millet',
    pattern: [1, 0, '*', '*'],
    specificity: 2,
    obligatory: true,
    order: 2,
    action: {
      type: 'recommend',
      crop: 'Millet (bajra/jowar)',
      details: 'Bajra / Jowar (Drought resilient)',
    },
    actionDisplay: 'Recommend Millet (bajra/jowar)',
  },
  {
    id: 3,
    name: 'Light soil favours light-soil legumes',
    pattern: [0, '*', '*', '*'],
    specificity: 1,
    obligatory: false,
    order: 3,
    action: {
      type: 'recommend',
      crop: 'Groundnut',
      details: 'Peanut / Legume',
    },
    actionDisplay: 'Recommend Groundnut',
  },
  {
    id: 4,
    name: 'High pest pressure triggers mandatory treatment',
    pattern: ['*', '*', '*', 1],
    specificity: 1,
    obligatory: true,
    order: 4,
    action: {
      type: 'intervene',
      target: 'pest_pressure',
    },
    actionDisplay: 'Intervene on pest_pressure',
  },
];
