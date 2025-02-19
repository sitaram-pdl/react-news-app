import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { X } from 'lucide-react';
import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface MultiSelectProps {
  id?: string;
  options?: string[];
  selected?: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id = '',
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select items...',
  emptyMessage = 'No item found.',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      setInputValue('');
      onChange(
        selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option]
      );
    },
    [selected, onChange]
  );

  const handleRemove = useCallback(
    (option: string) => {
      onChange(selected.filter((item) => item !== option));
    },
    [onChange, selected]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputValue && selected.length > 0) {
      handleRemove(selected[selected.length - 1]);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command
      className={`overflow-visible bg-transparent ${className}`}
      ref={containerRef}
    >
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:border-muted-foreground/50 transition-colors min-h-10"
        onClick={() => {
          setOpen(true);
          setIsFocused(true);
          inputRef.current?.focus();
        }}
      >
        <div className="flex flex-wrap gap-1.5 items-center">
          {selected.map((option) => (
            <Badge
              key={option}
              variant="secondary"
              className="hover:bg-secondary/80 transition-colors py-1 px-2"
            >
              {option}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity"
                onKeyDown={(e) => e.key === 'Enter' && handleRemove(option)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </Badge>
          ))}
          {isFocused && (
            <CommandInput
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              placeholder={selected.length === 0 ? placeholder : ''}
              className="bg-transparent h-10 overflow-hidden outline-none placeholder:text-muted-foreground flex-1 focus:ring-0 p-0 min-w-20 max-w-40"
            />
          )}
          {!isFocused && selected.length === 0 && `0 ${id || 'item '} selected`}
        </div>
      </div>
      {open && (
        <div className="relative mt-2">
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList>
              <CommandEmpty className="py-6 text-center text-sm">
                {emptyMessage}
              </CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option);
                  return (
                    <CommandItem
                      key={option}
                      onSelect={() => handleSelect(option)}
                      className="cursor-pointer px-4 py-2 hover:bg-accent/50 transition-colors"
                    >
                      <div
                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary transition-colors ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50'
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2 w-2 bg-current rounded-sm" />
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      )}
    </Command>
  );
};

export default MultiSelect;
