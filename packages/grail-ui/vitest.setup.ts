import '@testing-library/jest-dom/extend-expect';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations as never);
