import React from 'react';
import type { Category, JsonSchema } from '@jsonforms/core';
import { JsonFormsDispatch } from '@jsonforms/react';

export interface CategoryProps {
    category: Category;
    schema: JsonSchema;
    path: string;
}

const SingleCategory: React.FC<CategoryProps> = ({ category, schema, path }) => {
    return (
        <div id='categorization-detail'>
            {(category.elements || []).map((child, index) => (
                <JsonFormsDispatch
                    key={`${path}-${index}`}
                    uischema={child}
                    schema={schema}
                    path={path}
                />
            ))}
        </div>
    );
};

export default SingleCategory;
