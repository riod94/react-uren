"use client";
import { Children, type ReactNode } from "react";

type Props<T> = {
	render: (item: T, index?: number) => ReactNode;
	each: T[];
};

const For = <T,>({ render, each }: Props<T>) => {
	return Children.toArray(each.map((item, index) => render(item, index)));
};

export default For;
