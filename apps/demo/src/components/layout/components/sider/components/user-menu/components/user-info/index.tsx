import { Avatar, AvatarFallback, AvatarImage } from '@heathen/ui/components/avatar';

const user = {
  name: 'username',
  avatar: '',
  email: 'e@mail.com',
};

export const UserInfo = () => {
  return (
    <>
      <Avatar className='h-8 w-8 rounded-lg'>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-medium'>{user.name}</span>
        <span className='truncate text-xs'>{user.email}</span>
      </div>
    </>
  );
};
