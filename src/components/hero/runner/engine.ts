import {
  buildSprites,
  CHAR_H,
  CHAR_W,
  OBSTACLE_SHAPES,
  type ObstacleKind,
  type Palette,
  type SpriteSet,
} from './sprites'

/**
 * The hero runner.
 *
 * Deliberately a plain class rather than React state: this updates 60 times a
 * second, and putting any of it through a re-render would be a performance bug.
 * React owns mounting, sizing and teardown; the engine owns the frame.
 *
 * Everything is measured in *world units* (one unit = one pixel of the pixel
 * art) and multiplied by `scale` only at draw time, so the physics behave
 * identically on every screen density.
 */

const GRAVITY = 260 // units/s²
const JUMP_VELOCITY = 92 // units/s — clears a block with room to spare
const BASE_SPEED = 70 // units/s
const MAX_SPEED = 112
const SPEED_RAMP = 1.6 // units/s gained per second of running
const GROUND_INSET = 9 // units between the ground line and the canvas floor
const HIT_DURATION = 0.5 // seconds of stumble after clipping an obstacle
/** Collision forgiveness — the drawn sprite is generous, the hitbox is not. */
const HITBOX_INSET = 2.5

type Obstacle = {
  x: number
  kind: ObstacleKind
  w: number
  h: number
  cleared: boolean
}

export type RunnerStats = {
  distance: number
  jumps: number
  cleared: number
}

export class RunnerEngine {
  private sprites: SpriteSet
  private scale: number
  private unitsW = 0
  private unitsH = 0

  private charY = 0 // offset above the ground, in units
  private charV = 0
  private grounded = true
  private runPhase = 0
  private speed = BASE_SPEED
  private elapsed = 0
  private hitFor = 0
  private spawnIn = 90 // units of travel until the next obstacle
  private obstacles: Obstacle[] = []
  private groundOffset = 0

  /** Frames since the character was last poked, used for the click easter egg. */
  private celebrateFor = 0

  readonly stats: RunnerStats = { distance: 0, jumps: 0, cleared: 0 }

  constructor(scale: number, palette: Palette) {
    this.scale = scale
    this.sprites = buildSprites(scale, palette)
  }

  /** Rebuilds sprites only when the scale actually changed — resize is noisy. */
  resize(cssW: number, cssH: number, scale: number, palette: Palette) {
    if (scale !== this.scale) {
      this.scale = scale
      this.sprites = buildSprites(scale, palette)
    }
    this.unitsW = cssW / scale
    this.unitsH = cssH / scale
  }

  private get groundY() {
    return this.unitsH - GROUND_INSET
  }

  /** The character's x position — fixed; the world moves past it. */
  private get charX() {
    return Math.max(14, this.unitsW * 0.14)
  }

  jump() {
    if (!this.grounded) return false
    this.charV = JUMP_VELOCITY
    this.grounded = false
    this.stats.jumps += 1
    return true
  }

  /** True when a pointer at these css coordinates landed on the character. */
  hitsCharacter(cssX: number, cssY: number) {
    const x = cssX / this.scale
    const y = cssY / this.scale
    const top = this.groundY - CHAR_H - this.charY
    return (
      x >= this.charX - 2 &&
      x <= this.charX + CHAR_W + 2 &&
      y >= top - 2 &&
      y <= top + CHAR_H + 2
    )
  }

  celebrate() {
    this.celebrateFor = 1.1
  }

  update(dt: number) {
    // A backgrounded tab hands back a huge dt; clamp so nothing tunnels.
    const step = Math.min(dt, 0.05)

    this.elapsed += step
    this.speed = Math.min(MAX_SPEED, BASE_SPEED + this.elapsed * SPEED_RAMP)
    const travel = this.speed * step

    this.stats.distance += travel
    this.groundOffset = (this.groundOffset + travel) % 16
    this.runPhase += step * (this.speed / 9)

    if (this.hitFor > 0) this.hitFor -= step
    if (this.celebrateFor > 0) this.celebrateFor -= step

    // Vertical motion
    if (!this.grounded) {
      this.charV -= GRAVITY * step
      this.charY += this.charV * step
      if (this.charY <= 0) {
        this.charY = 0
        this.charV = 0
        this.grounded = true
      }
    }

    // Spawning
    this.spawnIn -= travel
    if (this.spawnIn <= 0) {
      const kind: ObstacleKind = Math.random() < 0.62 ? 'bug' : 'block'
      const shape = OBSTACLE_SHAPES[kind]
      this.obstacles.push({
        x: this.unitsW + 4,
        kind,
        w: shape[0].length,
        h: shape.length,
        cleared: false,
      })
      // Gap scales with speed so the jump window stays fair as it ramps up.
      this.spawnIn = 105 + Math.random() * 95 + (this.speed - BASE_SPEED) * 1.2
    }

    // Movement, scoring and collision
    const charTop = this.groundY - CHAR_H - this.charY
    const charBottom = this.groundY - this.charY

    for (const ob of this.obstacles) {
      ob.x -= travel
      const obTop = this.groundY - ob.h

      if (!ob.cleared && ob.x + ob.w < this.charX) {
        ob.cleared = true
        this.stats.cleared += 1
      }

      if (this.hitFor <= 0) {
        const overlapX =
          ob.x < this.charX + CHAR_W - HITBOX_INSET &&
          ob.x + ob.w > this.charX + HITBOX_INSET
        const overlapY = charBottom > obTop && charTop < this.groundY
        if (overlapX && overlapY) {
          // No game over: the brief is that the character keeps running, and a
          // dead game in the hero would be worse than no game at all.
          this.hitFor = HIT_DURATION
          this.stats.cleared = 0
        }
      }
    }

    this.obstacles = this.obstacles.filter((ob) => ob.x + ob.w > -6)
  }

  draw(ctx: CanvasRenderingContext2D, palette: Palette) {
    const s = this.scale
    const w = this.unitsW
    const px = (units: number) => Math.round(units * s)

    ctx.clearRect(0, 0, w * s, this.unitsH * s)
    ctx.imageSmoothingEnabled = false

    // Parallax ticks behind everything, at half speed.
    ctx.fillStyle = palette.dim
    const tickSpan = 24
    const tickShift = (this.groundOffset * 0.5) % tickSpan
    for (let x = -tickShift; x < w; x += tickSpan) {
      ctx.fillRect(px(x), px(this.groundY - 16), s, s * 3)
    }

    // Ground: a solid line plus dashes that travel with the world.
    ctx.fillStyle = palette.dim
    ctx.fillRect(0, px(this.groundY), px(w), Math.max(1, s))
    const dashShift = this.groundOffset % 16
    for (let x = -dashShift; x < w; x += 16) {
      ctx.fillRect(px(x), px(this.groundY + 3), s * 5, Math.max(1, s))
    }

    for (const ob of this.obstacles) {
      const sprite = this.sprites.obstacles[ob.kind]
      ctx.drawImage(sprite.canvas, px(ob.x), px(this.groundY - ob.h))
    }

    // The character. Stumbling flickers it; a celebration lifts it slightly.
    const stumbling = this.hitFor > 0
    if (stumbling && Math.floor(this.hitFor * 20) % 2 === 0) return

    const frame = !this.grounded
      ? this.sprites.char.jump
      : Math.floor(this.runPhase) % 2 === 0
        ? this.sprites.char.runA
        : this.sprites.char.runB

    const bounce = this.celebrateFor > 0 ? Math.abs(Math.sin(this.celebrateFor * 14)) * 4 : 0
    ctx.drawImage(
      frame.canvas,
      px(this.charX),
      px(this.groundY - CHAR_H - this.charY - bounce),
    )
  }

  /** A single composed frame for users who asked for no animation. */
  drawStatic(ctx: CanvasRenderingContext2D, palette: Palette) {
    const s = this.scale
    const px = (units: number) => Math.round(units * s)

    ctx.clearRect(0, 0, this.unitsW * s, this.unitsH * s)
    ctx.imageSmoothingEnabled = false

    ctx.fillStyle = palette.dim
    ctx.fillRect(0, px(this.groundY), px(this.unitsW), Math.max(1, s))
    for (let x = 0; x < this.unitsW; x += 16) {
      ctx.fillRect(px(x), px(this.groundY + 3), s * 5, Math.max(1, s))
    }

    ctx.drawImage(
      this.sprites.char.idle.canvas,
      px(this.charX),
      px(this.groundY - CHAR_H),
    )
  }
}
