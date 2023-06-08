# @grail-ui/svelte

## 0.9.5

### Patch Changes

- [#136](https://github.com/grail-ui/grail-ui/pull/136) [`e9d9a98`](https://github.com/grail-ui/grail-ui/commit/e9d9a9832522a1392b252f7cc7b5534b1786f0d1) Thanks [@bekos](https://github.com/bekos)! - Menu closes when clicking any descendant of trigger

## 0.9.4

### Patch Changes

- [#132](https://github.com/grail-ui/grail-ui/pull/132) [`844c70e`](https://github.com/grail-ui/grail-ui/commit/844c70eaa68592ee8d98d99e1e753e0413751d50) Thanks [@bekos](https://github.com/bekos)! - ClickOutside: listener should not be passive to allow `preventDefault`

## 0.9.3

### Patch Changes

- [#126](https://github.com/grail-ui/grail-ui/pull/126) [`57ac83e`](https://github.com/grail-ui/grail-ui/commit/57ac83e83941c68660d134562cc56c30465983ad) Thanks [@bekos](https://github.com/bekos)! - Tooltip: support custom close delay & improve accessibility for keyboard triggered ones

- [#128](https://github.com/grail-ui/grail-ui/pull/128) [`918ded2`](https://github.com/grail-ui/grail-ui/commit/918ded296f6a70af3b81942f4c121421261562c1) Thanks [@bekos](https://github.com/bekos)! - Accordion: prevent error when clicking inside content

## 0.9.2

### Patch Changes

- [#121](https://github.com/grail-ui/grail-ui/pull/121) [`de9f9e3`](https://github.com/grail-ui/grail-ui/commit/de9f9e35cf591684ecd440250c61a0040d070572) Thanks [@bekos](https://github.com/bekos)! - Modal: delay focus trap activation to prevent edge case issues

- [#125](https://github.com/grail-ui/grail-ui/pull/125) [`adb8657`](https://github.com/grail-ui/grail-ui/commit/adb86570711a124b9934911c50d6f31689ea7046) Thanks [@bekos](https://github.com/bekos)! - Menu item triggers when clicking any descendant

## 0.9.1

### Patch Changes

- [#118](https://github.com/grail-ui/grail-ui/pull/118) [`3965687`](https://github.com/grail-ui/grail-ui/commit/3965687515beaaa745424d2e44ece05120ad12cd) Thanks [@bekos](https://github.com/bekos)! - Popover closes when clicking any descendant

## 0.9.0

### Minor Changes

- [#101](https://github.com/grail-ui/grail-ui/pull/101) [`9cbe7e1`](https://github.com/grail-ui/grail-ui/commit/9cbe7e1c326c62af9500762558276fdda1e4baa8) Thanks [@bekos](https://github.com/bekos)! - Tooltip hides on `Escape`

- [#115](https://github.com/grail-ui/grail-ui/pull/115) [`7568ea4`](https://github.com/grail-ui/grail-ui/commit/7568ea40011c88612d839517e00d73f06f3468c9) Thanks [@ihym](https://github.com/ihym)! - Add textarea autosize module

- [#114](https://github.com/grail-ui/grail-ui/pull/114) [`8e51b58`](https://github.com/grail-ui/grail-ui/commit/8e51b585036d41f395b4a853fb0e68da5479eb31) Thanks [@bekos](https://github.com/bekos)! - Add resize observer module

## 0.8.0

### Minor Changes

- [#95](https://github.com/grail-ui/grail-ui/pull/95) [`7fa21de`](https://github.com/grail-ui/grail-ui/commit/7fa21de12a56cd63c8774f3d4f82b6e13118c26d) Thanks [@bekos](https://github.com/bekos)! - Add active element module

- [#98](https://github.com/grail-ui/grail-ui/pull/98) [`2122939`](https://github.com/grail-ui/grail-ui/commit/212293926c9817cc6a156dde39026249519281e2) Thanks [@tkotsopoulos](https://github.com/tkotsopoulos)! - Add script tag module

- [#100](https://github.com/grail-ui/grail-ui/pull/100) [`35db393`](https://github.com/grail-ui/grail-ui/commit/35db3934261fd45d07a78ebe9899a68724b30b2d) Thanks [@bekos](https://github.com/bekos)! - Support `autoUnload` for script tag

### Patch Changes

- [#99](https://github.com/grail-ui/grail-ui/pull/99) [`96aaa99`](https://github.com/grail-ui/grail-ui/commit/96aaa9946527d94f1098aca252f656c7359d94ea) Thanks [@bekos](https://github.com/bekos)! - Enforce fully specified relative imports as per Node ESM algorithm

## 0.7.0

### Minor Changes

- [#88](https://github.com/grail-ui/grail-ui/pull/88) [`727336e`](https://github.com/grail-ui/grail-ui/commit/727336eb3c8a8130327a799b803d2dd67426bd5a) Thanks [@ihym](https://github.com/ihym)! - Revise accordion API to simplify & improve consistency

  - `useAccordion` does not take parameters.
  - Removed `data-*` attributes.
  - High level `disabled` configuration & writable store.
  - `multiple` is now a `boolean`.

- [#88](https://github.com/grail-ui/grail-ui/pull/88) [`8f626a1`](https://github.com/grail-ui/grail-ui/commit/8f626a164f7e4b8bfdfe0e28185623cc474f3847) Thanks [@ihym](https://github.com/ihym)! - Revise tabs API to simplify & improve consistency

  - `useTabs` does not take parameters.
  - Removed `data-*` attributes.
  - High level `disabled` configuration & writable store.
  - Remove default initial value.

### Patch Changes

- [#91](https://github.com/grail-ui/grail-ui/pull/91) [`879ab7a`](https://github.com/grail-ui/grail-ui/commit/879ab7a200b341aa3dfb2354edec8e04ba9abfec) Thanks [@bekos](https://github.com/bekos)! - Loose type checking for tabs

- [#90](https://github.com/grail-ui/grail-ui/pull/90) [`ff605e0`](https://github.com/grail-ui/grail-ui/commit/ff605e03154483cf11646d4167d37d624a527368) Thanks [@bekos](https://github.com/bekos)! - Loose type checking for accordion

## 0.6.2

### Patch Changes

- [#85](https://github.com/grail-ui/grail-ui/pull/85) [`9e0a51f`](https://github.com/grail-ui/grail-ui/commit/9e0a51f57c0fd9fbf617e04c6bbbe692d84dc59f) Thanks [@bekos](https://github.com/bekos)! - Add absolute position for floating arrow to avoid initial "jump"

## 0.6.1

### Patch Changes

- [#83](https://github.com/grail-ui/grail-ui/pull/83) [`07ceb0d`](https://github.com/grail-ui/grail-ui/commit/07ceb0dcf7b9a21ec1ddc57c462491325ecc3b56) Thanks [@bekos](https://github.com/bekos)! - Move `focus-trap` and `@floating-ui/dom` to `dependencies` from `peerDependencies`

## 0.6.0

### Minor Changes

- [#80](https://github.com/grail-ui/grail-ui/pull/80) [`ebefa9b`](https://github.com/grail-ui/grail-ui/commit/ebefa9b4ee09970c7f08baab86886741340475c6) Thanks [@bekos](https://github.com/bekos)! - Rename accordion's `defaultValue` to `value`

- [#80](https://github.com/grail-ui/grail-ui/pull/80) [`0de803f`](https://github.com/grail-ui/grail-ui/commit/0de803fddae63f7d5fee53ea03e9efb01f983a0d) Thanks [@bekos](https://github.com/bekos)! - Rename pagination's `onChange` to `onPageChange`

- [#80](https://github.com/grail-ui/grail-ui/pull/80) [`e5e0fb5`](https://github.com/grail-ui/grail-ui/commit/e5e0fb55632e2a9abf288e6823c84b721da96d85) Thanks [@bekos](https://github.com/bekos)! - Rename tab's `defaultValue` to `value`

## 0.5.0

### Minor Changes

- [#73](https://github.com/grail-ui/grail-ui/pull/73) [`d4cd013`](https://github.com/grail-ui/grail-ui/commit/d4cd013e09e1fb7d267c35862b2fbbaa724ca94c) Thanks [@bekos](https://github.com/bekos)! - Support configurable `dismissible` for modal

- [#75](https://github.com/grail-ui/grail-ui/pull/75) [`e4ed213`](https://github.com/grail-ui/grail-ui/commit/e4ed21384c708a8338b5f8602f257c589d1e8b91) Thanks [@bekos](https://github.com/bekos)! - Support configurable `keyboardDismissible` for modal

## 0.4.0

### Minor Changes

- [#52](https://github.com/grail-ui/grail-ui/pull/52) [`0542e11`](https://github.com/grail-ui/grail-ui/commit/0542e11586099b0a0311b3809b2f36a1965b2d28) Thanks [@bekos](https://github.com/bekos)! - Menu supports generic for item ids

- [#45](https://github.com/grail-ui/grail-ui/pull/45) [`90f635c`](https://github.com/grail-ui/grail-ui/commit/90f635ca5c6308c8de977a997eadd3b3d0023ba7) Thanks [@bekos](https://github.com/bekos)! - Tabs support generic for `value`

- [#51](https://github.com/grail-ui/grail-ui/pull/51) [`f4fb2c2`](https://github.com/grail-ui/grail-ui/commit/f4fb2c27ffd8f1d50c7dc3b778fe2be2d9671016) Thanks [@bekos](https://github.com/bekos)! - Menu supports `onSelect` callback

- [#48](https://github.com/grail-ui/grail-ui/pull/48) [`8b1a473`](https://github.com/grail-ui/grail-ui/commit/8b1a473d4f91b8f0b353e579dea12650e62d3a9c) Thanks [@bekos](https://github.com/bekos)! - Accordion supports generic for `value`

## 0.3.0

### Minor Changes

- [#31](https://github.com/grail-ui/grail-ui/pull/31) [`531ea24`](https://github.com/grail-ui/grail-ui/commit/531ea240cb57e04c9fe596a7c7efd60af3294662) Thanks [@bekos](https://github.com/bekos)! - keyStroke supports `autoStop`

- [`7629c5b`](https://github.com/grail-ui/grail-ui/commit/7629c5b49b63fcf0afd85e1c090483b391677b96) Thanks [@bekos](https://github.com/bekos)! - clickOutside: support predicate function for `ignored`

## 0.2.0

### Minor Changes

- [#28](https://github.com/grail-ui/grail-ui/pull/28) [`cde99a3`](https://github.com/grail-ui/grail-ui/commit/cde99a32cf77bd283dccf8b2e4e39e83045c9193) Thanks [@bekos](https://github.com/bekos)! - timeout: support `autoStop`

## 0.1.0

### Minor Changes

- [`aaa2a5c`](https://github.com/grail-ui/grail-ui/commit/aaa2a5cb99ec51fa245fdd10728197f62b7c9939) Thanks [@bekos](https://github.com/bekos)! - Initial release 🎉
