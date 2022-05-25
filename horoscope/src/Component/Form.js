import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import Loader from "./Loader";
// import { CountryService } from "../service/CountryService";
import "./FormDemo.css";

const Form = () => {
	const [api, setApi] = useState();
	const [loader, setLoader] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			day: null,
			sign: null,
		},

		validate: (data) => {
			let errors = {};

			if (!data.name) {
				errors.name = "Name is required.";
			}

			if (!data.email) {
				errors.email = "Email is required.";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
			) {
				errors.email = "Invalid email address. E.g. example@email.com";
			}

			if (!data.day) {
				errors.day = "Date is required.";
			}

			if (!data.sign) {
				errors.sign = "You need to select a sign ";
			}

			return errors;
		},
		onSubmit: (data) => {
			const userName = {
				username: data.name,
				sign: data.sign,
			};

			const getApi = () => {
				setLoader(true);
				fetch(
					`https://aztro.sameerkumar.website?day=${data.day}&sign=${data.sign}`,
					{
						method: "POST",
					},
				)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						const newoBj = Object.assign(data, userName);
						setApi(newoBj);
						localStorage.setItem("user", JSON.stringify(data));
						setLoader(false);
						let text = data?.date_range;
						const myArray = text.split("-");
						var date3 = new Date(data?.current_date.slice(0, -6));

						if (
							date3.getTime() >= new Date(myArray[0]).getTime() &&
							date3.getTime() <= new Date(myArray[1]).getTime()
						) {
							localStorage.setItem("styling", true);
						} else {
							localStorage.setItem("styling", false);
						}
					});
			};

			localStorage.setItem("cardState", "true");

			getApi();

			formik.resetForm();
		},
	});

	const isFormFieldValid = (name) =>
		!!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return (
			isFormFieldValid(name) && (
				<small className="p-error">{formik.errors[name]}</small>
			)
		);
	};

	const days = [
		{ label: "Today", value: "Today" },
		{ label: "Tomorrow", value: "tomorrow" },
		{ label: "Yesterday", value: "yesterday" },
	];

	const signs = [
		{ label: "Aries ", value: "Aries " },
		{ label: "Taurus", value: "Taurus" },
		{ label: "Gemini", value: "Gemini" },
		{ label: "Cancer", value: "Cancer" },
		{ label: "Leo", value: "Leo" },
		{ label: "Virgo", value: "Virgo" },
		{ label: "Libra", value: "Libra" },
		{ label: "Scorpio", value: "Scorpio" },
		{ label: "Sagittarius", value: "Sagittarius" },
		{ label: "Capricorn", value: "Capricorn" },
		{ label: "Aquarius", value: "Aquarius" },
		{ label: "Pisces", value: "Pisces" },
	];
	const LocalData = JSON.parse(localStorage.getItem("user"));
	// sfsafsfsfsf
	// gfstsetyeg
	return (
		<div className="form-demo">
			<div className="flex justify-content-center">
				<div className="card">
					<h5 className="text-center">HoroScope</h5>
					<form onSubmit={formik.handleSubmit} className="p-fluid">
						<div className="field">
							<span className="p-float-label">
								<InputText
									id="name"
									name="name"
									value={formik.values.name}
									onChange={formik.handleChange}
									autoFocus
									className={classNames({
										"p-invalid": isFormFieldValid("name"),
									})}
								/>
								<label
									htmlFor="name"
									className={classNames({
										"p-error": isFormFieldValid("name"),
									})}
								>
									Name*
								</label>
							</span>
							{getFormErrorMessage("name")}
						</div>
						<div className="field">
							<span className="p-float-label p-input-icon-right">
								<i className="pi pi-envelope" />
								<InputText
									id="email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									className={classNames({
										"p-invalid": isFormFieldValid("email"),
									})}
								/>
								<label
									htmlFor="email"
									className={classNames({
										"p-error": isFormFieldValid("email"),
									})}
								>
									Email*
								</label>
							</span>
							{getFormErrorMessage("email")}
						</div>
						<div className="field">
							<Dropdown
								id="day"
								name="day"
								value={formik.values.day}
								options={days}
								onChange={formik.handleChange}
								placeholder="Select Date"
							/>
						</div>
						<div className="field">
							<Dropdown
								id="sign"
								name="sign"
								value={formik.values.sign}
								options={signs}
								onChange={formik.handleChange}
								placeholder="Select a Sign"
							/>
						</div>
						<Button type="submit" label="Submit" className="mt-2" />
					</form>
				</div>
			</div>
			{loader ? (
				<Loader />
			) : (
				<>
					{localStorage.getItem("cardState") ? (
						<Card
							style={
								JSON.parse(localStorage.getItem("styling"))
									? { backgroundColor: "black", color: "white" }
									: { backgroundColor: "blue", color: "yellow" }
							}
							header={<h1 style={{ padding: 10 }}>{LocalData?.username}</h1>}
						>
							<div className="p-card-content">
								<p>Current Date: {LocalData?.current_date}</p>
								<p> Date Range: {LocalData?.date_range} </p>
								<p>Description: {LocalData?.description}</p>
								<p>Sign: {LocalData?.sign}</p>
							</div>
						</Card>
					) : (
						""
					)}
				</>
			)}
		</div>
	);
};
export default Form;
