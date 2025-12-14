// Utility functions
export { cn } from './lib/utils';

// Button
export { Button, buttonVariants } from './components/button';
export type { ButtonProps, ButtonIconProps } from './components/button';

// Input
export { Input } from './components/input';

// Loader
export { default as Loader, Loader as LoaderComponent } from './components/loader';

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';

// Popover
export { Popover, PopoverTrigger, PopoverContent } from './components/popover';

// ScrollArea
export { ScrollArea, ScrollBar } from './components/scroll-area';

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './components/command';

// PhoneInput
export { PhoneInput } from './components/phone-input';

// PasswordInput
export { PasswordInput } from './components/password-input';

// TypewriterEffect
export { TypewriterEffect } from './components/typewriter-effect';
