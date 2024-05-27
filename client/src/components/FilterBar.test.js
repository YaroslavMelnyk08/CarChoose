import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { observer } from 'mobx-react-lite';
import { Provider } from 'mobx-react';
import FilterBar from '../FilterBar';
import { Context } from '..';

// Мокові дані для контексту
const mockAdStore = {
    paintConditions: [
        { id: 1, paint_condition_name: 'Good', paint_condition_description: 'Good condition' },
        { id: 2, paint_condition_name: 'Bad', paint_condition_description: 'Bad condition' }
    ],
    colors: [
        { id: 1, color_name: 'Red' },
        { id: 2, color_name: 'Blue' }
    ],
    accidents: [
        { id: 1, accident_name: 'No' },
        { id: 2, accident_name: 'Yes' }
    ],
    drivenFrom: [
        { id: 1, country_name: 'Germany' },
        { id: 2, country_name: 'USA' }
    ],
    selectedPaintCondition: null,
    selectedColor: null,
    selectedAccident: null,
    selectedDrivenFrom: null,
    setPage: jest.fn(),
    setSelectedPaintCondition: jest.fn(),
    setSelectedColor: jest.fn(),
    setSelectedAccident: jest.fn(),
    setSelectedDrivenFrom: jest.fn(),
};

const mockContext = {
    ad: mockAdStore
};

test('renders FilterBar component', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    expect(screen.getByText('Оберіть стан ЛКП')).toBeInTheDocument();
    expect(screen.getByText('Оберіть колір')).toBeInTheDocument();
    expect(screen.getByText('Участь у ДТП')).toBeInTheDocument();
    expect(screen.getByText('Куплений в / Пригнаний з')).toBeInTheDocument();
});

test('handles paint condition selection', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    fireEvent.click(screen.getByText('Good'));
    expect(mockAdStore.setSelectedPaintCondition).toHaveBeenCalledWith(mockAdStore.paintConditions[0]);
    expect(mockAdStore.setPage).toHaveBeenCalledWith(1);
});

test('handles color selection', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    fireEvent.click(screen.getByText('Red'));
    expect(mockAdStore.setSelectedColor).toHaveBeenCalledWith(mockAdStore.colors[0]);
    expect(mockAdStore.setPage).toHaveBeenCalledWith(1);
});

test('handles accident selection', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    fireEvent.click(screen.getByText('Yes'));
    expect(mockAdStore.setSelectedAccident).toHaveBeenCalledWith(mockAdStore.accidents[1]);
    expect(mockAdStore.setPage).toHaveBeenCalledWith(1);
});

test('handles driven from selection', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    fireEvent.click(screen.getByText('Germany'));
    expect(mockAdStore.setSelectedDrivenFrom).toHaveBeenCalledWith(mockAdStore.drivenFrom[0]);
    expect(mockAdStore.setPage).toHaveBeenCalledWith(1);
});

test('handles reset button click', () => {
    render(
        <Context.Provider value={mockContext}>
            <FilterBar />
        </Context.Provider>
    );

    fireEvent.click(screen.getByText('Скинути'));
    expect(mockAdStore.setSelectedPaintCondition).toHaveBeenCalledWith(null);
    expect(mockAdStore.setSelectedColor).toHaveBeenCalledWith(null);
    expect(mockAdStore.setSelectedAccident).toHaveBeenCalledWith(null);
    expect(mockAdStore.setSelectedDrivenFrom).toHaveBeenCalledWith(null);
    expect(mockAdStore.setPage).toHaveBeenCalledWith(1);
});
