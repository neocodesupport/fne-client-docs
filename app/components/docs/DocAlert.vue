<template>
  <div :class="alertClass">
    <Icon :name="iconName" class="w-5 h-5 shrink-0" />
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'info' | 'success' | 'warning' | 'error'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  icon: undefined
})

const alertClass = computed(() => {
  const base = 'my-5 p-4 rounded-md flex items-start gap-3'
  const typeClasses = {
    info: 'bg-primary/10 border-l-4 border-primary text-base-content/80',
    success: 'bg-success/10 border-l-4 border-success text-success-content/80',
    warning: 'bg-warning/10 border-l-4 border-warning text-warning-content/80',
    error: 'bg-error/10 border-l-4 border-error text-error-content/80'
  }
  
  return `${base} ${typeClasses[props.type]}`
})

const defaultIcons = {
  info: 'heroicons:information-circle',
  success: 'heroicons:check-circle',
  warning: 'heroicons:exclamation-triangle',
  error: 'heroicons:x-circle'
}

const iconName = computed(() => props.icon || defaultIcons[props.type])
</script>

