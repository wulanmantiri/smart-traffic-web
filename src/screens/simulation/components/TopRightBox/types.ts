import {
  DecideTrafficLightResponse,
  TrafficLightConfig,
} from 'services/models';

export interface TopRightBoxProps {
  data: DecideTrafficLightResponse | null;
  numOfLanes: number;
  decideTrafficLight: (config: TrafficLightConfig) => Promise<void>;
}
