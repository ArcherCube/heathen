/**
 * 实现与CSS cubic-bezier函数相同的缓动效果
 * @param p1 - 第一个控制点的x坐标 (0-1)
 * @param p2 - 第一个控制点的y坐标
 * @param p3 - 第二个控制点的x坐标 (0-1)
 * @param p4 - 第二个控制点的y坐标
 * @returns 返回一个函数，该函数接受一个进度值(0-1)并返回对应的缓动值
 */
export const cubicBezier = (p1: number, p2: number, p3: number, p4: number): ((t: number) => number) => {
  // 验证输入值是否在合理范围内
  if (p1 < 0 || p1 > 1 || p3 < 0 || p3 > 1) {
    throw new Error('Cubic Bezier x values must be in [0, 1] range');
  }

  // 预先计算一些系数
  const cx = 3 * p1;
  const bx = 3 * (p3 - p1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p2;
  const by = 3 * (p4 - p2) - cy;
  const ay = 1 - cy - by;

  // 用于计算x对应的t值
  const sampleCurveX = (t: number): number => {
    return ((ax * t + bx) * t + cx) * t;
  };

  // 用于计算y值
  const sampleCurveY = (t: number): number => {
    return ((ay * t + by) * t + cy) * t;
  };

  // 用于计算曲线的斜率
  const sampleCurveDerivativeX = (t: number): number => {
    return (3 * ax * t + 2 * bx) * t + cx;
  };

  // 使用牛顿迭代法求解t值
  const solveCurveX = (x: number, epsilon?: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    epsilon = epsilon || 1e-6;
    let t0: number, t1: number, t2: number, x2: number, d2: number;
    let i = 0;

    // 首先尝试使用线性近似
    t2 = x;
    for (i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) {
        return t2;
      }
      d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) {
        break;
      }
      t2 = t2 - x2 / d2;
    }

    // 如果牛顿迭代法失败，使用二分法
    t0 = 0;
    t1 = 1;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 - t0) * 0.5 + t0;
    }

    return t2;
  };

  // 返回缓动函数
  return (t: number): number => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return sampleCurveY(solveCurveX(t));
  };
};

// 预定义的CSS缓动函数
export const CSS_EASINGS = {
  linear: cubicBezier(0, 0, 1, 1),
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  'ease-in': cubicBezier(0.42, 0, 1, 1),
  'ease-out': cubicBezier(0, 0, 0.58, 1),
  'ease-in-out': cubicBezier(0.42, 0, 0.58, 1),
  damping: cubicBezier(0.32, 0.72, 0, 1),
};
