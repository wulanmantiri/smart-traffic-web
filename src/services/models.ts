export interface DetectVehiclesRequest {
  image: string;
  return_bbox_image: boolean;
}

export interface VehicleCount {
  car: number;
  motorbike: number;
  truck: number;
  bus: number;
  total: number;
}

export interface DetectVehiclesResponse {
  image: string;
  count: VehicleCount;
}

export interface TrafficLightConfig {
  ratio_vehicle: number;
  ratio_time: number;
  min_green_time: number;
  max_green_time: number;
  enable_stream: boolean;
}

export interface DecideTrafficLightRequest {
  lanes: {
    name: string;
    count: number;
    time: string;
    intersection_id: string;
  }[];
  green_lane_history: number[];
  config: TrafficLightConfig;
}

export interface DecideTrafficLightResponse {
  score_details: string[];
  green: {
    lane: number;
    calc_time: number;
    actual_time_details: string;
  };
  green_lane_history: number[];
}
