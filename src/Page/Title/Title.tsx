import { NodeData } from "../../utils/types";
import { useRef, useEffect } from "react";
import styles from "./Title.module.css";
import { nanoid } from "nanoid";

type TitleProps = {
	title: string;
	changePageTitle(name: string): void;
	addNode(node: NodeData, index: number): void;
};

const Title = ({ title, changePageTitle, addNode }: TitleProps) => {
	const headerRef = useRef<HTMLHeadElement>(null);

	useEffect(() => {
		const isFocused = document.activeElement == headerRef.current;
		if (!isFocused && headerRef.current) {
			headerRef.current.textContent = title;
		}
	}, [title]);

	return (
		<div className={styles.container}>
			<h1
				className={styles.header}
				contentEditable
				suppressContentEditableWarning
				onInput={(event) => changePageTitle(event.currentTarget.textContent || "")}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						addNode({ type: "text", id: nanoid(), value: "" }, 0);
					}
				}}
			></h1>
		</div>
	);
};

export default Title;
