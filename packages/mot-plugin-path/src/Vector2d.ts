/**
 *
 *
 * @class Vector2D
 * @extends {Array}
 */
class Vector2D extends Array {
  /**
   * Creates an instance of Vector2D.
   * @param {number} [x=1]
   * @param {number} [y=0]
   * @memberof Vector2D
   * */
  constructor(x: number = 1, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @param {number} v
   * @memberof Vector2D
   */
  set x(v) {
    this[0] = v;
  }

  /**
   *
   * @param {number} v
   * @memberof Vector2D
   */
  set y(v) {
    this[1] = v;
  }

  /**
   *
   *
   * @readonly
   * @memberof Vector2D
   */
  get x() {
    return this[0];
  }

  /**
   *
   *
   * @readonly
   * @memberof Vector2D
   */
  get y() {
    return this[1];
  }

  /**
   *
   *
   * @readonly
   * @memberof Vector2D
   */
  get length() {
    return Math.hypot(this.x, this.y);
  }

  /**
   *
   *
   * @readonly
   * @memberof Vector2D
   */
  get dir() {
    return Math.atan2(this.y, this.x);
  }

  /**
   *
   *
   * @return {*}
   * @memberof Vector2D
   */
  copy() {
    return new Vector2D(this.x, this.y);
  }

  /**
   *
   *
   * @param {*} v
   * @return {*}
   * @memberof Vector2D
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   *
   *
   * @param {*} v
   * @return {*}
   * @memberof Vector2D
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   *
   *
   * @param {*} a
   * @return {Vector2D}
   * @memberof Vector2D
   */
  scale(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  /**
   *
   *
   * @param {*} rad
   * @return {*}
   * @memberof Vector2D
   */
  rotate(rad) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }

  /**
   *
   *
   * @param {*} v
   * @return {*}
   * @memberof Vector2D
   */
  cross(v) {
    return this.x * v.y - v.x * this.y;
  }

  /**
   *
   *
   * @param {*} v
   * @return {*}
   * @memberof Vector2D
   */
  dot(v) {
    return this.x * v.x + v.y * this.y;
  }

  /**
   * 归一
   *
   * @return {*}
   * @memberof Vector2D
   */
  normalize() {
    return this.scale(1 / this.length);
  }
}

/**
 * 向量的加法
 *
 * @param {*} vec1
 * @param {*} vec2
 * @return {Vector2D}
 */
function vector2dPlus(vec1, vec2) {
  return new Vector2D(vec1.x + vec2.x, vec1.y + vec2.y);
}

/**
 * 向量的减法
 *
 * @param {*} vec1
 * @param {*} vec2
 * @return {Vector2D}
 */
function vector2dMinus(vec1, vec2) {
  return new Vector2D(vec1.x - vec2.x, vec1.y - vec2.y);
}

export {Vector2D, vector2dPlus, vector2dMinus};
