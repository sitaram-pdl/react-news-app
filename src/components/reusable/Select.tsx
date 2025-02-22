import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

type SelectItemType = {
  value: string;
  label: string;
};

type SelectGroupType = {
  label?: string;
  items: SelectItemType[];
};

type ScrollableSelectProps = {
  options: SelectGroupType[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const ScrollableSelect: React.FC<ScrollableSelectProps> = ({
  options,
  placeholder = 'Select an option',
  value,
  onChange,
  className = 'w-[280px]',
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((group, index) => (
          <SelectGroup key={index}>
            {group.label && <SelectLabel>{group.label}</SelectLabel>}
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
