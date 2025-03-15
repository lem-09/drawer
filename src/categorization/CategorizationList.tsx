import React, { useMemo } from 'react';
import { Category, Categorization, isVisible } from '@jsonforms/core';

const getCategoryClassName = (
    category: Category,
    selectedCategory: Category
): string => (selectedCategory === category ? 'selected' : '');

export interface CategorizationProps {
    elements: (Category | Categorization)[];
    selectedCategory: Category;
    depth: number;
    data: any;
    onSelect: any;
    subcategoriesClassName: string;
    groupClassName: string;
}

const isCategorization = (element: Category | Categorization): element is Categorization => {
    return (element as Categorization).elements !== undefined;
};

export const CategorizationList = ({
                                       selectedCategory,
                                       elements,
                                       data,
                                       depth,
                                       onSelect,
                                       subcategoriesClassName,
                                       groupClassName,
                                   }: CategorizationProps) => {
    const filteredElements = useMemo(() => {
        return elements.filter((category: Category | Categorization) =>
            isVisible(category, data, '', null as any)
        );
    }, [elements, data]);

    return (
        <ul className={subcategoriesClassName}>
            {filteredElements.map((category, idx) => {
                if (isCategorization(category)) {
                    return (
                        <li key={idx} className={groupClassName}>
                            <span>{category.label}</span>
                            <CategorizationList
                                selectedCategory={selectedCategory}
                                elements={category.elements}
                                data={data}
                                depth={depth + 1}
                                onSelect={onSelect}
                                subcategoriesClassName={subcategoriesClassName}
                                groupClassName={groupClassName}
                            />
                        </li>
                    );
                } else {
                    return (
                        <li
                            key={idx}
                            onClick={() => onSelect(idx)}
                            className={getCategoryClassName(category, selectedCategory)}
                        >
                            <span>{category.label}</span>
                        </li>
                    );
                }
            })}
        </ul>
    );
};
