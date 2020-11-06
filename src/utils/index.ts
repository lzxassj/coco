/**
 * 随机生成min和max之间的数，包含min和max
 * @param min 随机数最小值
 * @param max 随机数最大值
 */
export function random(min = 0, max = 10): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
