export const AuthBackground = () => {
	return (
		<div className="fixed left-0 top-0 -z-10 h-full w-full">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
		</div>
	);
};

export const Background = () => {
	return (
		<div className="fixed left-0 top-0 -z-10 h-full w-full">
			<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
		</div>
	);
};
