import create from 'zustand'

export const useSideBarStore = create((set) => ({
    collapse: false,
    breadCrumbItem: 'Dashboard',
    switchCollapse: () => set((state) => ({ collapse: !state.collapse })),
    switchBreadCrumbItem: (breadCrumbItem) => set((state) => ({ breadCrumbItem: breadCrumbItem })),
}))
