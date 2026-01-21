import { PenBox } from 'lucide-react';
import Link from 'next/link';
import Button from './button';

export default function FloatingActionButton() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 sm:bottom-5 sm:right-5 z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full"
      variant="primary"
      size="icon"
    >
      <Link href="/boards/create">
        <PenBox className="sm:w-6 sm:h-6 w-5 h-5" strokeWidth={1.5} />
      </Link>
    </Button>
  );
}

