import useAuth from "@/hooks/useAuth";
import Navigation from "./navigation";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { user, loading } = useAuth();

	if (loading) return <p>Cargando...</p>;
	if (!user) return null;

	return (
		<>
			<Navigation>
				<main>{children}</main>
			</Navigation>
		</>
	);
}
