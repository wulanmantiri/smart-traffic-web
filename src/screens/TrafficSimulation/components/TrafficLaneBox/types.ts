import { Dispatch, SetStateAction } from 'react';
import { DecideTrafficLightResponse, VehicleCount } from 'services/models';

export interface LaneFormValues {
  name: string;
  videoUrl: string;
}

export interface LaneDetails extends LaneFormValues {
  detectCallback: () => Promise<VehicleCount>;
}

export interface TrafficLaneBoxProps {
  data: DecideTrafficLightResponse | null;
  lanes: LaneDetails[];
  setLanes: Dispatch<SetStateAction<LaneDetails[]>>;
}
