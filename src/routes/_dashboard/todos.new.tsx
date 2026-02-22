import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/todos/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/todos/new"!</div>
}
