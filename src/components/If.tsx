"use client";
import { ReactNode } from "react";

interface IfProps {
	isTrue: boolean;
	children: ReactNode;
}

const If = ({ isTrue, children }: IfProps) => (isTrue ? children : null);

export default If;
