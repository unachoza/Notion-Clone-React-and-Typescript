import { NodeData, NodeType } from "../../utils/types";
import { useRef, useEffect, FormEventHandler, KeyboardEventHandler } from "react";
import CommandPanel from "../CommandPannel/CommandPannel";
import { useAppState } from "../../context/AppStateContext";
import styles from "./BasicNode.module.css";
import { nanoid } from "nanoid";
import cx from "classnames";

type BasicNodeProps = {
	node: NodeData;
	index: number;
	isFocused: boolean;
	updateFocusedIndex(index: number): void;
};

const BasicNode = ({ node, index, isFocused, updateFocusedIndex }: BasicNodeProps) => {
	const nodeRef = useRef<HTMLDivElement>(null);
	const showCommandPanel = isFocused && node?.value?.match(/^\//);

	const { changeNodeValue, removeNodeByIndex, addNode, changeNodeType } = useAppState();

	useEffect(() => {
		isFocused ? nodeRef.current?.focus() : nodeRef.current?.blur();
	}, [isFocused]);

	useEffect(() => {
		if (nodeRef.current && document.activeElement !== nodeRef.current) {
			nodeRef.current.textContent = node.value;
		}
		if (nodeRef.current && !isFocused) {
			nodeRef.current.textContent = node.value;
		}
	}, [node]);

	const parseCommand = (nodeType: NodeType) => {
		if (nodeRef.current) {
			changeNodeType(index, nodeType);
			nodeRef.current.textContent = "";
		}
	};

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
			addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
			updateFocusedIndex(index + 1);
		}
		if (event.key === "Backspace") {
			if (target.textContent?.length === 0) {
				event.preventDefault();
				removeNodeByIndex(index);
				updateFocusedIndex(index - 1);
			} else if (window?.getSelection()?.anchorOffset === 0) {
				event.preventDefault();
				removeNodeByIndex(index - 1);
				updateFocusedIndex(index - 1);
			}
		}
	};

	return (
		<>
			{showCommandPanel && <CommandPanel selectItem={parseCommand} nodeText={node.value} />}
			<div
				ref={nodeRef}
				onInput={handleInput}
				onKeyDown={handleOnKeyDown}
				onClick={handleClick}
				contentEditable
				suppressContentEditableWarning
				className={cx(styles.node, styles[node.type])}
			/>
		</>
	);
};

export default BasicNode;
