"use client"

interface QuickReplyButtonProps {
  text: string
  onClick: () => void
}

export function QuickReplyButton({ text, onClick }: QuickReplyButtonProps) {
  return (
    <button
      type="button"
      className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80 transition-colors"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
