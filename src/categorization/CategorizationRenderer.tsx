import React from 'react';
import { Button } from 'antd';

export interface Category {
    label: string;
    schema: object;
}

interface CategorizationRendererProps {
    categories: Category[];
    activeCategoryIndex: number;
    onSelect: (index: number) => void;
}

const CategorizationRenderer: React.FC<CategorizationRendererProps> = ({
                                                                           categories,
                                                                           activeCategoryIndex,
                                                                           onSelect,
                                                                       }) => {
    return (
        <div>
            {categories.map((category, index) => (
                <Button
                    key={index}
                    onClick={() => onSelect(index)}
                    type={index === activeCategoryIndex ? 'primary' : 'default'}
                    style={{ display: 'block', margin: '8px 0' }}
                >
                    {category.label}
                </Button>
            ))}
        </div>
    );
};

export default CategorizationRenderer;
