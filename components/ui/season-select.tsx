"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeasonSelectProps {
  selSeason: string;
  onSeasonChange: any;
  seasons: string[];
}

const SeasonSelect: React.FC<SeasonSelectProps> = ({ selSeason, onSeasonChange, seasons }) => {
  return (
    <div className="flex gap-2 items-center mx-2">
      <span className="text-sm">Season</span>
      <Select defaultValue={selSeason} onValueChange={onSeasonChange}>
        <SelectTrigger className="w-[124px] h-8 focus:ring-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {seasons.map((season: any) => <SelectItem key={season} value={season}>{season}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SeasonSelect;