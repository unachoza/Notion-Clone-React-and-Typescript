import { useFocusedNodeIndex } from "../hooks/useFocusedNodeIndex";
import Cover from "./Cover/Cover";
import Spacer from "./Spacer/Spacer";
import Title from "./Title/Title";
import { nanoid } from "nanoid";
import { useAppState } from "../context/AppStateContext";
import { NodeData } from "../utils/types";
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import NodeContainer from "../Node/NodeContainer/NodeContainer";

type PageNodeProps = {
	node: NodeData;
	isFocused: boolean;
	index: number;
};

export const Page = () => {
	const { nodes, addNode, title, setTitle, reorderNodes } = useAppState();
	const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes });

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id && active.id !== over?.id) {
			reorderNodes(active.id as string, over.id as string);
		}
	};

	return (
		<>
			<Cover />
			<div>
				<Title addNode={addNode} title={title} changePageTitle={setTitle} />
				<DndContext onDragEnd={handleDragEnd}>
					<SortableContext items={nodes} strategy={verticalListSortingStrategy}>
						{nodes.map((node, index) => (
							<NodeContainer
								key={node.id}
								node={node}
								isFocused={focusedNodeIndex === index}
								updateFocusedIndex={setFocusedNodeIndex}
								index={index}
							/>
						))}
					</SortableContext>
					<DragOverlay />
				</DndContext>
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
