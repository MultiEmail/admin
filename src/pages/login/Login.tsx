import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

//import photos
import vector from "../../assets/photos/vector-login.svg";
import logo from "../../assets/logos/icon-transparent.svg";

//import icons
import {
	AiOutlineArrowLeft,
	AiFillEye,
	AiFillEyeInvisible,
} from "react-icons/ai";
import { useFormik } from "formik";

const Login: FC = () => {
	const navigate = useNavigate();

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

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				//TODO: CALL API TO LOGIN HERE. submit value is values of type: {email: string; password:string}
				alert(JSON.stringify(values));
				resetForm();
				navigate("/");
				// TODO: show feedback on UI
			} catch (err) {
				// TODO: show feedback on UI
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
		<div className="absolute top-0 left-0 grid h-screen w-screen place-items-center bg-white font-poppins ">
			<div className="rounded relative flex h-auto w-[90vw] max-w-6xl flex-col items-center justify-center gap-4 bg-[#DBE2EF] py-10 md:h-[60vh] md:w-[70vw] md:flex-row md:justify-around">
				{/*icon for redirect to home */}
				<Link to="/" className="absolute top-2 left-2">
					<div className="back-arrow rounded py-1 px-2">
						<AiOutlineArrowLeft className="text-xl" />
					</div>
				</Link>
				{/*logo*/}
				<div className="md:hidden w-fit items-center gap-1 flex">
					<img src={logo} alt="logo" className="w-[50px]" />
					<p className="text-lg">Multi Email</p>
				</div>
				{/*image section */}
				<div className="flex h-[30vh] w-[90%] items-center md:w-[50%] max-w-sm">
					<img src={vector} alt="vector" />
				</div>
				{/*separate line*/}
				<div className="h-[1px] w-[95%] rounded-full border-2 border-[#3f71af60] bg-[#6398da60] md:h-[30vh] md:w-[0px]" />
				{/*form section */}
				<form
					onSubmit={formik.handleSubmit}
					className="flex w-[90%] flex-col items-center gap-3 md:w-[40%] mt-2 md:mt-0"
				>
					{/*logo*/}
					<div className="hidden w-fit items-center gap-1 md:flex">
						<img src={logo} alt="logo" className="w-[40px]" />
						<p>Multi Email</p>
					</div>
					{/*form*/}
					<div className="flex w-[90%] flex-col gap-2 text-[#3F72AF]">
						<label htmlFor="email" className="text-[14px]">
							Email
						</label>
						<input
							type="email"
							id="email"
							{...formik.getFieldProps("email")}
							className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
							placeholder="example@multiemail.us"
						/>
					</div>
					<div className="relative flex w-[90%] flex-col gap-2 text-[#3F72AF]">
						<label htmlFor="password" className="text-[14px]">
							Password
						</label>
						<input
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							{...formik.getFieldProps("password")}
							className="rounded-md px-2 py-1 text-[12px] placeholder-[#3f72af]"
							placeholder="password"
						/>
						{isPasswordVisible ? (
							<AiFillEyeInvisible
								className="absolute right-2 top-[60%]"
								onClick={() => setIsPasswordVisible(false)}
							/>
						) : (
							<AiFillEye
								className="absolute right-2 top-[60%]"
								onClick={() => setIsPasswordVisible(true)}
							/>
						)}
					</div>
					<button
						type="submit"
						className="rounded-md bg-[#5271ff] px-2 py-1 text-[14px] text-white"
					>
						Log In
					</button>
					<p className="text-[12px]">
						Don't have an account yet?
						<Link to="/signup" className="text-[#5271ff] underline">
							{` Sign Up `}
						</Link>
						here
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
