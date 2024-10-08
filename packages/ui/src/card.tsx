export function Card({
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
    className="border p-4"
  >
    <h1 className="text-xl border-b pb-2">
      {title}
    </h1>
    <div>{children}</div>
  </div>
  );
}
