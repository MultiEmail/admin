import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "../../components/tooltip/Tooltip";

import * as Yup from "yup";

//import photos
import vector from "../../assets/photos/vector-login.svg";

//import icons
import {
	AiFillEye,
	AiFillEyeInvisible,
} from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useFormik } from "formik";
import { loginHandler } from "../../actions/auth.actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">(
		"success"
	);

	/**
	 * form initial values
	 * @constant
	 * @author Tchakoumi
	 */

	const initialValues: { email: string; password: string } = {
		email: "",
		password: "",
	};

	/**
	 * form validation schema
	 * @constant
	 * @author Tchakoumi
	 */
	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required(),
		password: Yup.string().required(),
	});

	/**
	 * Formik variable to manage form
	 * @constant
	 * @author Tchakoumi
	 */

	const {
		values,
		errors,
		handleBlur,
		isSubmitting,
		handleSubmit,
		handleChange,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				const res = (await dispatch(loginHandler(values))) as any;

				if (res.data?.role === "admin") {
					setTooltipMessage("You have been logged in successfully!");
					setTooltipType("success");
					setCanShowTooltip(true);
					resetForm();
					setTimeout(() => {
						setCanShowTooltip(false);
					}, 3000);
					navigate("/dashboard");
				} else {
					setTooltipMessage("Your account is not an admin account.");
					setTooltipType("error");
					setCanShowTooltip(true);
					setTimeout(() => {
						setCanShowTooltip(false);
					}, 3000);
				}
			} catch (e: any) {
				setTooltipMessage(e.data.error);
				setTooltipType("error");
				setCanShowTooltip(true);
				setTimeout(() => {
					setCanShowTooltip(false);
				}, 3000);
			}
		},
	});

	/**
	 * Weather password should be visible or not
	 * @constant
	 * @author Tchakoumi
	 */
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	return (
		<AnimatePresence>
			<motion.div
				className="flex flex-col font-poppins justify-center items-center h-screen w-screen no-select"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex flex-row bg-[#dbe2ef70] justify-center items rounded-[10px] h-fit w-[80%] p-3 lg:p-3 shadow-lg box-shadow lg:min-h-[50vh]">
					{/* The icon isn't necessary since the base route is Authentication. */}
					{/* <div className="absolute bottom-[15vh] lg:flex p-3 h-fit hover:bg-gray-300 duration-300 rounded-full" onClick={() => {
					navigate(-1);
				}}>
					<AiOutlineArrowLeft className="w-[22px] h-[22px]"/>
				</div> */}
					{/*logo*/}
					<div className="flex flex-row justify-center">
						{/*image section */}
						<div className="hidden lg:flex w-[50%] justify-center items-center mx-10">
							<img
								src={vector}
								alt="vector"
								className="flex w-[90%] h-[90%]"
							/>
						</div>
						{/*separate line*/}
						<div className="hidden lg:flex h-[80%] place-self-center border-r-[3px] rounded-sm border-r-[#3F72AF] opacity-60" />
						{/*form section */}
						<form
							onSubmit={handleSubmit}
							className="flex flex-col lg:w-[50%] justify-center items-center lg:ml-10"
						>
							{/*logo*/}
							<div className="flex flex-row my-2">
								<MdOutlineAdminPanelSettings className="w-[28px] h-[28px] text-[#5271FF]" />
								<p className="flex ml-2 text-xl items-center">
									Admin Dashboard
								</p>
							</div>

							{/*form*/}
							<div className="flex flex-col my-2 w-full">
								<label
									htmlFor="email"
									className="text-[#112D4E] text-sm"
								>
									Email
								</label>
								<input
									type="text"
									id="email"
									className={
										"outline-none border-2 text-[15px] border-white h-full rounded-[10px] p-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" +
										(errors.email
											? " border-[#FF0000]"
											: " border-blue-600")
									}
									placeholder="example@email.com"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
							<div className="relative flex flex-col my-2 w-full">
								<label
									htmlFor="password"
									className="text-[14px]"
								>
									Password
								</label>
								<input
									type={
										isPasswordVisible ? "text" : "password"
									}
									id="password"
									className={
										"outline-none border-2 text-[15px] border-white h-full rounded-[10px] p-2 mt-2 focus:border-[#112D4E70] transition-colors duration-300 placeholder-[#112D4E60]" +
										(errors.password
											? " border-[#FF0000]"
											: " border-blue-600")
									}
									placeholder="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{isPasswordVisible ? (
									<AiFillEyeInvisible
										className="absolute right-2 top-[60%]"
										onClick={() =>
											setIsPasswordVisible(false)
										}
									/>
								) : (
									<AiFillEye
										className="absolute right-2 top-[60%]"
										onClick={() =>
											setIsPasswordVisible(true)
										}
									/>
								)}
							</div>
							<div className="flex flex-col my-2 w-full">
								<button
									type="submit"
									className={
										"bg-[#5271FF] text-white text-[15px] font-bold py-2 px-4 rounded-[10px] hover:bg-[#112D4E20] duration-300 transition-colors" +
										(isSubmitting
											? " opacity-50 cursor-not-allowed"
											: "") +
										(Object.keys(errors).length > 0
											? " opacity-50 cursor-not-allowed"
											: "")
									}
									onClick={(e) => {
										e.preventDefault();
										handleSubmit();
									}}
								>
									Log In
								</button>
							</div>
							<p className="text-sm my-2">
								Need help?{" "}
								<Link to="/help" className="text-[#5271FF]">
									Help
								</Link>
							</p>
						</form>
					</div>
				</div>
				<AnimatePresence>
					{canShowTooltip ? (
						<Tooltip type={tooltipType} message={tooltipMessage} />
					) : null}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
};

export default Login;
