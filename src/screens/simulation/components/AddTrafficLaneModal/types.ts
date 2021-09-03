import { LaneFormValues } from '../TrafficLaneBox/types';

export interface AddTrafficLaneModalProps {
  modalOpen: boolean;
  setModalOpen: (_: boolean) => void;
  onSubmit: (_: LaneFormValues) => void;
}
