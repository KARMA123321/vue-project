declare module 'vue-mobile-detection' {
  const plugin: {
    install: (app: import('vue').App, options?: { userAgent?: string }) => void
  }

  export default plugin
}