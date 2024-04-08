"use client";
import { useEffect, useState } from "react";
import { DelayRenderProps } from "src/shared/interfaces";

function DelayRender({ delay = 1000, children }: DelayRenderProps) {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsReady(true), delay);
		return () => clearTimeout(timer);
	}, []);

	return isReady ? children : null;
}

export default DelayRender;
