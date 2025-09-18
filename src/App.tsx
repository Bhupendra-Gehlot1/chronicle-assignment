import { useMachine } from "@xstate/react";
import { editorMachine } from "./machines/editorMachine";
import { TextEditor } from "./components/TextEditor";
import { UI_CONTENT } from "./constants/ui";
import { MACHINE_STATES } from "./constants/machine";
import { EditorEvents } from "./constants/types";

function App() {
  const [state, send] = useMachine(editorMachine);

  const handleContentChange = (content: string) => {
    send({ type: EditorEvents.UPDATE_CONTENT, content });
  };

  const handleContinueWriting = () => {
    send({ type: EditorEvents.CONTINUE_WRITING });
  };

  const handleClearError = () => {
    send({ type: EditorEvents.CLEAR_ERROR });
  };

  const canContinueWriting =
    state.context.content.trim().length > 0 && !state.context.isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {UI_CONTENT.header.title}
          </h1>
          <p className="text-xl text-gray-300">{UI_CONTENT.header.subtitle}</p>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto space-y-8">
          {/* Editor Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-300 mb-4">
                {UI_CONTENT.editor.label}
              </label>
              <TextEditor
                content={state.context.content}
                onContentChange={handleContentChange}
                disabled={state.context.isLoading}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                className={`px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-3 text-lg
                  ${
                    canContinueWriting
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                onClick={handleContinueWriting}
                disabled={!canContinueWriting}
              >
                {state.context.isLoading ? (
                  <>
                    <div className="spinner"></div>
                    {UI_CONTENT.editor.buttonGenerating}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {UI_CONTENT.editor.buttonContinue}
                  </>
                )}
              </button>

              {!canContinueWriting && !state.context.isLoading && (
                <p className="text-lg text-gray-400">
                  {UI_CONTENT.editor.helpText}
                </p>
              )}
            </div>

            {/* Error Message */}
            {state.context.error && (
              <div className="mt-6 bg-red-900 border border-red-700 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-red-300">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">
                    {UI_CONTENT.editor.errorPrefix} {state.context.error}
                  </span>
                </div>
                <button
                  onClick={handleClearError}
                  className="text-red-400 hover:text-red-300 font-bold text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Status Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              {UI_CONTENT.analytics.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      state.value === MACHINE_STATES.GENERATING
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-lg font-medium text-gray-300">
                    {UI_CONTENT.analytics.statusLabel}
                  </span>
                </div>
                <span className="text-2xl font-semibold text-white capitalize">
                  {state.value === MACHINE_STATES.GENERATING
                    ? UI_CONTENT.analytics.statusCreating
                    : UI_CONTENT.analytics.statusReady}
                </span>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <span className="text-lg font-medium text-gray-300 block mb-3">
                  {UI_CONTENT.analytics.wordsLabel}
                </span>
                <span className="text-2xl font-semibold text-white">
                  {
                    state.context.content
                      .trim()
                      .split(/\s+/)
                      .filter((word) => word.length > 0).length
                  }
                </span>
              </div>

              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <span className="text-lg font-medium text-gray-300 block mb-3">
                  {UI_CONTENT.analytics.charactersLabel}
                </span>
                <span className="text-2xl font-semibold text-white">
                  {state.context.content.length}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
