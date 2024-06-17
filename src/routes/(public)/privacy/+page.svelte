<script lang="ts">
	import { fillDrawer } from '$lib/components/Drawer/drawer.utlities';
	import { Heading, P, List, Li, A } from 'flowbite-svelte';
	import Contact from '$lib/forms/contact/Contact.svelte';

	let data = {};
</script>

<div class="space-y-2 text-justify">
	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Acceptance of the Privacy Policy
	</Heading>

	<P>Aneko Last Updated: April 18, 2024</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Introduction
	</Heading>
	<P weight="light" color="text-gray-500" class="text-justify">
		Aneko (“Company” or “we” or “us”) respects your privacy and is committed to protecting it
		through our compliance with this policy. The term "Aneko" refers to Aneko, LLC doing business
		under the name “Aneko”.
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		This policy describes the types of information we may collect from you or that you may provide
		when you visit the website <A href="/">aneko.io</A> including products, features, materials, and
		services we offer (collectively, the “Website”) and our practices for collecting, using, maintaining,
		protecting, and disclosing that information.
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		This policy applies to information we collect:
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		<List class="text-justify text-gray-500">
			<Li>On this Website.</Li>
			<Li>In email, text, and other electronic messages between you and this Website.</Li>
			<Li
				>Through mobile and desktop applications you download from this Website, which provide
				dedicated non-browser-based interaction between you and this Website. When you interact with
				our advertising and applications on third-party websites and services if those applications
				or advertising include links to this policy.</Li
			>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		This policy does not apply to information collected by:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>Us offline or through any other means,</Li>
			<Li>including on any other website operated by Company or any third party;</Li>
			<Li>or Any third party,</Li>
			<Li
				>including through any application or content (including advertising) that may link to or be
				accessible from or on the Website.
			</Li>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		Please read this policy carefully to understand our policies and practices regarding your
		information and how we treat it. If you do not agree with our policies and practices, your
		choice is not to use our Website. By accessing or using this Website, you agree to this privacy
		policy. This policy may change from time to time (see Changes to Our Privacy Policy). Your
		continued use of this Website after we make changes is deemed to be acceptance of those changes,
		so please check the policy periodically for updates.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Children Under the Age of 18
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		No one under the age of eighteen (18) may provide any personal information to or on the Website
		without verifiable parental consent. Please note that we do not knowingly collect any personally
		identifiable information from children under the age of eighteen (18) without obtaining
		verifiable consent from that child’s parent or guardian (“Parental Consent”), except for the
		limited amount of personally identifiable information we need to collect in order to obtain
		Parental Consent (“Required Information”). Until we have received Parental Consent, we will only
		use Required Information for the purpose of obtaining Parental Consent. If you are a child under
		the age of eighteen (18), please do not attempt to use or register for the Website or send any
		personal information about yourself to us before we obtain Parental Consent, except for the
		Required Information for purposes of the Parental Consent process. If you are a parent or legal
		guardian and think that your child under the age of eighteen (18) has given us information
		<!-- svelte-ignore missing-declaration -->
		(beyond the Required Information) without our obtaining Parental Consent, please
		<A on:click={() => fillDrawer('Contact Us', Contact, null)}>Contact Us</A>.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Information We Collect About You and How We Collect It
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		We collect several types of information from and about users of our Website, including
		information:
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>
				By which you may be personally identified, such as name, address, e-mail address, industry,
				workplace company, field of work, telephone number, or any other identifier by which a user
				may be contacted online or offline, and credit card number or other payment information (via
				our third-party payment processor that we currently use) (collectively, “personal
				information”);
			</Li>
			<Li>That is about you but individually does not identify you; and/or</Li>
			<Li
				>About your Internet connection, the equipment you use to access our Website, and usage
				details.
			</Li>
		</List>
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">We collect this information:</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>Directly from you when you provide it to us.</Li>
			<Li>
				Automatically as you navigate through the site. Information collected automatically may
				include usage details, IP addresses, and information collected through cookies and web
				beacons.</Li
			>
			<Li>From third parties, for example, our business partners.</Li>
		</List>
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Information You Provide to Us
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		The information we collect on or through our Website may include:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>
				Information that you provide by filling in forms on our Website. This includes information
				provided at the time of registering to use our Website, subscribing to our service, posting
				material, interactive comments or chats with other Users and visible to public visitors of
				the Website, or requesting further services. We may also ask you for information when you
				enter a contest or promotion sponsored by us, and when you report a problem with our
				Website.
			</Li>
			<Li>
				Records and copies of your correspondence (including email addresses) if you contact us.
			</Li>
			<Li>Your responses to surveys that we might ask you to complete for research purposes.</Li>
			<Li>
				Details of transactions you carry out through our Website and of the fulfillment of your
				orders. You may be required to provide financial information before placing an order through
				our Website.
			</Li>
			<Li>Your search queries on the Website.</Li>
		</List>
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		You also may provide information to be published or displayed (hereinafter, “posted”) on public
		areas of the Website or transmitted to other users of the Website or third parties
		(collectively, “User Contributions”). Your User Contributions are posted on and transmitted to
		others at your own risk. Although you may set certain privacy settings for such information by
		logging into your account profile, please be aware that no security measures are perfect or
		impenetrable. Additionally, we cannot control the actions of other users of the Website with
		whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee
		that your User Contributions will not be viewed by unauthorized persons.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Information We Collect Through Automatic Data Collection Technologies.
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		As you navigate through and interact with our Website, we may use automatic data collection
		technologies to collect certain information about your equipment, browsing actions, and
		patterns, including:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li
				>Details of your visits to our Website, including communication data and the resources that
				you access and use on the Website.
			</Li>
			<Li>
				Information about your computer and Internet connection, including your IP address,
				operating system, and browser type.
			</Li>
		</List>

		We also may use these technologies to collect information about your online activities over time
		and across third-party websites or other online services (behavioral tracking).
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		The information we collect automatically is only statistical data and does not include personal
		information. It helps us to improve our Website and to deliver a better and more personalized
		service, including by enabling us to:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>Estimate our audience size and usage patterns.</Li>
			<Li
				>Store information about your preferences, allowing us to customize our Website according to
				your individual interests.</Li
			>
			<Li>Speed up your searches.</Li>
			<Li>Recognize you when you return to our Website.</Li>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		The technologies we use for this automatic data collection may include:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li
				>Cookies (or browser cookies). A cookie is a small file placed on the hard drive of your
				computer. You may refuse to accept browser cookies by activating the appropriate setting on
				your browser. However, if you select this setting you may be unable to access certain parts
				of our Website. Unless you have adjusted your browser setting so that it will refuse
				cookies, our system will issue cookies when you direct your browser to our Website.</Li
			>
			<Li
				>Flash Cookies. Certain features of our Website may use local stored objects (or Flash
				cookies) to collect and store information about your preferences and navigation to, from,
				and on our Website. Flash cookies are not managed by the same browser settings as are used
				for browser cookies. For information about managing your privacy and security settings for
				Flash cookies, see Choices About How We Use and Disclose Your Information.</Li
			>
			<Li
				>Web Beacons. Pages of our Website and our emails may contain small electronic files known
				as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that
				permit the Company, for example, to count users who have visited those pages or opened an
				email and for other related website statistics (for example, recording the popularity of
				certain website content and verifying system and server integrity).
			</Li>
		</List>

		We do not collect personal information automatically, but we may tie this information to
		personal information about you that we collect from other sources or you provide to us.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Third-Party Use of Cookies and Other Tracking Technologies
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		Some content or applications, including advertisements, on the Website are served by
		third-parties including advertisers, ad networks and servers, content providers, and application
		providers. These third parties may use cookies alone or in conjunction with web beacons or other
		tracking technologies to collect information about you when you use our website. The information
		they collect may be associated with your personal information or they may collect information,
		including personal information, about your online activities over time and across different
		websites and other online services. They may use this information to provide you with
		interest-based (behavioral) advertising or other targeted content.
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		We do not control these third parties’ tracking technologies or how they may be used. If you
		have any questions about an advertisement or other targeted content, you should contact the
		responsible provider directly. For information about how you can opt out of receiving targeted
		advertising from many providers, see Choices About How We Use and Disclose Your Information.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		How We Use Your Information
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		We use information that we collect about you or that you provide to us, including any personal
		information:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>To present our Website and its contents to you.</Li>
			<Li>To provide you with information, products, or services that you request from us.</Li>
			<Li>To fulfill any other purpose for which you provide it.</Li>
			<Li>To send emails to the user from the Company.</Li>
			<Li>To provide to third-party video conferencing services, such as Zoom.</Li>
			<Li
				>To provide you with notices about your account, including expiration and renewal notices.</Li
			>
			<Li
				>To carry out our obligations and enforce our rights arising from any contracts entered
				between you and us, including for billing and collection.</Li
			>
			<Li
				>To notify you about changes to our Website or any products or services we offer or provide
				though it.</Li
			>
			<Li>To allow you to participate in interactive features on our Website.</Li>
			<Li>In any other way we may describe when you provide the information.</Li>
			<Li>For any other purpose with your consent.</Li>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		We may also use your information to contact you about our own and third-parties’ goods and
		services that may be of interest to you. For more information, see Choices About How We Use and
		Disclose Your Information.
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		We may use the information we have collected from you to enable us to display advertisements to
		our advertisers’ target audiences. Even though we do not disclose your personal information for
		these purposes without your consent, if you click on or otherwise interact with an
		advertisement, the advertiser may assume that you meet its target criteria.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Disclosure of Your Information
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		We may disclose aggregated information about our users, and information that does not identify
		any individual, without restriction.
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		We may disclose personal information that we collect, or you provide as described in this
		privacy policy:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>To our subsidiaries and affiliates.</Li>
			<Li
				>To contractors, service providers, and other third parties we use to support our business
				and who are bound by contractual obligations to keep personal information confidential and
				use it only for the purposes for which we disclose it to them.</Li
			>
			<Li
				>To a buyer or other successor in the event of a merger, divestiture, restructuring,
				reorganization, dissolution, or other sale or transfer of some or all of the Company’s
				assets or equity securities, whether as a going concern or as part of bankruptcy,
				liquidation, or similar proceeding, in which personal information held by the Company about
				our Website users is among the assets transferred.</Li
			>
			<Li
				>To third parties to market their products or services to you if you have consented to these
				disclosures. We contractually require these third parties to keep personal information
				confidential and use it only for the purposes for which we disclose it to them. For more
				information, see Choices About How We Use and Disclose Your Information.</Li
			>
			<Li
				>To fulfill the purpose for which you provide it. For example, if you give us an email
				address to use the “email a friend” feature of our Website, we will transmit the contents of
				that email and your email address to the recipients.</Li
			>
			<Li>For any other purpose disclosed by us when you provide the information.</Li>
			<Li>With your consent.</Li>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		We may also disclose your personal information:
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li
				>To comply with any court order, law, or legal process, including to respond to any
				government or regulatory request.</Li
			>
			<Li
				>To enforce or apply our Terms of Use and Privacy Policy and other agreements, including for
				billing and collection purposes.</Li
			>
			<Li
				>If we believe disclosure is necessary or appropriate to protect the rights, property, or
				safety of the Company, our customers, or others. This includes exchanging information with
				other companies and organizations for the purposes of fraud protection and credit risk
				reduction.</Li
			>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		By creating an account, you consent to share your profile information with lecture instructors,
		through features including but not limited to “Virtual Community Events,” should you chose to
		participate in a lecture. In order to carry out an interactive course, you hereby consent to be
		in the virtual lecture in which the Users will be able to see and hear you, should you activate
		your device’s camera and microphone. The recordings will then be uploaded to a third-party video
		share platform, Vimeo, to an unlisted link which will not be publicly available. The Company
		reserves the right to store recordings of lectures to be used for replay. As a part of these
		recordings, the viewer will be able to see the recordings of Users who were in the lecture for
		the duration of the lecture. Users hereby provide their consent to the Company to photograph,
		film, videotape, record, identify or otherwise use, reproduce, User’s image, name, likeness,
		voice, appearance, and characteristics to use, re-use and duplicate the results thereof
		including, without limitation, all photographs, film, video, and/or audio recordings
		incorporating the User’s appearance, in all materials for Company to include in replay videos
		available on the Website for all registered Users.
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		Recordings of user contributions and user information will be stored on Vimeo and the Company’s
		server. The Company retains all personal information on its secure server. Lectures held over
		the third-party video conferencing platforms, such as Zoom, will also be stored on their
		respective cloud server. Your data will be stored for up to ten (10) years.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Choices About How We Use and Disclose Your Information
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		We strive to provide you with choices regarding the personal information you provide to us. We
		have created mechanisms to provide you with the following control over your information:
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li
				>Tracking Technologies and Advertising. You can set your browser to refuse all or some
				browser cookies, or to alert you when cookies are being sent. To learn how you can manage
				your Flash cookie settings, visit the Flash player settings page on Adobe’s website. If you
				disable or refuse cookies, please note that some parts of this site may then be inaccessible
				or not function properly.</Li
			>
			<Li
				>Disclosure of Your Information for Third-Party Advertising. If you do not want us to share
				your personal information with unaffiliated or non-agent third parties for promotional
				purposes, you can opt out by e-mailing us at info@auditopia.com.</Li
			>
			<Li
				>Promotional Offers from the Company. If you do not wish to have your email address used by
				the Company to promote our own or third parties’ products or services, you can opt out by
				clicking the “Unsubscribe” link available in all promotional emails sent through our
				third-party marketing platform, ConvertKit.</Li
			>
			<Li
				>Targeted Advertising. If you do not want us to use information that we collect or that you
				provide to us to deliver advertisements according to our advertisers’ target-audience
				preferences, you can opt-out by sending us an email stating your request to
				info@auditopia.com.
			</Li>
		</List>
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		We do not control third parties’ collection or use of your information to serve interest-based
		advertising.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Accessing and Correcting Your Information
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		You can review and change your personal information by logging into the Website and visiting
		your account profile page.
	</P>
	<P weight="light" color="text-gray-500" class="text-justify">
		If you delete your User Contributions from the Website, copies of your User Contributions may
		remain viewable in cached and archived pages or might have been copied or stored by other
		Website users. Proper access and use of information provided on the Website, including User
		Contributions, is governed by our Terms of Service.
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Your Data Protection Rights
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		Each user maintains the following rights with respect to the company pertaining to their data
	</P>

	<P weight="light" color="text-gray-500" class="text-justify">
		<List>
			<Li>The right to access. You have the right to request copies of your personal data.</Li>
			<Li
				>The right to rectification. You have the right to request that the Company correct any
				information you believe is inaccurate. You also have the right to request the Company to
				complete the information you believe is incomplete.</Li
			>
			<Li
				>The right to erasure. You have the right to request that the Company erase your personal
				data, under certain conditions.</Li
			>
			<Li
				>The right to restrict processing. You have the right to request that the Company restrict
				the processing of your personal data, under certain conditions.</Li
			>
			<Li
				>The right to object to processing. You have the right to object to the Company’s processing
				of your personal data, under certain conditions.</Li
			>
			<Li
				>The right to data portability. You have the right to request that the Company transfer the
				data that we have collected to another organization, or directly to you, under certain
				conditions.</Li
			>
		</List>
	</P>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Data Security
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		We have implemented measures designed to secure your personal information from accidental loss
		and from unauthorized access, use, alteration, and disclosure. All information you provide to us
		is stored on our secure servers behind firewalls. Any payment transactions will be encrypted.</P
	>
	<P weight="light" color="text-gray-500" class="text-justify">
		The safety and security of your information also depends on you. Where we have given you (or
		where you have chosen) a password for access to certain parts of our Website, you are
		responsible for keeping this password confidential. We ask you not to share your password with
		anyone. We urge you to be careful about giving out information in public areas of the Website
		like message boards, as applicable. The information you share in public areas may be viewed by
		any user of the Website.</P
	>
	<P weight="light" color="text-gray-500" class="text-justify">
		Unfortunately, the transmission of information via the Internet is not completely secure.
		Although we do our best to protect your personal information, we cannot guarantee the security
		of your personal information transmitted to our Website. Any transmission of personal
		information is at your own risk. We are not responsible for circumvention of any privacy
		settings or security measures contained on the Website.</P
	>

	<Heading tag="h2" customSize="text-lg font-semibold" class="mb-2 text-lg font-semibold">
		Changes to Our Privacy Policy
	</Heading>

	<P weight="light" color="text-gray-500" class="text-justify">
		It is our policy to post any changes we make to our privacy policy on this page. If we make
		material changes to how we treat our users’ personal information, we will notify you by email to
		the primary email address specified in your account. The date the privacy policy was last
		revised is identified at the top of the page. You are responsible for ensuring we have an
		up-to-date active and deliverable email address for you, and for periodically visiting our
		Website and this privacy policy to check for any changes.
	</P>
</div>
