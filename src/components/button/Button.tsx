import React, { FC, MouseEvent } from "react";

interface IButtonProps {
	/**
	 * The content of the button
	 */
	children: React.ReactNode;

	/**
	 * The type of the button
	 * default: "submit"
	 */
	type?: "button" | "submit";

	/**
	 * Additional class name to be added to the button
	 */
	className?: string;

	/**
	 * The function to be called when the button is clicked
	 */
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({
	children,
	onClick,
	className,
	type = "submit",
}) => {
	return (
		<button>
			<button
				type={type}
				className={`bg-[#5271FF] text-white text-[15px] font-bold py-2 px-4 rounded-[10px] hover:bg-[#112D4E20] duration-300 transition-colors ${className}`}
				onClick={onClick}
			>
				{children}
			</button>
		</button>
	);
};

export default Button;
