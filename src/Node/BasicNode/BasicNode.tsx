import { NodeData } from "../../utils/types";
import { useRef, useEffect, FormEventHandler, KeyboardEventHandler } from "react";
import styles from "./BasicNode.module.css";
import { nanoid } from "nanoid";

type BasicNodeProps = {
	node: NodeData;
	index: number;
	isFocused: boolean;
	addNode(node: NodeData, index: number): void;
	removeNode(index: number): void;
	changeNodeValue(index: number, value: string): void;
	updateFocusedIndex(index: number): void;
};

const BasicNode = ({ node, index, isFocused, addNode, removeNode, changeNodeValue, updateFocusedIndex }: BasicNodeProps) => {
	const nodeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		isFocused ? nodeRef.current?.focus() : nodeRef.current?.blur();
	}, [isFocused]);

	useEffect(() => {
		if (nodeRef.current && !isFocused) {
			nodeRef.current.textContent = node.value;
		}
	}, [node]);

	const handleInput: FormEventHandler<HTMLDivElement> = (event) => {
		const textContent = (event.currentTarget as HTMLDivElement).textContent;
		changeNodeValue(index, textContent || "");
	};

	const handleClick = () => {
		updateFocusedIndex(index);
	};

	const handleOnKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		const target = event.target as HTMLDivElement;
		if (event.key === "Enter") {
			event.preventDefault();
			if (target.textContent?.[0] === "/") return;
		}
		addNode({ type: node.type, value: "", id: nanoid() }, index);
		updateFocusedIndex(index + 1);
		if (event.key === "Backspace") {
			if (target.textContent?.length === 0) {
				event.preventDefault();
				removeNode(index);
				updateFocusedIndex(index - 1);
			} else if (window?.getSelection()?.anchorOffset === 0) {
				event.preventDefault();
				removeNode(index - 1);
				updateFocusedIndex(index - 1);
			}
		}
	};

	return (
		<div
			ref={nodeRef}
			onInput={handleInput}
			onKeyDown={handleOnKeyDown}
			onClick={handleClick}
			contentEditable
			suppressContentEditableWarning
			className={styles.node}
		/>
	);
};

export default BasicNode;
