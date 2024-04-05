import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import Cover from "./Cover/Cover";
import Spacer from "./Spacer/Spacer";
import Title from "./Title/Title";
import BasicNode from "../Node/BasicNode/BasicNode";
import { nanoid } from "nanoid";
import { useAppState } from "../context/AppStateContext";

export const Page = () => {
	const { nodes, addNode, title, setTitle } = useAppState();
	const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes });

	return (
		<>
			<Cover />
			<div>
				<Title addNode={addNode} title={title} changePageTitle={setTitle} />
				{nodes.map((node, index) => (
					<BasicNode
						key={node.id}
						node={node}
						isFocused={focusedNodeIndex === index}
						updateFocusedIndex={setFocusedNodeIndex}
						index={index}
					/>
				))}
				<Spacer
					handleClick={() => {
						addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
					}}
					showHint={!nodes.length}
				/>
			</div>
		</>
	);
};
