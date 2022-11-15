<script lang="ts">
  import SvelteIcon from '~icons/logos/svelte-icon';
  import GithubIcon from '~icons/mdi/github';
  import ComposableIcon from '~icons/simple-icons/databricks';
  import CustomizableIcon from '~icons/codicon/settings';
  import RobustIcon from '~icons/pajamas/review-checkmark';
  import AccessibilityIcon from '~icons/carbon/accessibility-alt';
  import DeveloperIcon from '~icons/mdi/emoticon-happy-outline';
  import FreeIcon from '~icons/octicon/law-24';

  const feautures = [
    {
      header: 'Accessibility',
      text: `We provide accessibility and behavior that strictly follows WAI-ARIA standards, including screen reader, focus management and keyboard navigation support.`,
      icon: AccessibilityIcon,
    },
    {
      header: 'Composable',
      text: `Everything is built from the ground up with composition in mind. We focus on development flexibility and seamless integration with your application’s requirements and branding.`,
      icon: ComposableIcon,
    },
    {
      header: 'Customizable',
      text: `We just configure behavior, interactions and event listeners. We don’t impose any DOM structure. Bring your own styles and transitions.`,
      icon: CustomizableIcon,
    },
    {
      header: 'No trade-offs',
      text: `Everything will feel "natural" without depending on prior experience, knowledge and taste. No wrapper components, no new APIs to learn.`,
      icon: DeveloperIcon,
    },
    {
      header: 'Robust',
      text: `Everything is fully documented with examples, API references, Typescript support and tested across a wide variety of devices and browsers. We are not cutting corners.`,
      icon: RobustIcon,
    },
    {
      header: 'SSR',
      text: `Works perfectly with server-side rendering. No more flashing of unstyled content.`,
      icon: FreeIcon,
    },
  ];
</script>

<div class="wrapper">
  <div class="container mx-auto px-4 py-10 md:py-20">
    <div class="flex gap-24 items-start">
      <div class="flex flex-col gap-5 max-w-[800px]">
        <h1 class="font-black">Put control back in developers’ hands.</h1>
        <h2 class="text-xl md:text-2xl font-bold">
          A set of component primitives, actions and utilities that help you build accessible and high quality Svelte
          applications faster, while providing a great developer experience.
        </h2>
      </div>
      <!-- LogoIcon -->
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-20 max-w-7xl">
      {#each feautures as feauture}
        <div>
          <h3 class="flex items-center gap-1.5 text-xl font-semibold">
            <svelte:component this={feauture.icon} />
            {feauture.header}
          </h3>
          <div class="mt-1.5">{feauture.text}</div>
        </div>
      {/each}
    </div>

    <div class="flex items-center gap-2 mt-16">
      <a href="/getting-started" class="btn btn-lg px-10 flex items-center gap-4">Get started</a>
      <button class="btn btn-lg px-10 btn-outline flex items-center gap-2"><GithubIcon /> GitHub</button>
    </div>
  </div>
</div>

<div class="container mx-auto px-4 py-10 md:py-20 flex flex-col gap-24">
  <div class="flex gap-x-10 max-w-7xl">
    <div class="w-2/3">
      <div class="text-3xl font-bold">The challenge</div>
      <div class="flex flex-col gap-6 mt-6">
        <p>
          Today, many companies are implementing their own component libraries and design systems <i>from scratch</i>,
          in order to match their brand and support their unique use cases. Unfortunately, many teams don't have the
          resources, expertize or time to prioritize features like accessibility, keyboard navigation, touch
          interactions, browser inconsistencies and many more.
        </p>
        <p>
          Especially in the Svelte ecosystem, the existing options that can be used as the base for such effort are
          limited. One of them, is to use one of the fully styled component libraries, like Material UI, but their
          components are hard to style and even harder to alter their functionallity and layout to match your specific
          needs.
        </p>
        <p>
          The other option is to use unstyled components (a.k.a. renderless components), like Headless UI, which are
          mainly using wrapper components with <code>&lt;slots&gt;</code> that you can provide your own HTML and styles.
          The problem here is that this abstraction does come with <b>trade-offs</b>. Because of the wrapper components
          there is a need to introduce new, custom ways to use actions, do transitions and achieve any kind of
          composition, which doesn't feel "natural".
        </p>
      </div>
    </div>

    <div class="w-1/3 flex justify-center">
      <img src="/engineering_team.svg" alt="engineering team" />
    </div>
  </div>

  <div class="flex gap-x-10 max-w-7xl">
    <div class="w-1/3 flex items-center gap-10">
      <SvelteIcon style="font-size: 180px" />
    </div>

    <div class="w-2/3">
      <div class="text-3xl font-bold">The better apporach</div>
      <div class="flex flex-col gap-6 mt-6">
        <p>
          Grail UI is a new approach to the component creation process, that helps you avoid re-inventing the wheel. The
          goal is to provide an open-source library with component primitives, actions and utilities, that the Svelte
          community can leverage and use as the "holy grail" to build accessible components, design systems and
          applications from the ground up. We put a lot of effort to separate behavior and accessibility from the actual
          DOM structure.
        </p>
        <p class="font-bold italic">
          Developers remain in complete control over the layout, the bindings and the transitions but also get most of
          the behavior and accessibility support for free.
        </p>
        <p>
          Svelte is powerful framework, and we didn't want take anything away from it.<br />What we add will always be
          <i>small</i>, <i>fast</i>
          and
          <i>composable</i>.
        </p>
        <p class="font-bold">Welcome to the future of building Svelte components!</p>
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    background-image: linear-gradient(334deg, #f8f9fa 25%, rgba(0, 0, 0, 0) 95%);
  }

  h1 {
    font-size: clamp(45px, 6.5vw, 80px);
    line-height: 0.95;
    letter-spacing: -1px;
    background-image: linear-gradient(45deg, #4d3ae4 0%, hsl(310, 74%, 45%) 50%, #f88644 100%);
    box-decoration-break: clone;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
