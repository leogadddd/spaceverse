import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { NotificationComponent } from "../app/components/notification";
import { HiLink } from "react-icons/hi";
import { INotificationCreate } from "../app/util/interfaces";
import { NotificationActionType, NotificationType } from "../app/components/notification/notificationComponentProps";
import { useDispatch } from "react-redux";
import { creators } from "../app/lib";
import { bindActionCreators } from "@reduxjs/toolkit";

export interface ICountdownTimerProps {
	date: number;
}

export const CountdownTimer: FC<ICountdownTimerProps> = (props) => {

	const { date } = props;
	const navigate = useNavigate();

	const dispatch = useDispatch()
	const { addNotification } = bindActionCreators(creators, dispatch)

	const [time, setTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const [isReleased, setIsReleased] = useState(false);

	const CopyToClipboard = (str: string) => {

		const openInNewTab = (url: string) => {
			const newWindow = window.open(url, "_blank", "noopener,noreferrer")
			if (newWindow) newWindow.opener = null
		}

		navigator.clipboard.writeText(str.toString())
		const notification: INotificationCreate = {
			from: "Universe",
			message: "Copied universe link to clipboard.",
			type: NotificationType.Success,
			actions: [
				{
					label: "Open",
					callback: () => openInNewTab(str.toString()),
					type: NotificationActionType.OnClick
				}
			]
		}

		addNotification(notification)
	}

	const calculateTimeLeft = () => {
		let difference = date - new Date().getTime();
		let timeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}

		return timeLeft;
	};

	useEffect(() => {
		setTime(calculateTimeLeft());
		const tout = setInterval(() => {
			setTime(calculateTimeLeft());

			if (date < new Date().getTime()) {
				setIsReleased(true);
				clearInterval(tout);
				window.location.reload();
				console.log("released");
			}
		}
			, 1000);

		return () => clearInterval(tout);
	}, [])

	return createPortal(
		<div className="overflow-hidden">
			<NotificationComponent />
			<Navigation />
			<div className="bg-spweb-darkup flex flex-col justify-center">
				<WidthLayout>
					<div className="min-h-[calc(100vh-60px)] max-w-[1000px] flex flex-col gap-6 justify-center items-center px-4 py-16">
						<h1 className="text-8xl font-bold text-sv-white text-center py-3">
							🚀
						</h1>
						<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wider font-semibold text-sv-white text-center">
							LAUNCHING IN
						</h1>
						<h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-regular text-sv-white text-center justify-center inline-flex gap-2 flex-wrap">
							{
								time.days !== 0 ? (
									<div className="flex gap-2 items-center">
										<span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-sv-accent">
											{time.days}
										</span>
										<span className="opacity-50">
											{time.days === 1 ? "day" : "days"},
										</span>
									</div>
								) : null
							}
							{
								<div className="flex gap-2 items-center">
									<span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-sv-accent">
										{time.hours}
									</span>
									<span className="opacity-50">
										{time.hours === 1 ? "hour" : "hours"}{
											time.minutes !== 0 && time.seconds !== 0 ? "," : ""
										}
									</span>
								</div>
							}
							{
								<div className="flex gap-2 items-center">
									<span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-sv-accent">
										{time.minutes}
									</span>
									<span className="opacity-50">
										{time.minutes === 1 ? "minute" : "minutes"}{
											time.seconds !== 0 ? "," : ""
										}
									</span>
								</div>
							}
							{
								<div className="flex gap-2 items-center">
									<span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-sv-accent">
										{time.seconds}
									</span>
									<span className="opacity-50">
										seconds
									</span>
								</div>
							}
						</h1>
						<div className="w-full max-w-[500px] h-[1px] bg-sv-white opacity-30" />
						<p className="text-sv-white text-center max-w-[400px]">
							We are working hard to bring you the best experience possible. We will be launching soon!
						</p>
						<div className="h-[200px] flex flex-col justify-center">
							<div className="flex flex-col items-center pb-4">
								<h1 className="text-2xl font-bold text-sv-white">
									Share with your friends
								</h1>
							</div>
							<div>
								<div className="flex flex-row justify-start gap-4 bg-sv-input-dark corners overflow-hidden ring-2 ring-sv-dark">
									<h1 className="text-sv-white text-center p-2 pl-4 flex-1 flex justify-start items-center pointer-events-auto select-text">
										https://spvr.app
									</h1>
									<button onClick={() => CopyToClipboard("https://spvr.app")} className="w-[75px] bg-sv-dark flex justify-center items-center hover:brightness-110 transition-all corners">
										<HiLink className="text-sv-white text-2xl m-2" />
									</button>
								</div>
								<div className="flex flex-row justify-center gap-4 pt-4">
									<motion.a
										whileHover={{ scale: 1.1 }}
										href={"https://www.facebook.com/spaceverseApp"}
										target="_blank"
										rel="noreferrer"
									>
										<IoLogoFacebook className="text-sv-white text-4xl m-2" />
									</motion.a>
									<motion.a
										whileHover={{ scale: 1.1 }}
										href="https://www.instagram.com/spaceverseApp/"
										target="_blank"
										rel="noreferrer"
									>
										<IoLogoInstagram className="text-sv-white text-4xl m-2" />
									</motion.a>
								</div>
							</div>
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}


export default CountdownTimer