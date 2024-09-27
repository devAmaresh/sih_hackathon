import { create } from "zustand";

// Define the Form interface
interface Form {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  visiting_date: string;
  child: number;
  adult: number;
  senior: number;
}

// Define the Zustand store
const useStore = create<{
  form: Form;
  updateForm: (field: keyof Form, value: any) => void;
  resetForm: () => void;
}>((set) => ({
  form: {
    id: "",
    name: "",
    email: null,
    phone: null,
    visiting_date: "",
    child: 0,
    adult: 0,
    senior: 0,
  },
  updateForm: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      form: {
        id: "",
        name: "",
        email: null,
        phone: null,
        visiting_date: "",
        child: 0,
        adult: 0,
        senior: 0,
      },
    }),
}));
export { useStore };
