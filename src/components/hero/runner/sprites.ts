/**
 * Original pixel art for the hero runner.
 *
 * Everything here is authored as a character matrix and rendered to an
 * offscreen canvas at load — no external sprite sheets, no third-party artwork.
 * The character is a visored courier bot; the obstacles are bugs and blocks,
 * which is the joke: you spend the hero section jumping over bugs.
 *
 *   '#' body   '=' accent   '-' dim   '.' transparent
 */

export type Palette = {
  body: string
  accent: string
  dim: string
}

export type Sprite = {
  canvas: HTMLCanvasElement
  /** Size in world units, not pixels — the engine works in units. */
  w: number
  h: number
}

/** Head, visor and torso. Shared by every character frame. */
const BOT_TOP = [
  '.....=......',
  '.....#......',
  '..########..',
  '.##########.',
  '.#========#.',
  '.##########.',
  '..########..',
  '...######...',
  '..########..',
  '.##########.',
  '.###==#####.',
  '.##########.',
]

/** Only the legs change between frames, which keeps the run cheap and readable. */
const BOT_LEGS = {
  runA: ['..##....##..', '.##......##.'],
  runB: ['...##..##...', '...##..##...'],
  jump: ['..###..###..', '..##....##..'],
  idle: ['...##..##...', '..##....##..'],
}

export type CharFrame = keyof typeof BOT_LEGS

/** A bug. Eight legs, two eyes, no relation to anything Google ever drew. */
const BUG = [
  '.#....#.',
  '..####..',
  '.######.',
  '##=..=##',
  '.######.',
  '..####..',
  '.#....#.',
]

/** A taller barrier — a stack of blocked work. */
const BLOCK = [
  '.####.',
  '######',
  '#=..=#',
  '######',
  '######',
  '#=..=#',
  '######',
  '.####.',
]

export const OBSTACLE_SHAPES = { bug: BUG, block: BLOCK }
export type ObstacleKind = keyof typeof OBSTACLE_SHAPES

function paint(rows: string[], scale: number, palette: Palette): Sprite {
  const w = rows[0].length
  const h = rows.length
  const canvas = document.createElement('canvas')
  canvas.width = w * scale
  canvas.height = h * scale

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.imageSmoothingEnabled = false
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const cell = rows[y][x]
        if (cell === '.') continue
        ctx.fillStyle =
          cell === '=' ? palette.accent : cell === '-' ? palette.dim : palette.body
        ctx.fillRect(x * scale, y * scale, scale, scale)
      }
    }
  }

  return { canvas, w, h }
}

export type SpriteSet = {
  char: Record<CharFrame, Sprite>
  obstacles: Record<ObstacleKind, Sprite>
}

/**
 * Rasterises every frame once, up front. Blitting a prepared canvas each frame
 * costs a single drawImage; filling ~170 rects per frame per sprite would not.
 */
export function buildSprites(scale: number, palette: Palette): SpriteSet {
  const frame = (legs: string[]) => paint([...BOT_TOP, ...legs], scale, palette)

  return {
    char: {
      runA: frame(BOT_LEGS.runA),
      runB: frame(BOT_LEGS.runB),
      jump: frame(BOT_LEGS.jump),
      idle: frame(BOT_LEGS.idle),
    },
    obstacles: {
      bug: paint(BUG, scale, palette),
      block: paint(BLOCK, scale, palette),
    },
  }
}

export const CHAR_W = BOT_TOP[0].length
export const CHAR_H = BOT_TOP.length + 2
