// components/CategorizationRenderer.tsx
import React, { useMemo } from 'react';
import { Category, Categorization, isVisible } from '@jsonforms/core';

interface CategorizationRendererProps {
    elements: (Category | Categorization)[];
    selectedCategory: Category;
    data: any;
    depth?: number;
    onSelect: (index: number) => void;
    subcategoriesClassName?: string;
    groupClassName?: string;
}

const isCategorization = (element: Category | Categorization): element is Categorization =>
    (element as Categorization).type === 'Categorization';

const getCategoryClassName = (category: Category, selectedCategory: Category): string =>
    selectedCategory === category ? 'selected' : '';

const CategorizationRenderer: React.FC<CategorizationRendererProps> = ({
                                                                           selectedCategory,
                                                                           elements,
                                                                           data,
                                                                           depth = 0,
                                                                           onSelect,
                                                                           subcategoriesClassName = 'subcategories',
                                                                           groupClassName = 'group',
                                                                       }) => {
    const filteredElements = useMemo(() => {
        return elements.filter((category) => isVisible(category, data, '', null as any));
    }, [elements, data]);

    return (
        <ul className={subcategoriesClassName}>
            {filteredElements.map((category, idx) => {
                if (isCategorization(category)) {
                    return (
                        <li key={idx} className={groupClassName}>
                            <span>{category.label}</span>
                            <CategorizationRenderer
                                selectedCategory={selectedCategory}
                                elements={category.elements as (Category | Categorization)[]}
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

export default CategorizationRenderer;
