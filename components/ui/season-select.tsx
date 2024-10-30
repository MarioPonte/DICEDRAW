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
    season: string;
    onSeasonChange: any;
}

const SeasonSelect: React.FC<SeasonSelectProps> = ({ season, onSeasonChange }) => {
  return (
      <div className="flex gap-2 items-center">
        <span className="text-sm">Season</span>
        <Select defaultValue={season} onValueChange={onSeasonChange}>
          <SelectTrigger className="w-[124px] h-8 focus:ring-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
  );
}

export default SeasonSelect;