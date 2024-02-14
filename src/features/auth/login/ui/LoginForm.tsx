"use client";

import { useState, useRef } from "react";
import { useOutsideClick } from "@/src/shared/hooks/useOutside";
import { signIn } from "next-auth/react";

import { api } from "@/src/shared/axios";
import { errorText } from "@/src/shared/utils/axios";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { Button } from "@/src/shared/ui/buttons";

import clsx from "clsx";
import s from "./LoginForm.module.css";

const validSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(6, "Your password must be at least 6 characters long")
		.required("Required"),
});

type SignType = "login" | "register";

const signTypes = {
	login: { link: "login", title: "Log In" },
	register: { link: "register", title: "Register" },
};

export type LoginFormProps = {
	onOutsideClick?: () => void;
};

export type LoginFormFieldsType = {
	email: string;
	password: string;
};

export const LoginForm = (props: LoginFormProps) => {
	const { onOutsideClick = () => {} } = props;
	const [signType, setSignType] = useState<SignType>("login");
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);

	const handleClearError = () => {
		setError("");
	};

	const formRef = useRef(null);
	useOutsideClick(formRef, onOutsideClick);

	return (
		<>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validateOnChange={true}
				validationSchema={validSchema}
				onSubmit={async (credentials, { validateForm }) => {
					validateForm(credentials);
					handleClearError();
					setPending(true);

					if (signType === "login") {
						const res = await signIn("credentials", {
							...credentials,
							redirect: false,
						});

						if (!res?.error) {
							location.reload();
						} else {
							setError(res.error);
						}
					} else {
						await api
							.post(`/register`, credentials)
							.then(async () => {
								await signIn("credentials", credentials);
							})
							.catch((error) => {
								setError(errorText(error));
							});
					}

					setPending(false);
				}}
			>
				{({ errors, touched }) => {
					const isEmailError = errors.email && touched.email;
					const isPasswordError = errors.password && touched.password;

					const emailError = isEmailError ? (
						<div className={s.error}>{errors.email}</div>
					) : null;

					const passwordError = isPasswordError ? (
						<div className={s.error}>{errors.password}</div>
					) : null;

					const fields = [
						{ label: "Email", name: "email", type: "email", error: emailError },
						{
							label: "Password",
							name: "password",
							type: "password",
							error: passwordError,
						},
					];

					return (
						<Form
							ref={formRef}
							onChange={handleClearError}
							noValidate={true}
							className={s.form}
						>
							{pending ? <div className={s.loader}></div> : null}
							<div className={s.title}>
								{Object.entries(signTypes).map(([key, item], i) => {
									return (
										<span
											onClick={() => {
												setSignType(key as SignType);
												handleClearError();
											}}
											key={i}
											className={clsx(
												s.titleItem,
												key !== signType ? s.titleInactive : ""
											)}
										>
											{item.title}
										</span>
									);
								})}
							</div>
							{fields.map((field) => (
								<div key={field.name} className={s.inputWrap}>
									<label className={s.label} htmlFor={field.name}>
										{field.label}
									</label>

									<Field
										placeholder={`Введите ${field.label}`}
										autoComplete="off"
										className={clsx(
											s.input,
											field.error !== null ? s.inputError : ""
										)}
										name={field.name}
										type={field.type}
									/>

									{field.error}
								</div>
							))}

							<div className={s.error}>{error}</div>

							<Button type="submit" className={s.submit}>
								{signTypes[signType].title}
							</Button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};
