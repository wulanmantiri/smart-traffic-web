import { Dispatch, SetStateAction } from 'react';
import { DecideTrafficLightResponse } from 'services/models';

export interface LaneFormValues {
  name: string;
  videoUrl: string;
}

export interface LaneDetails extends LaneFormValues {
  detectCallback: () => Promise<number>;
}

export interface TrafficLaneBoxProps {
  data: DecideTrafficLightResponse | null;
  lanes: LaneDetails[];
  setLanes: Dispatch<SetStateAction<LaneDetails[]>>;
}
