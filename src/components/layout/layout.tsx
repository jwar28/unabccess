import Navigation from "./navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation>
        <main>{children}</main>
      </Navigation>
    </>
  );
}
