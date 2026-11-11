import React, { useState } from 'react';
import { MapPin, Navigation, Info, School, Bus, DoorOpen, Eye } from 'lucide-react';
import { CampusId, PointOfInterest, RoomProperty } from '../types';

interface CampusMapViewProps {
  pois: PointOfInterest[];
  properties: RoomProperty[];
  selectedCampus: CampusId;
  onSelectProperty: (property: RoomProperty) => void;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  pois,
  properties,
  selectedCampus,
  onSelectProperty,
}) => {
  const [activeCampus, setActiveCampus] = useState<'jb' | 'kl' | 'pagoh'>(
    selectedCampus === 'all' ? 'jb' : (selectedCampus as 'jb' | 'kl' | 'pagoh')
  );
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  const filteredPois = pois.filter((p) => p.campusId === activeCampus);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Campus Selector Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Campus Map Discovery</h2>
          <p className="text-xs text-slate-500">Colleges, faculties, bus stops &amp; gates</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveCampus('jb')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCampus === 'jb' ? 'bg-white text-[#800000] shadow-xs' : 'text-slate-600'
            }`}
          >
            JB
          </button>
          <button
            type="button"
            onClick={() => setActiveCampus('kl')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCampus === 'kl' ? 'bg-white text-[#800000] shadow-xs' : 'text-slate-600'
            }`}
          >
            KL
          </button>
          <button
            type="button"
            onClick={() => setActiveCampus('pagoh')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeCampus === 'pagoh' ? 'bg-white text-[#800000] shadow-xs' : 'text-slate-600'
            }`}
          >
            Pagoh
          </button>
        </div>
      </div>

      {/* Interactive Map Visual Board */}
      <div className="relative w-full aspect-square sm:aspect-4/3 bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        {/* Campus Map Diagram Base Grid */}
        <div className="absolute inset-0 bg-[#0f172a] opacity-95">
          {/* Subtle grid lines */}
          <div
            className="w-full h-full opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Campus Roads and Landscape Paths */}
          <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100">
            {activeCampus === 'jb' ? (
              <>
                {/* UTM JB Skudai Ring Road System */}
                <circle cx="50" cy="50" r="32" fill="none" stroke="#334155" strokeWidth="2.5" />
                <path d="M 10 50 L 90 50 M 50 10 L 50 90" stroke="#334155" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M 65 78 L 50 50" stroke="#800000" strokeWidth="2" opacity="0.6" />
                {/* Lake / Taman Tasik UTM */}
                <ellipse cx="62" cy="40" rx="9" ry="6" fill="#0284c7" opacity="0.4" />
                <text x="56" y="41" fill="#7dd3fc" fontSize="2.8" fontWeight="bold">Tasik UTM</text>
              </>
            ) : activeCampus === 'kl' ? (
              <>
                {/* UTM KL Jalan Semarak / Jalan Rejang routes */}
                <line x1="20" y1="80" x2="80" y2="20" stroke="#800000" strokeWidth="2.5" opacity="0.7" />
                <path d="M 40 52 Q 55 40 75 25" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
                <text x="48" y="32" fill="#38bdf8" fontSize="2.8" fontWeight="bold">Shuttle Route (10m)</text>
              </>
            ) : (
              <>
                {/* Pagoh Edu Hub Boulevard */}
                <line x1="15" y1="50" x2="85" y2="50" stroke="#334155" strokeWidth="3" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#800000" strokeWidth="2" />
              </>
            )}
          </svg>
        </div>

        {/* POI Markers placed by coordinate percentages */}
        {filteredPois.map((poi) => {
          const isSelected = selectedPoi?.id === poi.id;
          return (
            <button
              key={poi.id}
              type="button"
              onClick={() => setSelectedPoi(poi)}
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full shadow-lg transition-all z-20 group ${
                isSelected
                  ? 'bg-white ring-4 ring-red-500 scale-125'
                  : poi.category === 'college'
                  ? 'bg-[#800000] ring-2 ring-white/80 hover:scale-110'
                  : poi.category === 'faculty'
                  ? 'bg-blue-600 ring-2 ring-white/80 hover:scale-110'
                  : 'bg-emerald-600 ring-2 ring-white/80 hover:scale-110'
              }`}
            >
              {poi.category === 'college' ? (
                <School className="w-3.5 h-3.5 text-white" />
              ) : poi.category === 'faculty' ? (
                <Navigation className="w-3.5 h-3.5 text-white" />
              ) : poi.category === 'bus_stop' ? (
                <Bus className="w-3.5 h-3.5 text-white" />
              ) : (
                <DoorOpen className="w-3.5 h-3.5 text-white" />
              )}

              {/* Tooltip on hover/active */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-black/90 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {poi.name}
              </span>
            </button>
          );
        })}

        {/* Map Legend (Bottom Overlay) */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-[10px] text-white z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#800000]" />
            <span>Colleges</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Faculties</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Transport &amp; Gates</span>
          </div>
        </div>
      </div>

      {/* Selected POI Details Card */}
      {selectedPoi ? (
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 animate-in fade-in duration-150">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#800000]">
                {selectedPoi.category.replace('_', ' ')}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{selectedPoi.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedPoi.description}</p>
            </div>

            {selectedPoi.category === 'college' && (
              <button
                type="button"
                onClick={() => {
                  const match = properties.find((p) =>
                    selectedPoi.name.toLowerCase().includes(p.shortCode.toLowerCase())
                  );
                  if (match) onSelectProperty(match);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-2xs flex items-center gap-1"
                style={{ backgroundColor: '#800000' }}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Tap on any pin to inspect residence distances and nearby lecture halls.</span>
        </div>
      )}
    </div>
  );
};
