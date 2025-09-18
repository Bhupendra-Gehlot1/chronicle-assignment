import { createMachine, assign, fromPromise } from "xstate";
import { continueWritingWithGemini } from "../services/geminiService";
import { EditorEvents } from "../constants/types";
import {
  MACHINE_STATES,
  MACHINE_ACTIONS,
  MACHINE_GUARDS,
  MACHINE_ACTORS,
  MACHINE_IDS,
  ERROR_MESSAGES,
  MACHINE_EVENTS,
  MACHINE_INITIAL_CONTEXT,
} from "../constants/machine";

export interface EditorContext {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export type EditorEvent =
  | { type: EditorEvents.UPDATE_CONTENT; content: string }
  | { type: EditorEvents.CONTINUE_WRITING }
  | { type: EditorEvents.AI_SUCCESS; newContent: string }
  | { type: EditorEvents.AI_ERROR; error: string }
  | { type: EditorEvents.CLEAR_ERROR };

export const editorMachine = createMachine(
  {
    id: MACHINE_IDS.EDITOR,
    initial: MACHINE_STATES.IDLE,
    context: {
      content: MACHINE_INITIAL_CONTEXT.content,
      isLoading: MACHINE_INITIAL_CONTEXT.isLoading,
      error: MACHINE_INITIAL_CONTEXT.error,
    } as EditorContext,
    states: {
      [MACHINE_STATES.IDLE]: {
        on: {
          UPDATE_CONTENT: {
            actions: MACHINE_ACTIONS.UPDATE_CONTENT,
          },
          CONTINUE_WRITING: {
            target: MACHINE_STATES.GENERATING,
            guard: MACHINE_GUARDS.HAS_CONTENT,
          },
          CLEAR_ERROR: {
            actions: MACHINE_ACTIONS.CLEAR_ERROR,
          },
        },
      },
      [MACHINE_STATES.GENERATING]: {
        entry: MACHINE_ACTIONS.SET_LOADING,
        invoke: {
          id: MACHINE_ACTORS.CONTINUE_WRITING,
          src: MACHINE_ACTORS.CONTINUE_WRITING,
          input: ({ context }) => context,
          onDone: {
            target: MACHINE_STATES.IDLE,
            actions: [
              MACHINE_ACTIONS.APPEND_AI_CONTENT,
              MACHINE_ACTIONS.CLEAR_LOADING,
            ],
          },
          onError: {
            target: MACHINE_STATES.IDLE,
            actions: [MACHINE_ACTIONS.SET_ERROR, MACHINE_ACTIONS.CLEAR_LOADING],
          },
        },
        on: {
          UPDATE_CONTENT: {
            actions: MACHINE_ACTIONS.UPDATE_CONTENT,
          },
        },
      },
    },
  },
  {
    actions: {
      [MACHINE_ACTIONS.UPDATE_CONTENT]: assign(({ context, event }) => {
        if (event.type === EditorEvents.UPDATE_CONTENT) {
          return {
            ...context,
            content: event.content,
            error: null,
          };
        }
        return context;
      }),
      [MACHINE_ACTIONS.SET_LOADING]: assign(({ context }) => ({
        ...context,
        isLoading: true,
        error: null,
      })),
      [MACHINE_ACTIONS.CLEAR_LOADING]: assign(({ context }) => ({
        ...context,
        isLoading: false,
      })),
      [MACHINE_ACTIONS.APPEND_AI_CONTENT]: assign(({ context, event }) => {
        if (event.type === MACHINE_EVENTS.DONE_CONTINUE_WRITING) {
          const aiContent = event.output as string;
          return {
            ...context,
            content: context.content + aiContent,
          };
        }
        return context;
      }),
      [MACHINE_ACTIONS.SET_ERROR]: assign(({ context, event }) => {
        if (event.type === MACHINE_EVENTS.ERROR_CONTINUE_WRITING) {
          return {
            ...context,
            error: ERROR_MESSAGES.AI_GENERATION_FAILED,
          };
        }
        return context;
      }),
      [MACHINE_ACTIONS.CLEAR_ERROR]: assign(({ context }) => ({
        ...context,
        error: null,
      })),
    },
    guards: {
      [MACHINE_GUARDS.HAS_CONTENT]: ({ context }) =>
        context.content.trim().length > 0,
    },
    actors: {
      [MACHINE_ACTORS.CONTINUE_WRITING]: fromPromise(
        async ({ input }: { input: EditorContext }): Promise<string> => {
          return await continueWritingWithGemini(input.content);
        }
      ),
    },
  }
);
