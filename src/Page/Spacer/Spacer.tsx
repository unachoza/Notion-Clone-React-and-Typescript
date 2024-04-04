import stlyes from "./Spacer.module.css";

type SpacerProps = {
	handleClick(): void;
	showHint: boolean;
};

const Spacer = ({ handleClick, showHint }: SpacerProps) => {
	return (
		<div className={stlyes.spacer} onClick={handleClick}>
			{showHint && "Click to create first paragraph"}
		</div>
	);
};

export default Spacer;
