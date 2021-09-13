import { Button, SidePanel } from 'components/core';
import { RadioButton, TextField } from 'components/form';
import { enableOptions } from 'constants/options';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { configFormFields, initialConfig } from '../schema';
import { ConfigSidePanelProps } from './types';

const ConfigSidePanel: FC<ConfigSidePanelProps> = ({
  panelOpen,
  setPanelOpen,
  onSubmit,
}) => {
  const { getFieldProps, setFieldValue, handleSubmit } = useFormik({
    initialValues: { ...initialConfig },
    onSubmit,
  });

  const closePanel = () => {
    setPanelOpen(false);
  };

  return (
    <SidePanel isOpen={panelOpen} setIsOpen={setPanelOpen}>
      <div>
        <div className="py-6 px-4 sm:px-6 bg-gray-50 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Traffic Light Configuration
          </h2>
          <p className="text-sm text-gray-500">
            Any changes will take effect on the next snapshot capture.
          </p>
        </div>

        <div className="grid gap-6 py-6 px-4">
          {configFormFields.map(field => (
            <div className="space-y-3" key={field.title}>
              <p className="text-sm font-medium text-gray-500">{field.title}</p>
              <div className="grid grid-cols-2 gap-2">
                {field.items.map(item => (
                  <TextField
                    key={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    {...getFieldProps(item.name)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-500">Logging</p>
            <RadioButton
              label="Enable traffic flow logs"
              options={enableOptions}
              {...getFieldProps('enable_stream')}
              setValue={v => setFieldValue('enable_stream', v)}
            />
          </div>
        </div>

        <div className="px-4 flex justify-end">
          <Button
            onClick={() => {
              handleSubmit();
              closePanel();
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </SidePanel>
  );
};

export default ConfigSidePanel;
