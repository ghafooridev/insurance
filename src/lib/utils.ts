import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getShortTitle = (title: string) => {
  return title?.toString().split(' ')[0]
}
export const getDependsValue = (dependsId: string) => {
  const button = document.getElementById(dependsId)
  const value = button?.querySelector("[data-slot='select-value']")?.textContent?.trim()
  return value
}
