import React, { useState, useMemo } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Layout, Button, Drawer } from 'antd';
import 'antd/dist/reset.css';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import { schema1, uischema1, initialData1 } from './schemas/schema1';
import { schema2, uischema2, initialData2 } from './schemas/schema2';
import CategorizationRenderer from './categorization/CategorizationRenderer';
import { Category, Categorization } from '@jsonforms/core';

const { Content } = Layout;

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeForm, setActiveForm] = useState(1);
    const [activeCategory, setActiveCategory] = useState<number>(0);

    const schemas = [schema1, schema2];
    const uischemas = [uischema1, uischema2];
    const initialData = [initialData1, initialData2];

    const handleCategorySelect = (index: number) => {
        setActiveCategory(index);
        setDrawerOpen(false);
    };

    const currentUischema = useMemo(() => {
        const currentElements = uischemas[activeForm - 1].elements;
        return {
            type: 'Categorization',
            elements: currentElements.map((el: any) => ({ ...el })),
        } as Categorization;
    }, [activeForm, activeCategory]);

    return (
        <ProLayout
            title="Mon Application"
            layout="top"
            siderWidth={0}
            contentStyle={{ padding: 20, transition: 'margin-left 0.3s ease' }}
        >
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                {/* Drawer de navigation */}
                <Drawer
                    title="Navigation"
                    placement="left"
                    closable
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    width={300}
                >
                    <Button onClick={() => { setActiveForm(1); setActiveCategory(0); }}>
                        Formulaire 1
                    </Button>
                    <Button onClick={() => { setActiveForm(2); setActiveCategory(0); }}>
                        Formulaire 2
                    </Button>

                    <CategorizationRenderer
                        elements={uischemas[activeForm - 1].elements as (Category | Categorization)[]}
                        selectedCategory={uischemas[activeForm - 1].elements[activeCategory] as Category}
                        onSelect={handleCategorySelect}
                        data={initialData[activeForm - 1]}
                    />
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
                        schema={schemas[activeForm - 1]}
                        uischema={currentUischema}
                        data={initialData[activeForm - 1]}
                        renderers={materialRenderers}
                    />
                </Content>
            </Layout>
        </ProLayout>
    );
};

export default App;
