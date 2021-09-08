import { TrafficLightConfig } from 'services/models';
import { LaneFormValues } from './TrafficLaneBox/types';

export const initialLaneValues: LaneFormValues = {
  name: '',
  videoUrl: '',
};

export interface TrafficLightFormConfig {
  num_of_turns: string;
  ratio_vehicle: string;
  ratio_time: string;
  min_green_time: string;
  max_green_time: string;
  enable_stream: boolean;
}

export const initialConfig: TrafficLightFormConfig = {
  num_of_turns: '',
  min_green_time: '10',
  max_green_time: '60',
  ratio_vehicle: '1',
  ratio_time: '1',
  enable_stream: true,
};

export const configFormFields = [
  {
    title: 'Simulation',
    items: [
      {
        name: 'num_of_turns',
        label: 'Number of turns:',
        placeholder: '4',
      },
    ],
  },
  {
    title: 'Green Time (in seconds)',
    items: [
      {
        name: 'min_green_time',
        label: 'Minimum:',
        placeholder: initialConfig.min_green_time,
      },
      {
        name: 'max_green_time',
        label: 'Maximum:',
        placeholder: initialConfig.max_green_time,
      },
    ],
  },
  {
    title: 'Conversion from Vehicle to Green Time (in seconds)',
    items: [
      {
        name: 'ratio_vehicle',
        label: 'Number of vehicles:',
        placeholder: initialConfig.ratio_vehicle,
      },
      {
        name: 'ratio_time',
        label: 'Green time:',
        placeholder: initialConfig.ratio_time,
      },
    ],
  },
];

export const convertConfigPayload = (
  config: TrafficLightFormConfig,
): TrafficLightConfig => ({
  ratio_time: parseInt(config.ratio_time, 10),
  ratio_vehicle: parseInt(config.ratio_vehicle, 10),
  max_green_time: parseInt(config.max_green_time, 10),
  min_green_time: parseInt(config.min_green_time, 10),
  enable_stream: config.enable_stream,
});
