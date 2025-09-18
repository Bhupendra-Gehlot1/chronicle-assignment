export const MACHINE_STATES = {
  IDLE: "idle",
  GENERATING: "generating",
} as const;

export const MACHINE_INITIAL_CONTEXT = {
  content: "",
  isLoading: false,
  error: null,
} as const;

export const MACHINE_ACTIONS = {
  UPDATE_CONTENT: "updateContent",
  SET_LOADING: "setLoading",
  CLEAR_LOADING: "clearLoading",
  APPEND_AI_CONTENT: "appendAIContent",
  SET_ERROR: "setError",
  CLEAR_ERROR: "clearError",
} as const;

export const MACHINE_GUARDS = {
  HAS_CONTENT: "hasContent",
} as const;

export const MACHINE_ACTORS = {
  CONTINUE_WRITING: "continueWriting",
} as const;

export const MACHINE_IDS = {
  EDITOR: "editor",
} as const;

export const ERROR_MESSAGES = {
  AI_GENERATION_FAILED: "Failed to generate AI content. Please try again.",
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  INVALID_CONTENT: "Invalid content provided.",
} as const;

export const MACHINE_EVENTS = {
  DONE_CONTINUE_WRITING: "xstate.done.actor.continueWriting",
  ERROR_CONTINUE_WRITING: "xstate.error.actor.continueWriting",
} as const;
