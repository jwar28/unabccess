'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ComboboxOption {
	value: string;
	label: string;
}

interface ComboboxProps {
	options: ComboboxOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function Combobox({ options, value, onChange, placeholder = 'Seleccione una opcion...' }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
					{value ? options.find((option) => option.value === value)?.label : placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
					<CommandList>
						<CommandEmpty>No se encontro nada</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									<Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
