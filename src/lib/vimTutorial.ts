// Vim Tutorial and Mini-Games System

export interface VimLesson {
  id: string;
  title: string;
  description: string;
  objective: string;
  startText: string;
  targetText: string;
  allowedCommands: string[];
  hints: string[];
}

export interface VimGame {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  score: number;
}

export const VIM_LESSONS: VimLesson[] = [
  {
    id: 'lesson1',
    title: 'Lesson 1: Basic Movement (h, j, k, l)',
    description: 'Learn to move the cursor using Vim keys',
    objective: 'Navigate to the X using h(left), j(down), k(up), l(right)',
    startText: `
    Start here →
    
    
              X ← Reach this!
    `,
    targetText: '',
    allowedCommands: ['h', 'j', 'k', 'l'],
    hints: [
      'h = left, j = down, k = up, l = right',
      'Think of j/k as down/up arrows',
      'Practice makes perfect!'
    ]
  },
  {
    id: 'lesson2',
    title: 'Lesson 2: Word Movement (w, b, e)',
    description: 'Jump between words efficiently',
    objective: 'Use w (word forward), b (word backward), e (end of word)',
    startText: 'The quick brown fox jumps over the lazy dog',
    targetText: '',
    allowedCommands: ['w', 'b', 'e', 'h', 'j', 'k', 'l'],
    hints: [
      'w = next word start',
      'b = previous word start',
      'e = end of current word'
    ]
  },
  {
    id: 'lesson3',
    title: 'Lesson 3: Line Navigation (0, $, ^)',
    description: 'Jump to beginning and end of lines',
    objective: 'Use 0 (start), $ (end), ^ (first non-blank)',
    startText: '    This line has leading spaces and ends here',
    targetText: '',
    allowedCommands: ['0', '$', '^', 'h', 'l'],
    hints: [
      '0 = absolute start of line',
      '^ = first non-whitespace character',
      '$ = end of line'
    ]
  },
  {
    id: 'lesson4',
    title: 'Lesson 4: Insert Mode (i, a, o, O)',
    description: 'Enter insert mode to edit text',
    objective: 'Add text using i (insert), a (append), o (new line below)',
    startText: 'Hello World',
    targetText: 'Hello Beautiful World!',
    allowedCommands: ['i', 'a', 'o', 'O', 'Escape'],
    hints: [
      'i = insert before cursor',
      'a = insert after cursor',
      'o = new line below',
      'Press ESC to return to normal mode'
    ]
  },
  {
    id: 'lesson5',
    title: 'Lesson 5: Delete & Change (d, c, x)',
    description: 'Remove and modify text',
    objective: 'Use x (delete char), dw (delete word), dd (delete line)',
    startText: 'This is a test line with extra words to delete',
    targetText: 'This is a test line',
    allowedCommands: ['x', 'd', 'c', 'w', 'b', '$'],
    hints: [
      'x = delete character under cursor',
      'dw = delete word',
      'dd = delete entire line',
      'c works like d but enters insert mode'
    ]
  },
  {
    id: 'lesson6',
    title: 'Lesson 6: Search & Replace (/, ?, :s)',
    description: 'Find and replace text',
    objective: 'Search with / and replace with :s/old/new/',
    startText: 'The cat sat on the mat',
    targetText: 'The dog sat on the rug',
    allowedCommands: ['/', '?', ':s'],
    hints: [
      '/ = search forward',
      '? = search backward',
      ':s/cat/dog/ = substitute cat with dog',
      'n = next match, N = previous match'
    ]
  },
  {
    id: 'lesson7',
    title: 'Lesson 7: Visual Mode (v, V, Ctrl+v)',
    description: 'Select and manipulate text visually',
    objective: 'Select text with v (char), V (line), Ctrl+v (block)',
    startText: `Line 1
Line 2
Line 3`,
    targetText: '',
    allowedCommands: ['v', 'V', 'd', 'y', 'p'],
    hints: [
      'v = visual character mode',
      'V = visual line mode',
      'y = yank (copy)',
      'd = delete selection'
    ]
  },
  {
    id: 'lesson8',
    title: 'Lesson 8: Undo & Redo (u, Ctrl+r)',
    description: 'Undo mistakes and redo changes',
    objective: 'Practice undoing and redoing edits',
    startText: 'Make changes and practice undo/redo',
    targetText: '',
    allowedCommands: ['u', 'Ctrl+r', 'i', 'x', 'd'],
    hints: [
      'u = undo last change',
      'Ctrl+r = redo',
      'U = undo all changes on line'
    ]
  }
];

export const VIM_GAMES = [
  {
    id: 'speed-delete',
    name: 'Speed Delete',
    description: 'Delete all X characters as fast as possible',
    difficulty: 'easy' as const,
    timeLimit: 30,
    score: 0
  },
  {
    id: 'word-jump',
    name: 'Word Jump Challenge',
    description: 'Navigate to highlighted words using w/b/e',
    difficulty: 'medium' as const,
    timeLimit: 45,
    score: 0
  },
  {
    id: 'vim-golf',
    name: 'Vim Golf',
    description: 'Transform text with minimum keystrokes',
    difficulty: 'hard' as const,
    timeLimit: 60,
    score: 0
  },
  {
    id: 'search-master',
    name: 'Search Master',
    description: 'Find and replace patterns quickly',
    difficulty: 'medium' as const,
    timeLimit: 40,
    score: 0
  },
  {
    id: 'visual-select',
    name: 'Visual Selection Race',
    description: 'Select specific text blocks in visual mode',
    difficulty: 'easy' as const,
    timeLimit: 35,
    score: 0
  },
  {
    id: 'macro-madness',
    name: 'Macro Madness',
    description: 'Record and replay macros to edit repetitive text',
    difficulty: 'hard' as const,
    timeLimit: 90,
    score: 0
  }
];

export class VimTutorialEngine {
  currentLesson: VimLesson | null = null;
  currentGame: VimGame | null = null;
  score = 0;
  keystrokeCount = 0;
  startTime: number = 0;
  
  constructor() {}
  
  startLesson(lessonId: string): VimLesson | null {
    const lesson = VIM_LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      this.currentLesson = lesson;
      this.keystrokeCount = 0;
      this.startTime = Date.now();
      return lesson;
    }
    return null;
  }
  
  startGame(gameId: string): VimGame | null {
    const game = VIM_GAMES.find(g => g.id === gameId);
    if (game) {
      this.currentGame = game;
      this.score = 0;
      this.keystrokeCount = 0;
      this.startTime = Date.now();
      return game;
    }
    return null;
  }
  
  validateCommand(command: string): boolean {
    if (!this.currentLesson) return true;
    return this.currentLesson.allowedCommands.includes(command);
  }
  
  checkCompletion(currentText: string): boolean {
    if (!this.currentLesson) return false;
    return currentText.trim() === this.currentLesson.targetText.trim();
  }
  
  getHint(): string {
    if (!this.currentLesson) return '';
    const hints = this.currentLesson.hints;
    return hints[Math.floor(Math.random() * hints.length)];
  }
  
  calculateScore(): number {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    const efficiency = Math.max(0, 100 - this.keystrokeCount);
    const speed = Math.max(0, 100 - timeElapsed);
    return Math.round((efficiency + speed) / 2);
  }
}

// Vim command reference
export const VIM_COMMANDS = {
  movement: {
    h: 'Move left',
    j: 'Move down',
    k: 'Move up',
    l: 'Move right',
    w: 'Next word',
    b: 'Previous word',
    e: 'End of word',
    '0': 'Start of line',
    '^': 'First non-blank',
    '$': 'End of line',
    gg: 'First line',
    G: 'Last line',
    '{': 'Previous paragraph',
    '}': 'Next paragraph'
  },
  editing: {
    i: 'Insert before cursor',
    a: 'Insert after cursor',
    o: 'New line below',
    O: 'New line above',
    x: 'Delete character',
    dd: 'Delete line',
    dw: 'Delete word',
    D: 'Delete to end of line',
    cc: 'Change line',
    cw: 'Change word',
    r: 'Replace character',
    u: 'Undo',
    'Ctrl+r': 'Redo'
  },
  visual: {
    v: 'Visual character mode',
    V: 'Visual line mode',
    'Ctrl+v': 'Visual block mode',
    y: 'Yank (copy)',
    p: 'Paste after',
    P: 'Paste before'
  },
  search: {
    '/': 'Search forward',
    '?': 'Search backward',
    n: 'Next match',
    N: 'Previous match',
    '*': 'Search word under cursor',
    ':s': 'Substitute'
  },
  advanced: {
    '.': 'Repeat last command',
    q: 'Record macro',
    '@': 'Play macro',
    '%': 'Jump to matching bracket',
    'Ctrl+o': 'Jump back',
    'Ctrl+i': 'Jump forward'
  }
};

export function getRandomVimTip(): string {
  const tips = [
    "💡 Tip: Use 'ci\"' to change text inside quotes",
    "💡 Tip: '.' repeats your last command - super powerful!",
    "💡 Tip: Use '/' to search, then 'n' for next match",
    "💡 Tip: 'gg=G' auto-indents your entire file",
    "💡 Tip: Visual block mode (Ctrl+v) is great for columns",
    "💡 Tip: 'diw' deletes the word under cursor",
    "💡 Tip: Use marks with 'm' and jump with '`'",
    "💡 Tip: ':%s/old/new/g' replaces all occurrences",
    "💡 Tip: 'zz' centers the screen on cursor",
    "💡 Tip: Use 'f' to find a character on the line"
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
