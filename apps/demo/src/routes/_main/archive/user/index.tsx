import { AuthCheck } from '@/components/auth-check';
import { AUTH_CODE } from '@/constants/auth-code';
import { Button } from '@heathen/ui/components/button';
import { ColumnDef, DataTable } from '@heathen/ui/components/data-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@heathen/ui/components/select';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/archive/user/')({
  component: Component,
  staticData: {
    title: '用户列表',
  },
});

type User = {
  id: string;
  username: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'username',
    header: '用户名',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <Button asChild variant='link' size='sm'>
            <Link to='/archive/user/edit/$id' params={{ id: row.original.id }}>
              编辑
            </Link>
          </Button>
          <Button asChild variant='link' size='sm'>
            <Link to='/archive/user/detail/$id' params={{ id: row.original.id }}>
              详情
            </Link>
          </Button>
        </div>
      );
    },
  },
];

function Component() {
  const data: User[] = [
    {
      id: '728ed52f',
      username: '用户1',
    },
    {
      id: '04598430',
      username: '用户2',
    },
  ];

  return (
    <div className='gap-content-box-gap relative grid grid-cols-12'>
      <div className='bg-card p-content-box-gap col-span-12 flex gap-2 rounded-lg'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a fruit' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>用户类型</SelectLabel>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <AuthCheck code={AUTH_CODE.TEST}>
          <Button variant='link' asChild>
            <Link to='/archive/user/create'>新建</Link>
          </Button>
        </AuthCheck>
      </div>
      <div className='bg-card p-content-box-gap col-span-12 flex flex-col gap-2 rounded-lg'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
