import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { Drawer, Button } from 'antd';
import 'antd/dist/reset.css';

import { schema1, uischema1, initialData1 } from "./schemas/schema1";
import { schema2, uischema2, initialData2 } from "./schemas/schema2";

const App: React.FC = () => {
  const [open, setOpen] = useState(false); //drawer

  const toggleDrawer = () => setOpen(!open);

  return (
      <div style={{ padding: '20px' }}>
        <Button type="primary" onClick={toggleDrawer}>Ouvrir le menu</Button>

        <Drawer title="Navigation" placement="left" onClose={toggleDrawer} open={open}>
          <p>Formulaire 1</p>
        </Drawer>

        <JsonForms
            schema={schema1}
            uischema={uischema1}
            data={initialData1}
            renderers={materialRenderers}
        />

        <JsonForms
          schema={schema2}
          uischema={uischema2}
          data={initialData2}
          renderers={materialRenderers}
        />
      </div>
  );
};
export default App;
