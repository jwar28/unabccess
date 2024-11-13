"use client";

import { AreasCard } from "@/components/home/areas-card";
import { QrCard } from "@/components/home/qr-card";
import Layout from "@/components/layout/layout";

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
