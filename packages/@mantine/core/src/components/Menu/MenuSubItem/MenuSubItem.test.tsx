import { createContextContainer, render, screen, tests, userEvent } from '@mantine-tests/core';
import { Menu } from '../Menu';
import { MenuSubItem, MenuSubItemProps, MenuSubItemStylesNames } from './MenuSubItem';

const TestContainer = createContextContainer<any>(MenuSubItem, Menu, { opened: true });

const defaultProps: MenuSubItemProps = {
  children: 'test-menu-item',
  leftSection: '$$',
};

describe('@mantine/core/MenuSubItem', () => {
  tests.itSupportsSystemProps<MenuSubItemProps, MenuSubItemStylesNames>({
    component: TestContainer as any,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLButtonElement,
    displayName: '@mantine/core/MenuSubItem',
    stylesApiSelectors: ['item', 'itemSection', 'itemLabel'],
    stylesApiName: 'Menu',
    compound: true,
    providerStylesApi: false,
  });

  it('allows to add onMouseEnter and onMouseLeave events', async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    render(<TestContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    await userEvent.hover(screen.getByRole('menuitem'));
    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseLeave).not.toHaveBeenCalled();

    await userEvent.unhover(screen.getByRole('menuitem'));
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('allows to add onClick event', async () => {
    const spy = jest.fn();
    render(<TestContainer onClick={spy} />);
    expect(spy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('menuitem'));
    expect(spy).toHaveBeenCalled();
  });

  it('renders given leftSection and rightSection', () => {
    render(<TestContainer leftSection="test-left-section" rightSection="test-right-section" />);
    expect(screen.getByText('test-left-section')).toBeInTheDocument();
    expect(screen.getByText('test-right-section')).toBeInTheDocument();
  });
});
