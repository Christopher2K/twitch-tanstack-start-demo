import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      Hello "/"!
      <Link to="/todos/new">Hey</Link>
    </div>
  );
}
