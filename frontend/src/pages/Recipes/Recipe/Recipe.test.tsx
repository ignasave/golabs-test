/* test for Recipe component */
import { render, screen } from '@testing-library/react';
import Recipe from './index';

test('renders Recipe component', () => {
	render(<Recipe recipe={{ title: '', description: '', duration: 0, id: '1' }} />);
});
test('renders Recipe component with title', () => {
	render(<Recipe recipe={{ title: 'title', description: '', duration: 0, id: '1' }} />);
	expect(screen.getByText('title')).toBeInTheDocument();
});
test('renders Recipe component with description', () => {
	render(<Recipe recipe={{ title: '', description: 'description', duration: 0, id: '1' }} />);
	expect(screen.getByText('description')).toBeInTheDocument();
});
test('renders Recipe component with duration', () => {
	render(<Recipe recipe={{ title: '', description: '', duration: 10, id: '1' }} />);
	expect(screen.getByText('10')).toBeInTheDocument();
});
