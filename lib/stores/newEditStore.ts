import { create } from 'zustand'

interface NewEditStore {
  step: 1 | 2 | 3
  images: File[]
  prompt: string
  promptType: 'preset' | 'custom'
  presetId: string | null
  presetName: string | null
  phone: string
  notifyByEmail: boolean

  // Actions
  setStep: (step: 1 | 2 | 3) => void
  nextStep: () => void
  prevStep: () => void
  setImages: (images: File[]) => void
  removeImage: (index: number) => void
  setPrompt: (prompt: string) => void
  setPromptType: (type: 'preset' | 'custom') => void
  setPreset: (id: string, name: string, prompt: string) => void
  setPhone: (phone: string) => void
  setNotifyByEmail: (notify: boolean) => void
  reset: () => void
}

const initialState = {
  step: 1 as 1 | 2 | 3,
  images: [],
  prompt: '',
  promptType: 'preset' as 'preset' | 'custom',
  presetId: null,
  presetName: null,
  phone: '',
  notifyByEmail: true,
}

export const useNewEditStore = create<NewEditStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  nextStep: () =>
    set((state) => ({
      step: (Math.min(state.step + 1, 3) as 1 | 2 | 3),
    })),

  prevStep: () =>
    set((state) => ({
      step: (Math.max(state.step - 1, 1) as 1 | 2 | 3),
    })),

  setImages: (images) => set({ images }),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  setPrompt: (prompt) => set({ prompt }),

  setPromptType: (promptType) => set({ promptType }),

  setPreset: (presetId, presetName, prompt) =>
    set({ presetId, presetName, prompt, promptType: 'preset' }),

  setPhone: (phone) => set({ phone }),

  setNotifyByEmail: (notifyByEmail) => set({ notifyByEmail }),

  reset: () => set(initialState),
}))
