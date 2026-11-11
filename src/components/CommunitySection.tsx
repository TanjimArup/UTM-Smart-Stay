import React from 'react';
import { Users, Car, ChevronRight, UserPlus, Calendar } from 'lucide-react';

interface CommunitySectionProps {
  onOpenRoommates: () => void;
  onOpenCarpool: () => void;
  onViewAllCommunity: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  onOpenRoommates,
  onOpenCarpool,
  onViewAllCommunity,
}) => {
  return (
    <section className="w-full bg-[#F8F9FA] border-t border-b border-slate-200/80 px-4 py-5 my-2">
      <div className="max-w-md mx-auto space-y-3">
        {/* Section Title: "Student Community Board" (Dark gray, bold) */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Student Community Board
          </h2>
          <button
            type="button"
            onClick={onViewAllCommunity}
            className="text-xs font-semibold flex items-center gap-0.5 hover:underline"
            style={{ color: '#800000' }}
          >
            <span>Explore Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontally scrollable row of square widget cards */}
        <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Widget 1: Title "Find a Roommate", Icon: Two people, Brief text: "Connect with students looking to share." */}
          <button
            type="button"
            onClick={onOpenRoommates}
            className="w-44 h-44 shrink-0 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs text-left flex flex-col justify-between hover:border-[#800000]/40 hover:shadow-xs active:scale-[0.98] transition-all group"
          >
            <div>
              {/* Icon Container: Two people (Users) */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: '#800000' }}
              >
                <Users className="w-5 h-5 text-white" />
              </div>

              {/* Title: "Find a Roommate" */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#800000] transition-colors leading-tight">
                Find a Roommate
              </h3>

              {/* Brief text: "Connect with students looking to share." */}
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                Connect with students looking to share.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-semibold text-[#800000]">
              <span className="flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5" />
                <span>3 New Matches</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Widget 2: Title "Campus Carpool", Icon: A car, Brief text: "Share rides between KSJ and UTM KL." */}
          <button
            type="button"
            onClick={onOpenCarpool}
            className="w-44 h-44 shrink-0 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs text-left flex flex-col justify-between hover:border-[#800000]/40 hover:shadow-xs active:scale-[0.98] transition-all group"
          >
            <div>
              {/* Icon Container: A car (Car) */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: '#800000' }}
              >
                <Car className="w-5 h-5 text-white" />
              </div>

              {/* Title: "Campus Carpool" */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#800000] transition-colors leading-tight">
                Campus Carpool
              </h3>

              {/* Brief text: "Share rides between KSJ and UTM KL." */}
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                Share rides between KSJ and UTM KL.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-semibold text-[#800000]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Daily Schedules</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
