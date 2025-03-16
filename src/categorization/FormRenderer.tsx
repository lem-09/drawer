import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { UISchemaElement } from '@jsonforms/core';

type FormRendererProps = {
    schema: object;
    uiSchema: UISchemaElement;
    data: any;
    onChange: (data: any) => void;
};

const FormRenderer: React.FC<FormRendererProps> = ({ schema, uiSchema, data, onChange }) => {
    return (
        <JsonForms
            schema={schema}
            uischema={uiSchema}
            data={data}
            onChange={({ data }) => onChange(data)}
            renderers={materialRenderers}
        />
    );
};

export default FormRenderer;