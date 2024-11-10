"use client";

import QrCard from "@/components/home/qr-card";
import Layout from "@/components/layout/layout";
import AreasCard from "@/components/home/areas-card";

export default function Home() {
	return (
		<>
			<Layout>
				<QrCard />
				<AreasCard />
			</Layout>
		</>
	);
}
