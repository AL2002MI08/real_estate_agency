import * as React from "react"

export const Card: React.FC<React.ComponentProps<"div">> & {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Action: typeof CardAction
  Content: typeof CardContent
  Footer: typeof CardFooter
} = ({ className = "", ...props }) => {
  return (
    <div
      data-slot="card"
      className={`bg-white text-card-foreground flex flex-col overflow-hidden rounded-lg shadow-sm ${className}`}
      {...props}
    />
  )
}

function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={`relative w-full h-48 overflow-hidden ${className}`}
      {...props}
    />
  )
}

function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={`font-semibold text-base ${className}`}
      {...props}
    />
  )
}

function CardDescription({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={`text-muted-foreground text-sm ${className}`}
      {...props}
    />
  )
}

function CardAction({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={`absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium shadow ${className}`}
      {...props}
    />
  )
}

function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={`flex flex-col gap-2 p-4 ${className}`}
      {...props}
    />
  )
}


function CardFooter({ className = "", children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={`flex items-center gap-4 px-4 py-3 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Action = CardAction
Card.Content = CardContent
Card.Footer = CardFooter
