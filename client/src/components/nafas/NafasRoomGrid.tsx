import React from 'react';

export interface RoomData {
  id: string;
  name: string;
  deviceCount: number;
  pm25Value: number;
  pm25Category: string;
  pm25RingColor: string;
  co2Value: number;
  co2Status: string;
  co2RingColor: string;
}

interface NafasRoomGridProps {
  onRoomSelect?: (room: RoomData) => void;
}

export const roomsList: RoomData[] = [
  {
    id: 'room-1',
    name: 'Room 1',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'Unhealty',
    pm25RingColor: '#ef4444', // Red
    co2Value: 79,
    co2Status: 'Average',
    co2RingColor: '#f59e0b', // Amber/Yellow
  },
  {
    id: 'room-2',
    name: 'Room 2',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'Moderate',
    pm25RingColor: '#f59e0b', // Amber
    co2Value: 79,
    co2Status: 'High',
    co2RingColor: '#ef4444', // Red
  },
  {
    id: 'room-3',
    name: 'Room 3',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'Good',
    pm25RingColor: '#22c55e', // Green
    co2Value: 79,
    co2Status: 'High',
    co2RingColor: '#ef4444', // Red
  },
  {
    id: 'room-4',
    name: 'Room 4',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'USG*',
    pm25RingColor: '#f97316', // Orange
    co2Value: 79,
    co2Status: 'Normal',
    co2RingColor: '#22c55e', // Green
  },
  {
    id: 'room-5',
    name: 'Room 5',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'Hazardous',
    pm25RingColor: '#881337', // Maroon/Crimson
    co2Value: 79,
    co2Status: 'Normal',
    co2RingColor: '#22c55e', // Green
  },
  {
    id: 'room-6',
    name: 'Room 6',
    deviceCount: 16,
    pm25Value: 149,
    pm25Category: 'Very Unhealty',
    pm25RingColor: '#8b5cf6', // Purple
    co2Value: 79,
    co2Status: 'Average',
    co2RingColor: '#f59e0b', // Amber
  },
];

export const NafasRoomGrid: React.FC<NafasRoomGridProps> = ({ onRoomSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {roomsList.map((room) => (
        <article
          key={room.id}
          onClick={() => onRoomSelect?.(room)}
          className="p-4 rounded-2xl bg-[#16201b] border border-[#212d26] hover:border-[#33463a] transition-all cursor-pointer shadow-sm flex items-center justify-between gap-4 group"
        >
          {/* Room Name & Devices Count */}
          <div className="w-24 shrink-0">
            <h4 className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">
              {room.name}
            </h4>
            <span className="text-[11px] text-[#718679] font-medium block mt-0.5">
              {room.deviceCount} devices
            </span>
          </div>

          {/* Meter 1: Indoor PM 2.5 */}
          <div className="flex items-center gap-2.5 flex-1 justify-center border-l border-r border-[#202b24] px-2">
            {/* Ring Badge */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
              style={{
                boxShadow: `0 0 0 2px #16201b, 0 0 0 3.5px ${room.pm25RingColor}`,
              }}
            >
              {room.pm25Value}
            </div>
            {/* Label */}
            <div className="leading-tight">
              <span className="text-[10px] text-[#718679] font-medium block">
                Indoor PM 2.5
              </span>
              <span className="text-xs font-semibold text-white block">
                {room.pm25Category}
              </span>
            </div>
          </div>

          {/* Meter 2: CO2 */}
          <div className="flex items-center gap-2.5 flex-1 justify-end pl-2">
            {/* Ring Badge */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
              style={{
                boxShadow: `0 0 0 2px #16201b, 0 0 0 3.5px ${room.co2RingColor}`,
              }}
            >
              {room.co2Value}
            </div>
            {/* Label */}
            <div className="leading-tight">
              <span className="text-[10px] text-[#718679] font-medium block">
                CO₂
              </span>
              <span className="text-xs font-semibold text-white block">
                {room.co2Status}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
