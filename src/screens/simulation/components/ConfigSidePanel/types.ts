import { TrafficLightFormConfig } from '../schema';

export interface ConfigSidePanelProps {
  panelOpen: boolean;
  setPanelOpen: (_: boolean) => void;
  onSubmit: (_: TrafficLightFormConfig) => void;
}
