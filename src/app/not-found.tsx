import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="pagina-vuota">
      <h1>Page not found</h1>
      <p>
        The page you were looking for does not exist, or has moved somewhere
        else on the site.
      </p>
      <Button href="/">← Back to home</Button>
    </main>
  );
}
