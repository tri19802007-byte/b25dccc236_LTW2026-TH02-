import { POINTS, RANKS } from './data';

export const calcScore = (answers) =>
  answers.filter((a) => a.correct).reduce((sum, a) => sum + POINTS[a.level], 0);

export const getRank = (score) => RANKS.find((r) => score >= r.min).title;
