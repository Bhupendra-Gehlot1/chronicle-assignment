export const UI_CONTENT = {
  header: {
    title: 'AI Writing Assistant',
    subtitle: 'Start writing your story and let AI help you continue your thoughts',
  },
  editor: {
    label: 'Your Creative Space',
    buttonContinue: 'Continue the Story',
    buttonGenerating: 'Crafting magic...',
    helpText: 'Start typing to enable AI continuation',
    errorPrefix: 'Oops! Something went wrong:',
  },
  analytics: {
    title: 'Writing Analytics',
    statusLabel: 'Status',
    statusReady: 'Ready',
    statusCreating: 'Creating',
    wordsLabel: 'Words',
    charactersLabel: 'Characters',
  }
} as const;

export const PLACEHOLDERS = {
  editor: 'Start writing your thoughts here...',
} as const; 