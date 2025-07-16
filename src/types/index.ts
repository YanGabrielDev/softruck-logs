// src/types/index.ts
export interface GPSPoint {
  longitude: number;
  latitude: number;
  acquisition_time_unix: number;
  speed: number; // km/h
  direction: number; // Degrees
  acquisition_time: string;
  address?: string;
}

export interface Course {
  start_at: string;
  end_at: string;
  distance: number;
  speed_max: number;
  stops: number;
  total_stop_time: number;
  stop_points: {
    type: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    coordinates: [number, number, number, null, null][];
  };
  gps_count: number;
  duration: number;
  speed_avg: number;
  gps: GPSPoint[];
}

export interface CarData {
  accOn: string;
  total_time: number;
  total_distance: number;
  speed_max: number;
  speed_avg: number;
  num_courses: number;
  stops: number;
  total_stop_time: number;
  perc_fixed: number;
  gps_count: number;
  courses: Course[];
}
