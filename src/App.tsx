import React, { useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Layout, Button, Drawer } from 'antd';
import 'antd/dist/reset.css';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import { schema1Basic, schema1Address, schema1Additional, uischema1Basic, uischema1Additional, uischema1Address } from './schemas/schema1';
import { schema2JobDetails, schema2Manager, uischema2JobDetails, uischema2Manager } from './schemas/schema2';
import CategorizationRenderer from './categorization/CategorizationRenderer';

const { Content } = Layout;

const formSchemas = [
    {
        title: 'Formulaire 1',
        categories: [
            { label: 'Basic', schema: schema1Basic, uischema: uischema1Basic },
            { label: 'Address', schema: schema1Address, uischema: uischema1Address },
            { label: 'Additional', schema: schema1Additional, uischema: uischema1Additional },
        ],
    },
    {
        title: 'Formulaire 2',
        categories: [
            { label: 'Job Details', schema: schema2JobDetails, uischema: uischema2JobDetails },
            { label: 'Management', schema: schema2Manager, uischema: uischema2Manager },
        ],
    },
];

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeFormIndex, setActiveFormIndex] = useState(0);

    const [activeCategoryIndexes, setActiveCategoryIndexes] = useState<number[]>(new Array(formSchemas.length).fill(0));

    const handleCategorySelect = (formIndex: number, categoryIndex: number) => {
        setActiveFormIndex(formIndex);
        const newCategoryIndexes = [...activeCategoryIndexes];
        newCategoryIndexes[formIndex] = categoryIndex;
        setActiveCategoryIndexes(newCategoryIndexes);
        setDrawerOpen(false);
    };

    const activeForm = formSchemas[activeFormIndex];
    const activeCategory = activeForm.categories[activeCategoryIndexes[activeFormIndex]];

    return (
        <ProLayout
            title="Mon Application"
            layout="top"
            siderWidth={0}
            contentStyle={{ padding: 20, transition: 'margin-left 0.3s ease' }}
        >
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                <Drawer
                    title="Navigation"
                    placement="left"
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    width={300}
                >
                    {formSchemas.map((form, formIndex) => (
                        <div key={formIndex}>
                            <h3>{form.title}</h3>

                            <CategorizationRenderer
                                categories={form.categories}
                                activeCategoryIndex={activeCategoryIndexes[formIndex]}
                                onSelect={(categoryIndex) => handleCategorySelect(formIndex, categoryIndex)}
                            />
                        </div>
                    ))}
                </Drawer>

                <Content
                    style={{
                        flex: 1,
                        marginLeft: drawerOpen ? 300 : 0,
                        width: `calc(100% - ${drawerOpen ? 300 : 0}px)`,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Button type="primary" onClick={() => setDrawerOpen(true)} style={{ marginBottom: 20 }}>
                        Ouvrir le menu
                    </Button>

                    <JsonForms
                        schema={activeCategory.schema}
                        uischema={activeCategory.uischema}
                        data={{}}
                        renderers={materialRenderers}
                    />
                </Content>
            </Layout>
        </ProLayout>
    );
};

export default App;
