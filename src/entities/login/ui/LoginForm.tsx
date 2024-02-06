"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import s from "./LoginForm.module.css";
import { Button } from "@/src/shared/ui/buttons";
import clsx from "clsx";

const validSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(6, "Your password must be at least 6 characters long")
		.required(""),
});

export const LoginForm = () => {
	return (
		<>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validateOnChange={false}
				validationSchema={validSchema}
				onSubmit={(values) => {
					// same shape as initial values
					console.log(values);
					
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
						<Form noValidate={true} className={s.form}>
							<div className={s.title}>Log in</div>
							{fields.map((field) => (
								<div key={field.name} className={s.inputWrap}>
									<label className={s.label} htmlFor={field.name}>
										{field.label}
									</label>
									<Field
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
							<Button type="submit" className={s.submit}>
								LOG IN
							</Button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};
