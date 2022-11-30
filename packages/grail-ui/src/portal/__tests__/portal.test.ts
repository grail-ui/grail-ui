import { render, screen } from '@testing-library/svelte';
import PortalTest from './PortalTest.svelte';

describe('portal', () => {
  it('allows to render inside another element', async () => {
    const { component } = render(PortalTest);
    const node = screen.getByTestId('node');
    const container1 = screen.getByTestId('c1');
    const container2 = screen.getByTestId('c2');

    expect(container1).toContainElement(node);
    expect(container2).not.toContainElement(node);

    await component.$set({ portalId: 2 });
    expect(container1).not.toContainElement(node);
    expect(container2).toContainElement(node);
  });
});
