import { Avatar } from '@/components/ui/avatar';
import { getInitials } from '@/lib/formatters';
import Image from 'next/image';

interface UserInfoCellProps {
  name: string;
  email: string;
  photo?: string | null;
}

const UserInfoCell = ({ name, email, photo }: UserInfoCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {photo ? (
          <Image src={photo} alt={name} width={40} height={40} />
        ) : (
          <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center font-semibold">
            {getInitials(name)}
          </div>
        )}
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">{email}</p>
      </div>
    </div>
  );
};

export default UserInfoCell;
