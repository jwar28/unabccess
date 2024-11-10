"use client";

import QrCard from "@/components/home/qr-card";
import Layout from "@/components/layout/layout";
import AreasCard from "@/components/home/areas-card";

export default function Home() {
	return (
		<>
			<Layout>
				<div className="flex flex-col gap-4 pb-16 sm:pb-3">
					<QrCard />
					<AreasCard />
				</div>
			</Layout>
		</>
	);
}
