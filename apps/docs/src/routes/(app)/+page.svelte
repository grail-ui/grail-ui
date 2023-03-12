<script lang="ts">
	import SvelteIcon from '~icons/logos/svelte-icon';
	import GithubIcon from '~icons/mdi/github';
	import ComposableIcon from '~icons/simple-icons/databricks';
	import CustomizableIcon from '~icons/codicon/settings';
	import RobustIcon from '~icons/pajamas/review-checkmark';
	import AccessibilityIcon from '~icons/carbon/accessibility-alt';
	import DeveloperIcon from '~icons/mdi/emoticon-happy-outline';
	import FreeIcon from '~icons/octicon/law-24';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
	import Logo from '$lib/Logo.svelte';
	import Footer from '$lib/layout/Footer.svelte';

	const features = [
		{
			header: 'Accessibility',
			text: `Built with accessibility in mind, that strictly adheres to WAI-ARIA standards. This includes comprehensive support for screen readers, focus management, and keyboard navigation, ensuring that our components are usable and accessible to all users.`,
			icon: AccessibilityIcon,
		},
		{
			header: 'Composable',
			text: `Composition is at the core of everything we build. Everything is designed to offer maximum flexibility and seamless integration with your application's requirements and branding. We focus on providing developers with the tools they need to create custom, user-friendly components that fit seamlessly into their projects.`,
			icon: ComposableIcon,
		},
		{
			header: 'Customizable',
			text: `We provide configurable behaviors, interactions, and event listeners, but we don't dictate the DOM structure of your components. This allows you to bring your own styles and transitions, giving you full control over the appearance and functionality of your components.`,
			icon: CustomizableIcon,
		},
		{
			header: 'No trade-offs',
			text: `Designed to be intuitive and easy to use, without requiring prior experience, knowledge, or taste. We don't introduce any wrapper components or new APIs to learn, so everything will feel natural and familiar. This means that you can focus on building great applications without being bogged down by unnecessary complexity.`,
			icon: DeveloperIcon,
		},
		{
			header: 'Robust',
			text: `Fully documented, with comprehensive examples, API references, and TypeScript support. Tested across a wide range of devices and browsers to ensure that it is reliable and performs well in a variety of environments. We are committed to providing developers with a high-quality, well-supported library that meets their needs and exceeds their expectations.`,
			icon: RobustIcon,
		},
		{
			header: 'SSR',
			text: `Seamlessly integrates with server-side rendering, eliminating the annoying issue of unstyled content flashing on the page.`,
			icon: FreeIcon,
		},
	];
</script>

<div class="max-w-8xl prose mx-auto px-4 lg:px-8">
	<div class="py-10 md:py-20">
		<div class="flex max-w-[800px] flex-col gap-5">
			<h1 class="mb-0">Put control back in developers’ hands.</h1>
			<h2 class="my-0 text-xl font-bold md:text-2xl">
				A set of component primitives, actions and utilities that help you build accessible and high
				quality Svelte applications faster, while providing a great developer experience.
			</h2>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<div>
					<h3 class="my-0 flex items-center gap-1.5 text-xl font-semibold">
						<svelte:component this={feature.icon} />
						{feature.header}
					</h3>
					<div class="mt-1.5">{feature.text}</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 flex flex-col gap-2 sm:flex-row sm:items-center">
			<a href="/svelte/getting-started" class="btn sm:btn-lg flex items-center gap-4 px-10"
				>Get started</a
			>
			<a href={PUBLIC_GITHUB_URL} class="btn sm:btn-lg btn-outline flex items-center gap-2 px-10"
				><GithubIcon /> GitHub</a
			>
		</div>
	</div>

	<div class="flex flex-col gap-24 py-10 md:py-20">
		<div class="flex gap-x-10">
			<div class="flex-1">
				<div class="text-3xl font-bold">The challenge</div>
				<div>
					<p>
						Many companies today are creating their own component libraries and design systems from
						scratch in order to align with their brand and meet the specific needs of their users.
						However, building and maintaining these libraries can be resource-intensive and require
						expertise in areas such as accessibility, keyboard navigation, touch interactions, and
						browser inconsistencies.
					</p>
					<p>
						In the Svelte ecosystem, there are limited options available that can be used as the
						base for building such custom component libraries. Some developers choose to wrap fully
						styled component libraries such as Material UI, but their components can be difficult to
						style and customize to fit specific needs.
					</p>
					<p class="not-prose">
						In recent years, the use of unstyled components (also known as "renderless components")
						has gained popularity in other ecosystems and has now made its way to Svelte. One
						example of this approach is Headless UI, which provides wrapper components with <code
							>&lt;slots&gt;</code
						> for custom HTML and styles. However, this approach has its drawbacks, as the wrapper components
						require the use of custom, non-standard methods for actions, transitions, and composition,
						which may not feel intuitive to Svelte developers.
					</p>
				</div>
			</div>

			<div class="hidden w-1/3 justify-center md:flex">
				<img src="/engineering_team.svg" alt="engineering team" class="aspect-[867/443] w-full" />
			</div>
		</div>

		<div class="flex gap-x-10">
			<div class="hidden w-1/3 items-center justify-center gap-3 md:flex">
				<Logo size="110" class="mr-2" />
				<span class="font-extrabold" style="font-size: 60px">+</span>
				<SvelteIcon style="font-size: 90px" />
			</div>

			<div class="flex-1">
				<div class="text-3xl font-bold">A better approach</div>
				<div>
					<p>
						Grail UI introduces a fresh approach to building components in Svelte. Our goal is to
						provide developers with a comprehensive library of component primitives, actions, and
						utilities that can serve as the "holy grail" for constructing accessible components,
						design systems, and applications from the ground up with speed and efficiency. We've put
						significant effort into decoupling behavior and accessibility from the DOM structure,
						allowing developers to focus on creating intuitive and user-friendly web experiences.
					</p>
					<p class="font-semibold">
						Grail UI allows developers to retain full control over layout, bindings, and
						transitions, while providing built-in support for behaviors and accessibility. This
						means that you can customize the appearance and functionality of your components to meet
						the needs of your application, while benefiting from the time-saving and user-friendly
						features of our library.
					</p>
					<p>
						Svelte is a powerful framework, and we wanted to enhance it rather than detract from it.
						Grail UI is designed to be lightweight, fast, and easy to compose with other components.
						We believe that our library represents a new and improved way of building components in
						Svelte, and we welcome you to try it out and see the difference it can make for your
						projects.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div
		class="bg-base-200/30 mx-auto my-12 flex max-w-2xl flex-col items-center gap-8 p-10 shadow-xl"
	>
		<div class="text-center text-4xl font-extrabold">
			Start building your design system with Grail UI now.
		</div>

		<a href="/svelte/getting-started" class="btn sm:btn-lg btn-wide flex items-center gap-4"
			>Go to docs</a
		>
	</div>
</div>
<Footer />

<style>
	h1 {
		background-image: linear-gradient(45deg, #4d3ae4 0%, hsl(310, 74%, 45%) 50%, #f88644 100%);
		font-size: clamp(45px, 6.5vw, 80px);
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -1px;
		box-decoration-break: clone;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
